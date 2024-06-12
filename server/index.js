// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const ConnectionToDB = require('./Database/db');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const WebSocket = require('ws');
// const path = require('path');
// const Grid = require('gridfs-stream');

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Grid = require('gridfs-stream');
// const path = require('path');
// const cors = require('cors');
// const roomRoutes = require('./routes/rooms');


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// app.use('/');
// // Connect to the database
// ConnectionToDB();

// const PORT = 3000;
// app.listen(PORT, () => console.log('Server running on port', PORT));



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Grid = require('gridfs-stream');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const roomRoutes = require('./Routes/rooms');



const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//     }
// });
// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });

const PORT = 3000;
mongoose.connect('mongodb://tejasmandloi14:admin@ac-cfddum0-shard-00-00.lk5cwzm.mongodb.net:27017,ac-cfddum0-shard-00-01.lk5cwzm.mongodb.net:27017,ac-cfddum0-shard-00-02.lk5cwzm.mongodb.net:27017/?ssl=true&replicaSet=atlas-6cmegy-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mediaNetCluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use(cors());
app.use(express.json());

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Serve files from GridFS
app.get('/uploads/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

// Use routes
app.use('/api/rooms', roomRoutes);



// WebSocket connection
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('joinRoom', ({ roomId, username }) => {
//         socket.join(roomId);
//         socket.to(roomId).emit('message', { sender: 'admin', content: `${username} has joined the room` });
//     });

//     socket.on('sendMessage', ({ roomId, sender, content, fileType }) => {
//         const newMessage = { roomId, sender, content, fileType, createdAt: new Date() };
//         io.to(roomId).emit('message', newMessage);
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});