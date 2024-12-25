const express = require('express');
const router = express.Router();

const { router: authRoutes } = require('./auth');
const eventRoutes = require('./events');

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);

module.exports = router;
