const multer = require('multer');

const storage = multer.memoryStorage();     // keep files in RAM
module.exports = multer({ storage });