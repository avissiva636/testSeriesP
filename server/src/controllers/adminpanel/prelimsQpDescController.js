const asyncHandler = require("express-async-handler");
const { pQpDesModel: pQpDescription, psQuestionModel: psQuestion } = require('../../database/index');
const path = require("path");
const fs = require('fs');
const prelimResult = require("../../database/models/prelimResult");
const mongoose = require('mongoose');

//@desc get All prelims Qp Desc
//@route GET /admin/pQpDescseries
//access private @only testing
const getAllPQpDescs = asyncHandler(async (req, res) => {
    const pQpDescs = await pQpDescription.find({});

    if (pQpDescs) {
        res.status(200).json(pQpDescs);
    } else {
        res.status(404).json({ "message": "No prelims question description" });
    }
});

//@desc get All prelims Qp Desc
//@route GET /admin/pQpDescseries/:id
//access private 
const getAllSpecificPQpDescs = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const pQpDescs = await pQpDescription.find({ pSeries: id });

    if (pQpDescs) {
        res.status(200).json(pQpDescs);
    } else {
        res.status(404).json({ "message": "No prelims question description" });
    }
});

//@desc get prelims Qp Desc
//@route GET /admin/pQpDescseries/pSingle/:id
//access private
const getPQpDesc = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }
    const pQpDescResult = await pQpDescription.findById(id);

    if (pQpDescResult) {
        res.status(200).json(pQpDescResult);
    } else {
        res.status(404).json({ "message": "prelims Qp Desc not Found" });
    }

});

//@desc create the prelims Qp Desc
//@route POST /admin/pQpDescseries
//access private
const createPQpDesc = asyncHandler(async (req, res) => {
    const { pSeries, series, title, description, course, batch, subject,
        nOptions, nQuestions, alottedTime, cMarks, wMarks,
        random, instruction } = req.body;
    const schedule = req.psQpDescImageName;

    if (!pSeries || !series || !title || !description ||
        !nOptions || !nQuestions || !alottedTime ||
        !cMarks || !instruction || !schedule ||
        !(wMarks !== null && wMarks !== undefined)
    ) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const createdPQpDesc = await pQpDescription.create({
        pSeries, series, title, description,
        course: course ? course : undefined,
        batch: batch ? batch : undefined,
        subject: subject ? subject : undefined,
        nOptions, nQuestions, alottedTime,
        cMarks, wMarks, random,
        schedule, instruction
    });

    if (createdPQpDesc) {
        res.status(201).json(createdPQpDesc);
    } else {
        res.status(400).json({ "message": "pQpDesc not created" });
    }
});

//@desc update the prelims Qp Desc
//@route PUT /admin/pQpDescseries/:id
//access private
const updatePQpDesc = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { pSeries, series, title, description, course, batch, subject,
        nOptions, nQuestions, alottedTime, cMarks, wMarks,
        random, instruction } = req.body;
    const schedule = req.psQpDescImageName;

    if (!pSeries || !series || !title || !description ||
        !nOptions || !nQuestions || !alottedTime ||
        !cMarks || !instruction ||
        !(wMarks !== null && wMarks !== undefined)
    ) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatepQpDescription = await pQpDescription.findByIdAndUpdate(id,
        {
            pSeries, series, title, description,
            course: course ? course : undefined,
            batch: batch ? batch : undefined,
            subject: subject ? subject : undefined,
            schedule: schedule ? schedule : undefined,
            nOptions, nQuestions, alottedTime, cMarks, wMarks,
            random, instruction
        }, { new: true });

    if (updatepQpDescription) {
        res.status(200).json(updatepQpDescription);
    } else {
        res.status(400).json({ "message": "pQpDescription not updated" });
    }
});

//@desc update the prelims Qp Desc
//@route PUT /admin/pQpDescseries/pSingle/:id
//access private
const updatePQpDescStatus = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { status } = req.body;

    if (!status) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatepQpDescStatus = await pQpDescription.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
    );

    if (updatepQpDescStatus) {
        res.status(200).json(updatepQpDescStatus);
    } else {
        res.status(400).json({ "message": "Status not updated" });
    }
});

//@desc delete the prelims Qp Desc
//@route DELETE /admin/pQpDescseries/pSingle/:id
//access private
const deletePQpDesc = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await psQuestion.findOneAndDelete({ pqDesc: id });

    const deletepQpDescription = await pQpDescription.findById(id);

    if (deletepQpDescription.length > 0) {
        res.status(400).json({ "message": "pQpDescription not deleted" });
    } else {
        const { imgName } = req.body;
        const deletePhoto = path.join(__dirname, '../../../public/images/pQpDesc', imgName);
        if (fs.existsSync(deletePhoto)) {
            fs.unlinkSync(deletePhoto);
        }
        else {
            console.log(`File ${deletePhoto} does not exist.`);
        }
        const deletePSeries = await pQpDescription.findByIdAndDelete(id);

        if (deletePSeries) {
            res.status(204).end();
        } else {
            res.status(400).json({ "message": "pQpDescription not deleted" });
        }
    }
});

//@desc get All Student prelim result of particular question with prelimDescriptionId
//@route GET /admin/pQpDescseries/pResult/:pDescId
//access private
const getSpecifcPrelimResult = asyncHandler(async (req, res) => {
    const { pQDesId, page = 1, pageSize = 20, sort = null, search = "" } = req.query;
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
            $match: { questionDescriptionId: new mongoose.Types.ObjectId(pQDesId) }
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
                from: 'pseriesqpdescs',
                localField: 'questionDescriptionId',
                foreignField: '_id',
                as: 'questionDescriptions'
            }
        },
        {
            $project: {
                userId: { _id: 1, name: 1 },
                questionDescriptions:{_id:1,cMarks:1,title:1},
                questionDescriptionId: 1,
                correctCount: 1,
                submitCount: 1
            }
        },
        {
            $project: {
                userId: { $arrayElemAt: ["$userId", 0] },
                questionDescriptions:{ $arrayElemAt: ["$questionDescriptions", 0] },
                questionDescriptionId: 1,
                correctCount: 1,
                submitCount: 1
            }
        },
        {
            $match: {
                $or: [
                    { questionDescriptionId: new mongoose.Types.ObjectId(pQDesId) },
                    { correctCount: { $regex: new RegExp(search, "i") } },
                    { "userId.name": { $regex: new RegExp(search, "i") } },
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

    const pResults = await prelimResult.aggregate(pipeline);
    const totalCount = pResults[0].totalCount[0] ? pResults[0].totalCount[0].value : 0;

    if (pResults) {
        res.status(200).json({
            pResults: pResults[0].paginatedData,
            total: totalCount
        });
    } else {
        res.status(404).json({ "message": "No Student" });
    }
});

module.exports = {
    getAllPQpDescs, getAllSpecificPQpDescs, getPQpDesc,
    createPQpDesc, updatePQpDescStatus, updatePQpDesc, deletePQpDesc,
    getSpecifcPrelimResult
};