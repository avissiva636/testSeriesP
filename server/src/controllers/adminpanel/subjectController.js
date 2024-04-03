const asyncHandler = require("express-async-handler");
const { SubjecthModel: Subject } = require('../../database/index');

//@desc get All Subjects
//@route GET admin/subject
//access private
const getSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({});

    if (subjects) {
        res.status(200).json(subjects);
    } else {
        res.status(404).json({ "message": "No Subject" });
    }
});

//@desc get Subject
//@route GET admin/subject/:id
//access private
const getSubject = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }
    const subjectResult = await Subject.findById(id);

    if (subjectResult) {
        res.status(200).json(subjectResult);
    } else {
        res.status(404).json({ "message": "Subject not Found" });
    }
});

//@desc create the Subject
//@route POST admin/subject
//access private
const createSubject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const createdSubject = await Subject.create({ name, description });

    if (createdSubject) {
        res.status(201).json(createdSubject);
    } else {
        res.status(400).json({ "message": "Subject not created" });
    }
});

module.exports = { getSubjects, getSubject, createSubject };