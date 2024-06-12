const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Message = require('../models/Message');
const Room = require('../models/Room');


let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Function to send a message to a specific room
exports.sendMessage = async (req, res) => {
    const { roomId, sender, content, fileType } = req.body;

    const newMessage = new Message({ roomId, sender, content, fileType });
    console.log(newMessage);
    if (req.file) {
        newMessage.fileId = req.file.id;
        newMessage.content = req.file.filename;
    }
    // const room = await Room.findOne({ code: roomId, users: { $in: [sender] } });
    // if (!room) {
    //     return res.status(403).json({ error: 'You are not authorized to view messages in this room' });
    // }

    await newMessage.save();
    // req.io.to(roomId).emit('message', newMessage);
    res.status(201).json(newMessage);
};


// Function to get messages from a specific room
exports.getMessages = async (req, res) => {
    const { roomId } = req.params;
    const body = req.body;
    // console.log(username.username);
    try {
        
        // Fetch messages for the room and send them to the client
        const messages = await Message.find({ roomId });
        res.json(messages);
    } catch (err) {
        console.error('Error retrieving messages:', err);
        res.status(500).json({ error: 'Server error' });
    }

    // const messages = await Message.find({ roomId }).sort({ createdAt: -1 }).exec();
    // res.status(200).json(messages);
};