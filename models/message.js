const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
