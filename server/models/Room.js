const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    code: { type: String, required: true, unique: true },
    users: [{ type: String }] // Array of user identifiers (could be usernames, user IDs, etc.)
});

module.exports = mongoose.model('Room', roomSchema);

