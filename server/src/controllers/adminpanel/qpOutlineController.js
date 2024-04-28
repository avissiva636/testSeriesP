const asyncHandler = require("express-async-handler");
const { QpOutlineModel: QpOutline } = require('../../database/index');

//@desc get All QpOutlines
//@route GET /admin/qpoutline
//access private
const getQpOutlines = asyncHandler(async (req, res) => {
    const qpOutlines = await QpOutline.find({});

    if (qpOutlines) {
        res.status(200).json(qpOutlines);
    } else {
        res.status(404).json({ "message": "No QpOutline" });
    }
});

//@desc get QpOutline
//@route GET /admin/qpoutline/:id
//access private
const getQpOutline = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }
    const qpOutlineResult = await QpOutline.findById(id);

    if (qpOutlineResult) {
        res.status(200).json(qpOutlineResult);
    } else {
        res.status(404).json({ "message": "QpOutline not Found" });
    }

});

//@desc create the QpOutline
//@route POST /admin/qpoutline
//access private
const createQpOutline = asyncHandler(async (req, res) => {
    const { title, description, course, batch, subject,
        nOptions, nQuestions, allottedTime, cMarks, wMarks,
        random, instruction } = req.body;

    if (!title || !description ||
        !nOptions || !nQuestions || !allottedTime ||
        !cMarks || !random ||
        !(wMarks !== null && wMarks !== undefined)
    ) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const createdQp = await QpOutline.create({
        title, description,
        course: course ? course : undefined,
        batch: batch ? batch : undefined,
        subject: subject ? subject : undefined,
        nOptions, nQuestions, allottedTime, cMarks, wMarks, random,
        instruction: instruction ? instruction : undefined
    });

    if (createdQp) {
        res.status(201).json(createdQp);
    } else {
        res.status(400).json({ "message": "QpOutline not created" });
    }
});

//@desc update the QpOutline
//@route PUT /admin/qpoutline/:id
//access private
const updateQpOutline = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { title, description, course, batch, subject,
        nOptions, nQuestions, allottedTime, cMarks, wMarks,
        random, instruction } = req.body;
console.log(course,batch,subject)
    if (!title || !description ||
        !nOptions || !nQuestions || !allottedTime ||
        !cMarks || !random ||
        !(wMarks !== null && wMarks !== undefined)) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updateQpOutline = await QpOutline.findByIdAndUpdate(id, {
        title, description, course, batch, subject,
        nOptions, nQuestions, allottedTime, cMarks, wMarks,
        random, instruction
    }, { new: true });
    console.log(!updateQpOutline)
    if (updateQpOutline) {
        res.status(200).json(updateQpOutline);
    } else {
        res.status(400).json({ "message": "QpOutline not updated" });
    }
});

//@desc delete the QpOutline
//@route DELETE /admin/qpoutline/:id
//access private
const deleteQpOutline = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deleteQPOutline = await QpOutline.findByIdAndDelete(id);

    if (deleteQPOutline) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "QpOutline not deleted" });
    }
});

module.exports = {
    getQpOutlines, getQpOutline,
    createQpOutline, updateQpOutline, deleteQpOutline
};