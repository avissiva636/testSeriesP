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

//@desc update the Subject
//@route PUT admin/subject
//access private
const updateSubject = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const updateSubject = await Subject.findByIdAndUpdate(id, { name, description }, { new: true });

    if (updateSubject) {
        res.status(200).json(updateSubject);
    } else {
        res.status(400).json({ "message": "Subject not updated" });
    }
});

//@desc delete the Subject
//@route DELETE admin/subject
//access private
const deleteSubject = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deleteSubject = await Subject.findByIdAndDelete(id);

    if (deleteSubject) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "Subject not deleted" });
    }
});

module.exports = { getSubjects, getSubject, createSubject, updateSubject, deleteSubject };