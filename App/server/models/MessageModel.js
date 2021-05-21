// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
const URI = process.env.MONGO_URI || myURI;

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const message = mongoose.model('Message', messageSchema); // <-- export your model
export default message;