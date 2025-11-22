// node scripts/testUpdate.js <LEAD_ID> <NEW_NAME>
const mongoose = require('mongoose');
const Lead = require('../src/models/lead.model').Lead; // may need path adjust
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unite';
(async function(){
  await mongoose.connect(MONGO);
  const id = process.argv[2];
  const r = await mongoose.model('Lead').findByIdAndUpdate(id, { name: process.argv[3], updatedAt: new Date() }, { new: true });
  console.log('updated', r);
  await mongoose.disconnect();
})();
