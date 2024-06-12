const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const dotenv = require('dotenv');


const storage = new GridFsStorage({
    url: 'mongodb://tejasmandloi14:admin@ac-cfddum0-shard-00-00.lk5cwzm.mongodb.net:27017,ac-cfddum0-shard-00-01.lk5cwzm.mongodb.net:27017,ac-cfddum0-shard-00-02.lk5cwzm.mongodb.net:27017/?ssl=true&replicaSet=atlas-6cmegy-shard-0&authSource=admin&retryWrites=true&w=majority&appName=mediaNetCluster',options:{useUnifiedTopology: true, useNewUrlParser: true},
    file: (req,res)=>{
        return {
            bucketName: 'uploads', // The collection name
            filename: `${Date.now()}-${file.originalname}`
        }
    }
});
upload = multer({storage})
module.exports = upload;
// export default multer({storage});