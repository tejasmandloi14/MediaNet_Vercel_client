
const Room = require("../models/Room");

// Function to create a new room
exports.createRoom = async (req, res) => {
    const { code } = req.body;
    const newRoom = new Room({ code, users: [] });

    await newRoom.save();
    res.status(201).json(newRoom);
};

// Function to join a room
exports.joinRoom = async (req, res) => {
    const { code, username } = req.body;
    const room = await Room.findOne({ code });

    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    // Add the user to the room if not already in the room
    if (!room.users.includes(username)) {
        room.users.push(username);
        await room.save();
    }

    res.status(200).json({ message: 'Successfully joined the room', room });
};