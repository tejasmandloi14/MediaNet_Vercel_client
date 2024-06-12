
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const dbName = 'mediaNetCluster';
const URL = 'mongodb://tejasmandloi14:admin@ac-cfddum0-shard-00-00.lk5cwzm.mongodb.net:27017,ac-cfddum0-shard-00-01.lk5cwzm.mongodb.net:27017,ac-cfddum0-shard-00-02.lk5cwzm.mongodb.net:27017/?ssl=true&replicaSet=atlas-6cmegy-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mediaNetCluster';

const ConnectionToDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.log('Error:', error.message);
    }
};


module.exports = ConnectionToDB;
