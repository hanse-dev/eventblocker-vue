const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const logger = require('../utils/logger');

// GET /api/dates - Get all available dates
router.get('/', async (req, res) => {
  try {
    logger.info('Fetching all events');
    const events = await prisma.event.findMany({
      where: {
        visibility: true,
        status: 'available'
      },
      orderBy: {
        date: 'asc'
      }
    });
    logger.info('Successfully fetched events', { count: events.length });
    res.json(events);
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
      location: req.body.location,
      room: req.body.room,
      description: req.body.description,
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
    logger.info('Updating event', { id: req.params.id, body: req.body });
    const event = await prisma.event.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: req.body.title,
        date: req.body.date ? new Date(req.body.date) : undefined,
        startTime: req.body.startTime ? new Date(req.body.startTime) : undefined,
        duration: req.body.duration ? parseInt(req.body.duration) : undefined,
        location: req.body.location,
        room: req.body.room,
        description: req.body.description,
        price: req.body.price ? parseFloat(req.body.price) : undefined,
        maxBookings: req.body.maxBookings ? parseInt(req.body.maxBookings) : undefined,
        visibility: req.body.visibility
      }
    });
    logger.info('Successfully updated event', { event });
    res.json(event);
  } catch (error) {
    logger.error('Failed to update event', error);
    res.status(404).json({ error: 'Event not found or update failed' });
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
    const { name, email, phone, notes } = req.body;

    logger.info('Attempting to book event', { eventId, email });

    // Validate required fields
    if (!name || !email) {
      logger.warn('Missing required fields', { name, email });
      return res.status(400).json({ error: 'Name and email are required' });
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

    if (!event) {
      logger.warn('Event not found', { eventId });
      return res.status(404).json({ error: 'Event not found' });
    }

    if (!event.visibility) {
      logger.warn('Event is not visible', { eventId });
      return res.status(400).json({ error: 'Event is not available for booking' });
    }

    if (event.bookings.length >= event.maxBookings) {
      logger.warn('Event is fully booked', { eventId });
      return res.status(400).json({ error: 'Event is fully booked' });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        eventId,
        name,
        email,
        phone,
        notes,
        status: 'confirmed'
      }
    });

    // Update event status if it's now fully booked
    const updatedBookingsCount = event.bookings.length + 1;
    if (updatedBookingsCount >= event.maxBookings) {
      await prisma.event.update({
        where: { id: eventId },
        data: { status: 'booked' }
      });
    }

    logger.info('Successfully booked event', { eventId, bookingId: booking.id });
    res.json(booking);
  } catch (error) {
    logger.error('Failed to book event', error);
    res.status(500).json({ error: 'Failed to book event' });
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

module.exports = router;
