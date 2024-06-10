const asyncHandler = require("express-async-handler");
const { mResultModel: mainResult, mQpDesModel: mQpDescription } = require('../../database/index');
const path = require("path");
const fs = require('fs');
const mongoose = require('mongoose');

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

//@desc get All Student prelim result of particular question with prelimDescriptionId
//@route GET /admin/mQpDescseries/mResult/:mDescId
//access private
const getSpecifcMainsResult = asyncHandler(async (req, res) => {
    const { mQDesId, page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    const clientSearch = search !== null ? JSON.parse(search) : null;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
        const sortParsed = JSON.parse(sort);

        const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort === "asc" ? 1 : -1),
        };

        return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : { undefined: -1 };

    const pipeline = [
        {
            $match: { questionDescriptionId: new mongoose.Types.ObjectId(mQDesId) }
        },
        {
            $lookup: {
                from: 'students',
                localField: 'userId',
                foreignField: '_id',
                as: 'userId'
            }
        },
        {
            $lookup: {
                from: 'mseriesqpdescs',
                localField: 'questionDescriptionId',
                foreignField: '_id',
                as: 'questionDescriptions'
            }
        },
        {
            $project: {
                userId: { _id: 1, name: 1 },
                questionDescriptions: { _id: 1, schedule: 1, title: 1, description: 1 },
                questionDescriptionId: 1,
                submittedAnswer: 1,
                correctedAnswer: 1
            }
        },
        {
            $project: {
                userId: { $arrayElemAt: ["$userId", 0] },
                questionDescriptions: { $arrayElemAt: ["$questionDescriptions", 0] },
                questionDescriptionId: 1,
                submittedAnswer: 1,
                correctedAnswer: 1
            }
        },
        {
            $match: {
                $or: [
                    { questionDescriptionId: new mongoose.Types.ObjectId(mQDesId) },
                    { "userId.name": { $regex: new RegExp(clientSearch, "i") } },
                ]
            }
        },
        {
            $facet: {
                totalCount: [{ $count: "value" }],
                paginatedData: [
                    { $sort: sortFormatted },
                    { $skip: page * pageSize },
                    { $limit: pageSize * 1 }
                ]
            }
        }
    ];

    const mResults = await mainResult.aggregate(pipeline);
    const totalCount = mResults[0].totalCount[0] ? mResults[0].totalCount[0].value : 0;

    if (mResults) {
        res.status(200).json({
            mResults: mResults[0].paginatedData,
            total: totalCount
        });
    } else {
        res.status(404).json({ "message": "No Student" });
    }
});

//@desc updated Mains Corrected Result
//@route PUT /admin/mQpDescseries/mSubmit/:uid
//access private
const updatecorrectedMainsResult = asyncHandler(async (req, res) => {
    const uid = req.params.uid;
    const msCorrectionImageName = req.msCorrectionImageName;
    const { mQDesId } = req.body;

    const mainsResult = await mainResult.findOneAndUpdate(
        {
            userId: new mongoose.Types.ObjectId(uid),
            questionDescriptionId: new mongoose.Types.ObjectId(mQDesId)
        },
        {
            $set: { correctedAnswer: msCorrectionImageName }
        },
        {
            new: true,
        }
    );

    if (mainsResult) {
        res.json({
            message: "proceeded"
        })
    } else {
        res.status(400).json({ "message": "No Mains Result" });
    }

});

module.exports = {
    getAllMQpDescs, getAllSpecificMQpDescs, getMQpDesc,
    getSpecifcMainsResult,
    createMQpDesc, updateMQpDesc, updateMQpDescStatus,
    deleteMQpDesc,
    updatecorrectedMainsResult
};