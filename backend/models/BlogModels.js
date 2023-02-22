const mongoose = require('mongoose');

//Creer un shema pour les blogs
const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },
    comments: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Comment' 
      }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sport: { 
      type: String,
      required: true 
    },
    Image:{
      type:String,
    },
    tags: [{
      type: String,
    }]
  });

module.exports = mongoose.model('Blog', postSchema);
