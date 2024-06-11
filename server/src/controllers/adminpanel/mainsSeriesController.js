const asyncHandler = require("express-async-handler");
const { mSeriesModel: MSeries, mQpDesModel: mQpDescription } = require('../../database/index');
const path = require("path");
const fs = require('fs');

//@desc get All Mains Series
//@route GET /admin/mseries
//access private
const getMSerieses = asyncHandler(async (req, res) => {
    const mSeries = await MSeries.find({});

    if (mSeries) {
        res.status(200).json(mSeries);
    } else {
        res.status(404).json({ "message": "No Mains Series" });
    }
});

//@desc get Mains Series
//@route GET /admin/mseries/:mid
//access private
const getMSeries = asyncHandler(async (req, res) => {
    const mid = req.params.mid;
    if (!mid) {
        res.status(400);
        throw new Error("please add mid");
    }
    const MSeriesResult = await MSeries.findById(mid);

    if (MSeriesResult) {
        res.status(200).json(MSeriesResult);
    } else {
        res.status(404).json({ "message": "MSeries not Found" });
    }

});

//@desc create the Mains Series
//@route POST /admin/mseries
//access private
const createMSeries = asyncHandler(async (req, res) => {

    const { title, description, status,
        paid, price, paymentLink } = req.body;
    const schedule = req.msImageName;

    if (!title || !description ||
        !paid || !schedule || !paymentLink ||
        !(price !== null && price !== undefined)
    ) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const createdMS = await MSeries.create({
        title, description, status,
        paid, price, schedule, paymentLink
    });

    if (createdMS) {
        res.status(201).json(createdMS);
    } else {
        res.status(400).json({ "message": "Mains series not created" });
    }
});

//@desc update the Mains Series
//@route PUT /admin/mseries/:mid
//access private
const updateMSeries = asyncHandler(async (req, res) => {
    const id = req.params.mid;
    const schedule = req.msImageName;

    const { title, description, status,
        paid, price, paymentLink } = req.body;

    if (!title || !description || !paid || !paymentLink ||
        !status ||
        !(price !== null && price !== undefined)) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updatemSeries = await MSeries.findByIdAndUpdate(id, {
        title, description, status, paid, price,
        schedule,
        paymentLink
    }, { new: true });

    if (updatemSeries) {
        res.status(200).json(updatemSeries);
    } else {
        res.status(400).json({ "message": "MSeries not updated" });
    }
});

//@desc update the Mains Series Status
//@route PUT /admin/mseries/msingle/:mid
//access private
const updatePsStatus = asyncHandler(async (req, res) => {
    const id = req.params.mid;
    const { status } = req.body;

    if (!status) {
        res.status(400);
        throw new Error("Enter the mandatory fields");
    }

    const updateMSeries = await MSeries.findByIdAndUpdate(
        id,
        { status: status },
        { new: true }
    );

    if (updateMSeries) {
        res.status(200).json(updateMSeries);
    } else {
        res.status(400).json({ "message": "Status not updated" });
    }
});

//@desc delete the Mains Series
//@route DELETE /admin/mseries/:mid
//access private
const deleteMSeries = asyncHandler(async (req, res) => {
    const id = req.params.mid;
    const mQpDescs = await mQpDescription.find({ mSeries: id });

    if (mQpDescs.length > 0) {
        res.status(403).json({ "message": "MSeries not deleted" });
    }
    else {
        const { imgName } = req.body;

        const deletePhoto = path.join(__dirname, '../../../public/images/mains', imgName);
        if (fs.existsSync(deletePhoto)) {
            fs.unlinkSync(deletePhoto);
        } else {
            console.log(`File ${deletePhoto} does not exist.`);
        }
        const deleteMSeries = await MSeries.findByIdAndDelete(id);

        if (deleteMSeries) {
            res.status(204).end();
        } else {
            res.status(400).json({ "message": "Mains Series not deleted" });
        }
    }

});

module.exports = {
    getMSerieses, getMSeries,
    createMSeries, updateMSeries, updatePsStatus, deleteMSeries
};