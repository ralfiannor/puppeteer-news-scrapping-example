const { db } = require('../config/db.js');
const schema = new db.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  category: {
    type: String,
  },
  link: {
    type: String,
  },
  textDisplay: {
    type: String,
  },
  sourceName: {
    type: String,
  },
  sourceLink: {
    type: String,
  },
  postDate: Date
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  strict: false
});

module.exports = db.model('News', schema);