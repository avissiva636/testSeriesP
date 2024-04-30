const asyncHandler = require("express-async-handler");
const { PSeriesModel: PSeries } = require('../../database/index');
const path = require("path");
const fs = require('fs');

//@desc get All Prelims Series
//@route GET /admin/pseries
//access private
const getPSerieses = asyncHandler(async (req, res) => {
    const pSeries = await PSeries.find({});

    if (pSeries) {
        res.status(200).json(pSeries);
    } else {
        res.status(404).json({ "message": "No Prelims Series" });
    }
});

//@desc get Prelims Series
//@route GET /admin/pseries/:pid
//access private
const getPSeries = asyncHandler(async (req, res) => {
    const pid = req.params.pid;
    if (!pid) {
        res.status(400);
        throw new Error("please add pid");
    }
    const PSeriesResult = await PSeries.findById(pid);

    if (PSeriesResult) {
        res.status(200).json(PSeriesResult);
    } else {
        res.status(404).json({ "message": "PSeries not Found" });
    }

});

//@desc create the Prelims Series
//@route POST /admin/pseries
//access private
const createPSeries = asyncHandler(async (req, res) => {

    const { title, description, status,
        paid, price, paymentLink } = req.body;
    const schedule = req.psImageName;

    if (!title || !description || !status ||
        !paid || !schedule || !paymentLink ||
        !(price !== null && price !== undefined)
    ) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const createdPS = await PSeries.create({
        title, description, status,
        paid, price, schedule, paymentLink
    });

    if (createdPS) {
        res.status(201).json(createdPS);
    } else {
        res.status(400).json({ "message": "prelims series not created" });
    }
});

//@desc update the Prelims Series
//@route PUT /admin/pseries/:pid
//access private
const updatePSeries = asyncHandler(async (req, res) => {
    const id = req.params.pid;
    const schedule = req.psImageName;

    const { title, description, status,
        paid, price, paymentLink } = req.body;

    if (!title || !description || !paid || !paymentLink ||
        !status ||
        !(price !== null && price !== undefined)) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatePSeries = await PSeries.findByIdAndUpdate(id, {
        title, description, status, paid, price,
        schedule,
        paymentLink
    }, { new: true });

    if (updatePSeries) {
        res.status(200).json(updatePSeries);
    } else {
        res.status(400).json({ "message": "PSeries not updated" });
    }
});

//@desc delete the Prelims Series
//@route DELETE /admin/pseries/:pid
//access private
const deletePSeries = asyncHandler(async (req, res) => {
    const id = req.params.pid;

    const { imgName } = req.body;

    const deletePhoto = path.join(__dirname, '../../../public/images/prelims', imgName);
    if (fs.existsSync(deletePhoto)) {
        fs.unlinkSync(deletePhoto);
    } else {
        console.log(`File ${deletePhoto} does not exist.`);
    }
    const deletePSeries = await PSeries.findByIdAndDelete(id);

    if (deletePSeries) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "PSeries not deleted" });
    }
});

module.exports = {
    getPSerieses, getPSeries, createPSeries,
    updatePSeries, deletePSeries
};