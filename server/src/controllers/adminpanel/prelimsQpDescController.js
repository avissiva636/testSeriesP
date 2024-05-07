const asyncHandler = require("express-async-handler");
const { pQpDesModel: pQpDescription } = require('../../database/index');

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

    const deletepQpDescription = await pQpDescription.findByIdAndDelete(id);

    if (deletepQpDescription) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "pQpDescription not deleted" });
    }
});

module.exports = {
    getAllPQpDescs, getAllSpecificPQpDescs, getPQpDesc,
    createPQpDesc, updatePQpDescStatus, updatePQpDesc, deletePQpDesc
};