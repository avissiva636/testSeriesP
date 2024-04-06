const asyncHandler = require("express-async-handler");
const { CourseModel: Course } = require('../../database/index');

//@desc get All Courses
//@route GET /admin/course
//access private
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({});

    if (courses) {
        res.status(200).json(courses);
    } else {
        res.status(404).json({ "message": "No Course" });
    }
});

//@desc get Course
//@route GET /admin/course/:id
//access private
const getCourse = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }
    const courseResult = await Course.findById(id);

    if (courseResult) {
        res.status(200).json(courseResult);
    } else {
        res.status(404).json({ "message": "Course not Found" });
    }

});

//@desc create the Course
//@route POST /admin/course
//access private
const createCourse = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const createdCourse = await Course.create({ name, description });

    if (createdCourse) {
        res.status(201).json(createdCourse);
    } else {
        res.status(400).json({ "message": "Course not created" });
    }
});

//@desc update the Course
//@route PUT /admin/course
//access private
const updateCourse = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const { name, description } = req.body;

    if (!name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const updateCourse = await Course.findByIdAndUpdate(id, { name, description }, { new: true });

    if (updateCourse) {
        res.status(200).json(updateCourse);
    } else {
        res.status(400).json({ "message": "Course not updated" });
    }
});

//@desc delete the Course
//@route DELETE admin/course
//access private
const deleteCourse = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deleteCourse = await Course.findByIdAndDelete(id);

    if (deleteCourse) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "Course not deleted" });
    }
});

module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse };