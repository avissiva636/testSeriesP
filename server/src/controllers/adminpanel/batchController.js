const asyncHandler = require("express-async-handler");
const { BatchModel: Batch } = require('../../database/index');

//@desc get All Batches
//@route GET admin/batch
//access private
const getBatches = asyncHandler(async (req, res) => {
    const Batches = await Batch.find({});

    if (Batches) {
        res.status(200).json(Batches);
    } else {
        res.status(404);
        throw new Error("No Batch");
    }
});

//@desc get Batches
//@route GET admin/Batches/:id
//access private
const getBatch = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        throw new Error("please add id");
    }
    const batchResult = await Batch.findById(id);

    if (batchResult) {
        res.status(200).json(batchResult);
    } else {
        res.status(404);
        throw new Error("Batch not Found");
    }
});

//@desc create the Batch
//@route POST admin/Batch
//access private
const createBatch = asyncHandler(async (req, res) => {
    const { course, name, description } = req.body;

    if (!course || !name || !description) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const createdBatch = await Batch.create({ course, name, description });

    if (createdBatch) {
        res.status(201).json(createdBatch);
    } else {
        res.status(400);
        throw new Error("Batch not created");
    }
});

module.exports = { getBatches, getBatch, createBatch };