const asyncHandler = require("express-async-handler");
const { pSalesModel: PSales } = require("../../database/index");
const { format } = require("date-fns");

//@desc get All Prelims Sales
//@route GET /admin/pSales
//access private
const getAllpSales = asyncHandler(async (req, res) => {

    const prelimSales = await PSales.find({});

    if (prelimSales) {
        res.status(200).json(prelimSales);
    } else {
        res.status(404).json({ "message": "No Prelim Sales" });
    }
});

//@desc get All Prelims Sales
//@route GET /admin/pSales/conditional
//access private
const getConditionalpSales = asyncHandler(async (req, res) => {
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

    const prelimSales = await PSales.aggregate(pipeline);
    const totalCount = prelimSales[0].totalCount[0] ? prelimSales[0].totalCount[0].value : 0;


    if (prelimSales) {
        res.status(200).json({
            seriesSales: prelimSales[0].paginatedData,
            total: totalCount
        });
    } else {
        res.status(404).json({ "message": "No Prelim Sales" });
    }
});

//@desc get Specific Prelim Sale
//@route GET /admin/pSales/:psid
//access private
const getSpecificpSale = asyncHandler(async (req, res) => {
    const psid = req.params.psid;
    const pSale = await PSales.findById(psid)

    if (pSale) {
        res.status(200).json(pSale);
    } else {
        res.status(404).json({ "message": "No prelim Sale" });
    }
});

// @desc create student
// @route POST /admin/pSales
// access private
const createPrelimSale = asyncHandler(async (req, res) => {
    const { series, seriesName, student, studentName, price } = req.body;

    if (!series, !seriesName, !student, !studentName) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const pSaleData = await PSales.find({ studentName, seriesName });

    if (pSaleData.length > 0) {
        res.status(400).json({ "message": "Prelim Sale already created" });
    } else {
        const createdpSale = await PSales.create({
            series, student, seriesName, studentName, price
        })

        if (createdpSale) {
            res.status(201).json(createdpSale);
        } else {
            res.status(400).json({ "message": "Prelim Sale not created" });
        }
    }

});

// @desc delete student
// @route DELETE /admin/pSales/:psid
// access private
const deletepSales = asyncHandler(async (req, res) => {
    const id = req.params.psid;

    const deletePrelimSale = await PSales.findByIdAndDelete(id);

    if (deletePrelimSale) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "prelim Sale not deleted" });
    }

});

module.exports = { getAllpSales, getConditionalpSales, getSpecificpSale, createPrelimSale, deletepSales };