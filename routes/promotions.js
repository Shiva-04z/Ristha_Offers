const express = require('express');
const router = express.Router();
const Promotion = require('../models/promotion');

// Get all offers
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all offers...');
    const offers = await Promotion.find();
    console.log(`Found ${offers.length} offers`);
    res.json(offers);
  } catch (err) {
    console.error('Error fetching offers:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get one offer by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching offer with ID: ${req.params.id}`);
    const offer = await Promotion.findById(req.params.id);
    if (!offer) {
      console.log('Offer not found');
      return res.status(404).json({ message: 'Offer not found' });
    }
    console.log('Offer found:', offer);
    res.json(offer);
  } catch (err) {
    console.error('Error fetching offer:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create new offer
router.post('/', async (req, res) => {
  try {
    console.log('Creating new offer:', req.body);
    const {
      title,
      description,
      imageUrl,
      validUntil,
      isActive
    } = req.body;

    const offer = new Promotion({
      title,
      description,
      imageUrl,
      validUntil: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: isActive !== undefined ? isActive : true
    });

    const savedOffer = await offer.save();
    console.log('Offer created successfully:', savedOffer);
    res.status(201).json(savedOffer);
  } catch (err) {
    console.error('Error creating offer:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update offer by ID
router.put('/:id', async (req, res) => {
  try {
    console.log(`Updating offer with ID: ${req.params.id}`, req.body);
    const updatedOffer = await Promotion.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedOffer) {
      console.log('Offer not found for update');
      return res.status(404).json({ message: 'Offer not found' });
    }
    console.log('Offer updated successfully:', updatedOffer);
    res.json(updatedOffer);
  } catch (err) {
    console.error('Error updating offer:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete offer by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting offer with ID: ${req.params.id}`);
    const deletedOffer = await Promotion.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      console.log('Offer not found for deletion');
      return res.status(404).json({ message: 'Offer not found' });
    }
    console.log('Offer deleted successfully');
    res.json({ message: 'Offer deleted successfully' });
  } catch (err) {
    console.error('Error deleting offer:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get active offers
router.get('/active/current', async (req, res) => {
  try {
    console.log('Fetching active offers...');
    const now = new Date().toISOString();
    const activeOffers = await Promotion.find({
      isActive: true,
      validUntil: { $gt: now }
    });
    console.log(`Found ${activeOffers.length} active offers`);
    res.json(activeOffers);
  } catch (err) {
    console.error('Error fetching active offers:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 