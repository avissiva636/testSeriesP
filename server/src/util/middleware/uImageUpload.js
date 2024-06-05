const path = require("path");
const fs = require('fs');
const multer = require('multer');
const { mAttemptModel } = require("../../database");
// const dataflow = multer();

const uMainsStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images', 'uMains'))) {
            if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'public', 'images'))) {
                await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images'));
            }
            await fs.promises.mkdir(path.join(__dirname, '..', '..', '..', 'public', 'images', 'uMains'));
        }
        cb(null, path.join(__dirname, '../../../public/images/uMains'));
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        req.mainsAnswer = fileName;
        cb(null, fileName);
    }
});
const uMainsUpload = multer({
    storage: uMainsStorage,
    fileFilter: async (req, file, cb) => {
        const { uid, mSeries, mqDesc } = req.body;

        const foundAttempt = await mAttemptModel.findOneAndUpdate(
            {
                userId: uid,
                seriesId: mSeries,
                'questionDescriptions.questionDescriptionId': mqDesc
            },
            {
                $inc: { 'questionDescriptions.$.attempt': 1 }
            }
        );

        if (foundAttempt) {
            cb(null, false);
        } else {
            cb(null, true);
        }
    }
});

module.exports = { uMainsUpload };