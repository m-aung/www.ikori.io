const mongoose = require('mongoose');
require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
const URI = process.env.MONGO_URI || myURI;

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema); // <-- export your model
