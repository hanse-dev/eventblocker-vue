const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const logger = require('../utils/logger');
const { authenticateToken } = require('./auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/dates - Get all available dates
router.get('/', async (req, res) => {
  try {
    logger.info('Fetching events', { user: req.user });
    
    const now = new Date();
    logger.info('Current time:', now.toISOString());
    
    // Build where clause based on user role
    const where = {
      date: {
        gte: now // Only show future events
      },
      ...(req.user?.role !== 'admin' ? {
        visibility: true,
        status: 'available'
      } : {})
    };

    logger.info('Using where clause:', where);

    // Get events with bookings count for all users
    const events = await prisma.event.findMany({
      where,
      orderBy: {
        date: 'asc'
      },
      include: {
        bookings: {
          where: {
            status: 'confirmed'
          },
          select: req.user?.role === 'admin' ? {
            id: true,
            name: true,
            email: true,
            phone: true,
            notes: true,
            createdAt: true
          } : {
            id: true
          }
        }
      }
    });

    // For non-admin users, only return necessary data
    const sanitizedEvents = events.map(event => {
      const { bookings, ...eventData } = event;
      return {
        ...eventData,
        bookings: req.user?.role === 'admin' ? bookings : bookings.map(b => ({ id: b.id }))
      };
    });

    logger.info('Returning events', { count: sanitizedEvents.length });
    res.json(sanitizedEvents);
  } catch (error) {
    logger.error('Failed to fetch events', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /api/dates - Create new date
router.post('/', async (req, res) => {
  try {
    logger.info('Creating new event', { body: req.body });
    
    const eventData = {
      title: req.body.title,
      date: new Date(req.body.date),
      startTime: new Date(req.body.startTime),
      duration: parseInt(req.body.duration),
      location: req.body.location || '',
      room: req.body.room || '',
      price: req.body.price ? parseFloat(req.body.price) : null,
      maxBookings: req.body.maxBookings ? parseInt(req.body.maxBookings) : 1,
      visibility: req.body.visibility !== false
    };
    
    logger.debug('Parsed event data', eventData);
    
    const event = await prisma.event.create({
      data: eventData
    });
    
    logger.info('Successfully created event', { event });
    res.status(201).json(event);
  } catch (error) {
    logger.error('Failed to create event', error);
    res.status(400).json({ 
      error: 'Failed to create event',
      details: error.message,
      validationErrors: error.meta?.cause
    });
  }
});

// PUT /api/dates/:id - Update date
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    logger.info('Updating event', { id, body: req.body });

    // Validate that the event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    });

    if (!existingEvent) {
      logger.warn('Event not found', { id });
      return res.status(404).json({ error: 'Event not found' });
    }

    // Prepare update data
    const updateData = {
      title: req.body.title,
      location: req.body.location,
      room: req.body.room,
      duration: req.body.duration ? parseInt(req.body.duration) : undefined,
      maxBookings: req.body.maxBookings ? parseInt(req.body.maxBookings) : undefined,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      visibility: req.body.visibility
    };

    // Handle date and time fields
    if (req.body.date) {
      updateData.date = new Date(req.body.date);
    }
    if (req.body.startTime) {
      updateData.startTime = new Date(req.body.startTime);
    }

    // Remove undefined values
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    logger.debug('Update data:', updateData);

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        bookings: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            notes: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    logger.info('Successfully updated event', { event });
    res.json(event);
  } catch (error) {
    logger.error('Failed to update event', error);
    res.status(500).json({ 
      error: 'Failed to update event',
      details: error.message
    });
  }
});

// DELETE /api/dates/:id - Delete date
router.delete('/:id', async (req, res) => {
  try {
    logger.info('Deleting event', { id: req.params.id });
    await prisma.event.delete({
      where: { id: parseInt(req.params.id) }
    });
    logger.info('Successfully deleted event', { id: req.params.id });
    res.status(204).send();
  } catch (error) {
    logger.error('Failed to delete event', error);
    res.status(404).json({ error: 'Event not found or delete failed' });
  }
});

// POST /api/dates/:id/book - Book an event
router.post('/:id/book', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const { firstName, lastName, email, phone, notes } = req.body;

    logger.info('Attempting to book event', { 
      eventId, 
      requestBody: req.body,
      bookingData: { firstName, lastName, email, phone, notes }
    });

    // Validate required fields
    if (!firstName || !lastName || !email) {
      logger.warn('Missing required fields', { firstName, lastName, email });
      return res.status(400).json({ error: 'First name, last name and email are required' });
    }

    // Check if event exists and is available
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        bookings: {
          where: {
            status: 'confirmed'
          }
        }
      }
    });

    logger.info('Found event', { event });

    if (!event) {
      logger.warn('Event not found', { eventId });
      return res.status(404).json({ error: 'Event not found' });
    }

    if (!event.visibility) {
      logger.warn('Event is not visible', { eventId });
      return res.status(400).json({ error: 'Event is not available for booking' });
    }

    if (event.bookings.length >= event.maxBookings) {
      logger.warn('Event is fully booked', { eventId, currentBookings: event.bookings.length, maxBookings: event.maxBookings });
      return res.status(400).json({ error: 'Event is fully booked' });
    }

    // Create booking
    logger.info('Creating booking', {
      eventId,
      firstName,
      lastName,
      email,
      phone,
      notes
    });

    const booking = await prisma.booking.create({
      data: {
        eventId,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        phone,
        notes,
        status: 'confirmed'
      }
    });

    logger.info('Successfully created booking', { booking });

    // Update event status if it's now fully booked
    const updatedBookingsCount = event.bookings.length + 1;
    if (updatedBookingsCount >= event.maxBookings) {
      logger.info('Updating event status to booked', { eventId });
      await prisma.event.update({
        where: { id: eventId },
        data: { status: 'booked' }
      });
    }

    logger.info('Successfully booked event', { eventId, bookingId: booking.id });
    res.json(booking);
  } catch (error) {
    logger.error('Failed to book event', { error: error.message, stack: error.stack });
    res.status(500).json({ error: 'Failed to book event', details: error.message });
  }
});

// GET /api/dates/:id/bookings - Get all bookings for an event (admin only)
router.get('/:id/bookings', async (req, res) => {
  try {
    logger.info('Fetching bookings for event', { eventId: req.params.id });
    
    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!event) {
      logger.warn('Event not found', { eventId: req.params.id });
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get all bookings for the event
    const bookings = await prisma.booking.findMany({
      where: { 
        eventId: parseInt(req.params.id)
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        notes: true,
        status: true,
        createdAt: true
      }
    });
    
    logger.info('Successfully fetched bookings', { 
      eventId: req.params.id, 
      count: bookings.length 
    });
    
    res.json(bookings);
  } catch (error) {
    logger.error('Failed to fetch bookings', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// DELETE /api/dates/:id/bookings/:bookingId - Delete a booking (admin only)
router.delete('/:id/bookings/:bookingId', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const bookingId = parseInt(req.params.bookingId);
    
    logger.info('Deleting booking', { eventId, bookingId });

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      logger.warn('Event not found', { eventId });
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if booking exists and belongs to the event
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        eventId: eventId
      }
    });

    if (!booking) {
      logger.warn('Booking not found', { eventId, bookingId });
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId }
    });

    // Update event status if it was fully booked
    if (event.status === 'booked') {
      await prisma.event.update({
        where: { id: eventId },
        data: { status: 'available' }
      });
    }

    logger.info('Successfully deleted booking', { eventId, bookingId });
    res.status(204).send();
  } catch (error) {
    logger.error('Failed to delete booking', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
