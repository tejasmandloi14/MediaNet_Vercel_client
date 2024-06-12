const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    roomId: { type: String, required: true },
    sender: { type: String, required: true },
    content: { type: String },
    fileId: { type: mongoose.Schema.Types.ObjectId },
    fileType: { type: String, enum: ['text', 'file', 'photo'] }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);

