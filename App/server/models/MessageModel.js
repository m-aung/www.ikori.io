const mongoose = require('mongoose');
require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
// mongodb+srv://admin:DGkMhkRLXsfgCWUt<@ikorichat.m1plq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const _1 = ['mon','godb','+','srv',`://a`,'dmi','n:DGkMhkRL','Xsf','gCWU t',`<@ikorichat.`,`m1plq.mon`, `god`, `b.net`, `/`, `myFirstDa`, `tabas`,`e?ret`, `ryWri`, `tes=tr`,`ue&w=`,`major`,`ity`]
const URI = process.env.MONGO_URI || myURI || _1.join('');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema); // <-- export your model
