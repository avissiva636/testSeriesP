const asyncHandler = require("express-async-handler");
const { psQuestionModel: psQuestion } = require('../../database/index');

//@desc get All prelims Questions
//@route GET /admin/psQuestions
//access private 
const getAllPsQuestions = asyncHandler(async (req, res) => {
    const psQuestions = await psQuestion.find({});

    if (psQuestions) {
        res.status(200).json(psQuestions);
    } else {
        res.status(404).json({ "message": "No prelims questions" });
    }
});

//@desc get All prelims Qp Desc
//@route GET /admin/pQpDescseries/:id
//access private 
// const getAllSpecificPQpDescs = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const pQpDescs = await pQpDescription.find({ pSeries: id });

//     if (pQpDescs) {
//         res.status(200).json(pQpDescs);
//     } else {
//         res.status(404).json({ "message": "No prelims question description" });
//     }
// });

//@desc get prelims Questions
//@route GET /admin/psQuestions/:pqid
//access private
const getPsQuestion = asyncHandler(async (req, res) => {
    const id = req.params.pqid;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }

    const psSpeficQuestion = await psQuestion.find({ pqDesc: id });

    if (psSpeficQuestion) {
        res.status(200).json(psSpeficQuestion);
    } else {
        res.status(200).json([]);
    }

});

//@desc create the prelims Question
//@route POST /admin/psQuestions
//access private
const createPsQuestion = asyncHandler(async (req, res) => {
    const { pqDesc, title, questions } = req.body;


    if (!pqDesc || !title || !questions) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const createdPsQuestion = await psQuestion.create({
        pqDesc, title, questions
    });

    if (createdPsQuestion) {
        res.status(201).json(createdPsQuestion);
    } else {
        res.status(400).json({ "message": "ps Question not created" });
    }
});

//@desc update the prelims Questions
//@route PUT /admin/psQuestions/:pqid
//access private
const updatePsQuestion = asyncHandler(async (req, res) => {
    const id = req.params.pqid;

    const { pqDesc, questions } = req.body;

    if (!pqDesc || !questions) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatepQsQuestion = await psQuestion.findOneAndUpdate(
        { pqDesc: id },
        {
            pqDesc, pqDescString: pqDesc, questions
        }, { new: true, upsert: true })


    if (updatepQsQuestion) {
        res.status(200).json(updatepQsQuestion);
    } else {
        res.status(400).json({ "message": "ps Question not updated" });
    }
});


//@desc delete the prelims Question
//@route DELETE /admin/psQuestions/:id
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
    getAllPsQuestions, getPsQuestion,
    createPsQuestion, updatePsQuestion, deletePQpDesc
};