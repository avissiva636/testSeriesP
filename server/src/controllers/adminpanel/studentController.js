const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { StudentModel: Student } = require("../../database/index");

//@desc get All Student without condition
//@route GET /admin/student/uncondition
//access private
const getAllStudents = asyncHandler(async (req, res) => {

    const students = await Student.find({ status: "approved" });

    if (students) {
        res.status(200).json(students);
    } else {
        res.status(404).json({ "message": "No Student" });
    }
});

//@desc get All Student
//@route GET /admin/student
//access private
const getStudents = asyncHandler(async (req, res) => {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
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
            $match: {
                $and: [
                    { 'name': { $regex: new RegExp(clientSearch.userName, "i") } },
                    { 'email': { $regex: new RegExp(clientSearch.userEmail, "i") } },
                    { 'status': { $regex: new RegExp(clientSearch.userStatus, "i") } },
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

    const students = await Student.aggregate(pipeline);
    const totalCount = students[0].totalCount[0] ? students[0].totalCount[0].value : 0;

    if (students) {        
        res.status(200).json({            
            students: students[0].paginatedData,
            total: totalCount
        });
    } else {
        res.status(404).json({ "message": "No Student" });
    }
});

//@desc get Specific Student
//@route GET /admin/student/:sid
//access private
const getSpecificStudent = asyncHandler(async (req, res) => {
    const sid = req.params.sid;
    const student = await Student.findById(sid).select('-password')

    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ "message": "No Student" });
    }
});

// @desc create student
// @route POST /admin/student
// access private
const createStudent = asyncHandler(async (req, res) => {
    const { name, age, sex, userName, password, course, batch,
        email, mobile, telephone, status } = req.body;

    if (!name, !age, !sex, !userName, !password,
        !email, !mobile, !status) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }


    const createdStudent = await Student.create({
        name, age: JSON.parse(age), sex, userName, password,
        course: course ? course : undefined,
        batch: batch ? batch : undefined,
        email, mobile: JSON.parse(mobile), telephone: JSON.parse(telephone), status
    })

    if (createdStudent) {
        res.status(201).json(createdStudent);
    } else {
        res.status(400).json({ "message": "Student not created" });
    }

});

// @desc update student
// @route PUT /admin/student/:id
// access private
const updateStudent = asyncHandler(async (req, res) => {
    const id = req.params.sid;

    const { name, age, sex, userName, password, course, batch,
        email, mobile, telephone, status } = req.body;

    if (!name, !age, !sex, !userName,
        !email, !mobile, !status) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, {
        name, age, sex, userName,
        password: password ? password : undefined,
        course: course ? course : undefined,
        batch: batch ? batch : undefined,
        email, mobile, telephone, status
    });


    if (updatedStudent) {
        res.status(200).json(updatedStudent);
    } else {
        res.status(400).json({ "message": "Student not updated" });
    }

});

// @desc delete student
// @route DELETE /admin/student/:id
// access private
const deleteStudent = asyncHandler(async (req, res) => {
    const id = req.params.sid;

    const deleteStudent = await Student.findByIdAndDelete(id);

    if (deleteStudent) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "Student not deleted" });
    }

});

module.exports = { getAllStudents, getStudents, getSpecificStudent, createStudent, updateStudent, deleteStudent };