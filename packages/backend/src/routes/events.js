const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/dates - Get all available dates
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        visibility: true,
        status: 'available'
      },
      orderBy: {
        date: 'asc'
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /api/dates - Create new date
router.post('/', async (req, res) => {
  try {
    const event = await prisma.event.create({
      data: {
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
      }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

// PUT /api/dates/:id - Update date
router.put('/:id', async (req, res) => {
  try {
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
    res.json(event);
  } catch (error) {
    res.status(404).json({ error: 'Event not found or update failed' });
  }
});

// DELETE /api/dates/:id - Delete date
router.delete('/:id', async (req, res) => {
  try {
    await prisma.event.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Event not found or delete failed' });
  }
});

// POST /api/dates/:id/book - Book date
router.post('/:id/book', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.status !== 'available') {
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

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;
