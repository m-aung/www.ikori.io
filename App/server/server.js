// importing modules
// const express = require('express');
import express from 'express'
// const path = require('path');
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import messageController from './controllers/messageController.js';
import authController from './controllers/authController.js'

// const messageController = require('./controllers/messageController');
// const authController = require('./controllers/authController');
// const mongoose = require('mongoose');
// require('dotenv').config();

dotenv.config();
const __dirname = path.resolve();
/* ---------------------------- Global Variables ---------------------------- */

const PORT = '3434';
const app = express();
const URI = process.env.MONGO_URI;
//connection to database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected');
});

//parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------------- serve the static files ------------------------- */

//serve the index.html
app.use(express.static(path.resolve(__dirname, '../views')));
//serve the css and js
app.use(express.static(path.resolve(__dirname, '../assets')));

//Get Message

app.use(express.json());
app.use(express.static(path.join(__dirname, '../assets/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

app.delete(
  '/:id',
  messageController.deleteMessage,
  authController.cookieChecker,
  (req, res) => {
    console.log('message deleted');
  }
);

app.get('/', messageController.getMessages, (req, res) => {
  console.log('grab', res.locals);
  res.json(res.locals);
});

app.post('/', messageController.postMessage, (req, res) => {
  console.log('post', req.body);
  res.status(200).send('post');
});

// listening on 3434
app.listen(PORT);

// exporting app
export default app;
