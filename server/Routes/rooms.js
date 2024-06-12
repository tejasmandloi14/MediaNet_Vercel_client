const express = require('express');
const roomController = require('../Controller/roomController');
const messageController = require('../Controller/messageController');
const multer = require('multer');
const upload = require('../StorageUpload/upload');

const router = express.Router();

// Endpoint to create a new room
router.post('/create', roomController.createRoom);

// Endpoint to join a room with a specific code
router.post('/join', roomController.joinRoom);

// to send messgage to specific room
router.post('/:roomId/messages', upload.single('file'), messageController.sendMessage);

// to get messages from specific rooms
router.get('/:roomId/messages', messageController.getMessages);
module.exports = router;
