const path = require("path");
const fs = require('fs');
const multer = require('multer');
const dataflow = multer();


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

// Mains Series
const msStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images', 'mains'))) {
            if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images'))) {
                await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images'));
            }
            await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images', 'mains'));
        }
        cb(null, path.join(__dirname, '../../../public/images/mains'));
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        req.msImageName = fileName;
        cb(null, fileName);
    }
});
const msUpload = multer({
    storage: msStorage,
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

// Prelims Description Series
const psDescStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images', 'pQpDesc'))) {
            if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images'))) {
                await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images'));
            }
            await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images', 'pQpDesc'));
        }
        cb(null, path.join(__dirname, '../../../public/images/pQpDesc'));
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        req.psQpDescImageName = fileName;
        cb(null, fileName);
    }
});
const psDescUpload = multer({
    storage: psDescStorage,
    fileFilter: (req, file, cb) => {
        // Check if conditions are met
        const { pSeries, series, title, description,
            nOptions, nQuestions, alottedTime, cMarks, wMarks,
            instruction } = req.body;

        if (!pSeries || !series || !title || !description ||
            !nOptions || !nQuestions || !alottedTime ||
            !cMarks || !instruction ||
            !(wMarks !== null && wMarks !== undefined)) {
            cb(new Error('File upload restricted'));
        } else {
            cb(null, true);
        }
    }
});

// Mains Description Series
const msDescStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images', 'mQpDesc'))) {
            if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images'))) {
                await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images'));
            }
            await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images', 'mQpDesc'));
        }
        cb(null, path.join(__dirname, '../../../public/images/mQpDesc'));
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        req.msQpDescImageName = fileName;
        cb(null, fileName);
    }
});
const msDescUpload = multer({
    storage: msDescStorage,
    fileFilter: (req, file, cb) => {
        // Check if conditions are met
        const { mSeries, series, title, description,
            alottedTime, instruction, question } = req.body;

        if (!mSeries || !series || !title || !description ||
            !alottedTime || !instruction || !question
        ) {
            cb(new Error('File upload restricted'));
        } else {
            cb(null, true);
        }
    }
});

module.exports = { psUpload, msUpload, psDescUpload, msDescUpload, dataflow };