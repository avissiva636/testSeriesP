const asyncHandler = require("express-async-handler");
const { mQpDesModel: mQpDescription } = require('../../database/index');
const path = require("path");
const fs = require('fs');

//@desc get All Mains Qp Desc
//@route GET /admin/mQpDescseries
//access private @only testing
const getAllMQpDescs = asyncHandler(async (req, res) => {
    const mQpDescs = await mQpDescription.find({});

    if (mQpDescs) {
        res.status(200).json(mQpDescs);
    } else {
        res.status(404).json({ "message": "No mains question description" });
    }
});

//@desc get All mains Qp Desc
//@route GET /admin/mQpDescseries/:id
//access private 
const getAllSpecificMQpDescs = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const mQpDescs = await mQpDescription.find({ mSeries: id });

    if (mQpDescs) {
        res.status(200).json(mQpDescs);
    } else {
        res.status(404).json({ "message": "No mains question description" });
    }
});

//@desc get mains Qp Desc
//@route GET /admin/mQpDescseries/mSingle/:id
//access private
const getMQpDesc = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }
    const mQpDescResult = await mQpDescription.findById(id);

    if (mQpDescResult) {
        res.status(200).json(mQpDescResult);
    } else {
        res.status(404).json({ "message": "mains Qp Desc not Found" });
    }

});

//@desc create the mains Qp Desc
//@route POST /admin/mQpDescseries
//access private
const createMQpDesc = asyncHandler(async (req, res) => {
    const { mSeries, series, title, description,
        alottedTime, instruction, question } = req.body;
    const schedule = req.msQpDescImageName;

    if (!mSeries || !series || !title || !description ||
        !alottedTime || !instruction || !schedule || !question) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const createdMQpDesc = await mQpDescription.create({
        mSeries, series, title, description,
        alottedTime, instruction, question, schedule
    });

    if (createdMQpDesc) {
        res.status(201).json(createdMQpDesc);
    } else {
        res.status(400).json({ "message": "mQpDesc not created" });
    }
});

//@desc update the mains Qp Desc
//@route PUT /admin/mQpDescseries/:id
//access private
const updateMQpDesc = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { mSeries, series, title, description,
        alottedTime, instruction, question } = req.body;
    const schedule = req.msQpDescImageName;

    if (!mSeries || !series || !title || !description ||
        !alottedTime || !instruction || !question) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatemQpDescription = await mQpDescription.findByIdAndUpdate(id,
        {
            mSeries, series, title, description,
            alottedTime, instruction, question,
            schedule: schedule ? schedule : undefined,
        }, { new: true });

    if (updatemQpDescription) {
        res.status(200).json(updatemQpDescription);
    } else {
        res.status(400).json({ "message": "mQpDescription not updated" });
    }
});

//@desc update the mains Qp Desc
//@route PUT /admin/mQpDescseries/mSingle/:id
//access private
const updateMQpDescStatus = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { status } = req.body;

    if (!status) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatemQpDescStatus = await mQpDescription.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
    );

    if (updatemQpDescStatus) {
        res.status(200).json(updatemQpDescStatus);
    } else {
        res.status(400).json({ "message": "Status not updated" });
    }
});

//@desc delete the mains Qp Desc
//@route DELETE /admin/mQpDescseries/mSingle/:id
//access private
const deleteMQpDesc = asyncHandler(async (req, res) => {
    const id = req.params.id;    

    const deletemQpDescription = await mQpDescription.findById(id);

    if (deletemQpDescription.length > 0) {
        res.status(400).json({ "message": "mQpDescription not deleted" });
    } else {
        const { imgName } = req.body;
        const deletePhoto = path.join(__dirname, '../../../public/images/mQpDesc', imgName);
        if (fs.existsSync(deletePhoto)) {
            fs.unlinkSync(deletePhoto);
        }
        else {
            console.log(`File ${deletePhoto} does not exist.`);
        }
        const deletePSeries = await mQpDescription.findByIdAndDelete(id);

        if (deletePSeries) {
            res.status(204).end();
        } else {
            res.status(400).json({ "message": "mQpDescription not deleted" });
        }
    }
});

module.exports = {
    getAllMQpDescs, getAllSpecificMQpDescs, getMQpDesc,
    createMQpDesc, updateMQpDesc, updateMQpDescStatus,
    deleteMQpDesc
};