const asyncHandler = require("express-async-handler");
const { mSalesModel: Msales } = require("../../database/index");
const { format } = require("date-fns");

//@desc get All Mains Sales
//@route GET /admin/mSales
//access private
const getAllmSales = asyncHandler(async (req, res) => {

    const mainSales = await Msales.find({});

    if (mainSales) {
        res.status(200).json(mainSales);
    } else {
        res.status(404).json({ "message": "No Mains Sales" });
    }
});

//@desc get All Mains Sales
//@route GET /admin/mSales/conditional
//access private
const getConditionalmSales = asyncHandler(async (req, res) => {
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
                    { 'studentName': { $regex: new RegExp(clientSearch.userName, "i") } },
                    { 'seriesName': { $regex: new RegExp(clientSearch.seriesName, "i") } },
                    {
                        'time': {
                            $gte: format(new Date(clientSearch.startingDate), 'yyy-MM-dd'),
                            $lte: format(new Date(clientSearch.endingDate), 'yyy-MM-dd')
                        }
                    },
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

    const mainsSales = await Msales.aggregate(pipeline);
    const totalCount = mainsSales[0].totalCount[0] ? mainsSales[0].totalCount[0].value : 0;


    if (mainsSales) {
        res.status(200).json({
            seriesSales: mainsSales[0].paginatedData,
            total: totalCount
        });
    } else {
        res.status(404).json({ "message": "No Mains Sales" });
    }
});

//@desc get Specific Mains Sale
//@route GET /admin/mSales/:msid
//access private
const getSpecificMSale = asyncHandler(async (req, res) => {
    const msid = req.params.msid;
    const mSale = await Msales.findById(msid)

    if (mSale) {
        res.status(200).json(mSale);
    } else {
        res.status(404).json({ "message": "No mains Sale" });
    }
});

// @desc create student
// @route POST /admin/mSales
// access private
const createMainsSale = asyncHandler(async (req, res) => {
    
    const { series, seriesName, student, studentName, price } = req.body;

    if (!series, !seriesName, !student, !studentName) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const mSaleData = await Msales.find({ studentName, seriesName });

    if (mSaleData.length > 0) {
        res.status(400).json({ "message": "Mains Sale already created" });
    } else {
        const createdmSale = await Msales.create({
            series, student, seriesName, studentName, price
        })

        if (createdmSale) {
            res.status(201).json(createdmSale);
        } else {
            res.status(400).json({ "message": "Mains Sale not created" });
        }
    }

});

// @desc delete student
// @route DELETE /admin/mSales/:msid
// access private
const deleteMSales = asyncHandler(async (req, res) => {
    const id = req.params.msid;

    const deleteMainsSale = await Msales.findByIdAndDelete(id);

    if (deleteMainsSale) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "Mains Sale not deleted" });
    }

});

module.exports = { getAllmSales, getConditionalmSales, getSpecificMSale, createMainsSale, deleteMSales };