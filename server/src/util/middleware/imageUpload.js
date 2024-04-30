const path = require("path");
const fs = require('fs');
const multer = require('multer');
// const dataflow = multer();


// Prelims Series
const psStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images', 'prelims'))) {
            if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images'))) {
                await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images'));
            }
            await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images', 'prelims'));
        }
        cb(null, path.join(__dirname, '../../../public/images/prelims'));
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        req.psImageName = fileName;
        cb(null, fileName);
    }
});
const psUpload = multer({
    storage: psStorage,
    fileFilter: (req, file, cb) => {
        // Check if conditions are met
        const { title, description,
            paid, price, paymentLink } = req.body;        

        if (!title || !description ||
            !paid || !paymentLink ||
            !(price !== null && price !== undefined)) {
            cb(new Error('File upload restricted'));
        } else {
            cb(null, true);
        }
    }
});

module.exports = { psUpload };