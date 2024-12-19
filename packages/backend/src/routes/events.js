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

// POST /api/dates/:id/book - Book date
router.post('/:id/book', async (req, res) => {
  try {
    logger.info('Booking event', { id: req.params.id, body: req.body });
    
    const event = await prisma.event.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!event) {
      logger.error('Event not found for booking', { id: req.params.id });
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.status !== 'available') {
      logger.error('Event not available for booking', { id: req.params.id, status: event.status });
      return res.status(400).json({ error: 'Event is not available for booking' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status: 'booked',
        bookerName: req.body.name,
        bookerEmail: req.body.email,
        bookerPhone: req.body.phone
      }
    });

    logger.info('Successfully booked event', { event: updatedEvent });
    res.json(updatedEvent);
  } catch (error) {
    logger.error('Failed to book event', error);
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;
