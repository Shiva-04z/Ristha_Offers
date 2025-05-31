const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  validUntil: { 
    type: String, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: String, 
    default: () => new Date().toISOString() 
  }
}, { collection: 'offers' });

module.exports = mongoose.model('Promotion', promotionSchema); 