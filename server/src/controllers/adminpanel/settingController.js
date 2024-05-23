const asyncHandler = require("express-async-handler");
const { StudentModel: Student, pSalesModel: PSales, PSeriesModel: PSeries,
    mSalesModel: Msales, mSeriesModel: MSeries,
    adminModel: Admin
} = require("../../database/index");
const { format, startOfMonth } = require("date-fns");
const bcrypt = require('bcrypt');
const ROLES_LIST = require("../../util/roles_list");

//@desc Get dashboard data
//@route GET admin/setting/dashboard
//access private
const getDashboard = asyncHandler(async (req, res) => {
    const totalReceived = await Student.countDocuments();

    const salePipeline = [
        {
            $match: {
                'time': {
                    $gte: format(startOfMonth(new Date()), 'yyy-MM-dd'),
                    $lte: format(new Date(), 'yyy-MM-dd')
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$price" }
            }
        }
    ];

    const prelimPrice = await PSales.aggregate(salePipeline);
    const totalPrelim = await PSeries.countDocuments();
    const activePrelim = await PSeries.countDocuments({ status: 'start' });

    const mainsPrice = await Msales.aggregate(salePipeline);
    const totalMains = await MSeries.countDocuments();
    const activeMains = await MSeries.countDocuments({ status: 'start' });


    res.status(200).json({
        student: totalReceived,
        prelim: { total: totalPrelim, active: activePrelim, price: prelimPrice[0]?.totalAmount },
        mains: { total: totalMains, active: activeMains, price: mainsPrice[0]?.totalAmount }
    });

});

//@desc Get Profile
//@route GET admin/setting/profile
//access private
const getProfile = asyncHandler(async (req, res) => {
    const allProfile = await Admin.find({}).select("-password");
    res.status(200).json(allProfile)
})

//@desc Create Profile
//@route POST admin/setting/profile
//access private
const createProfile = asyncHandler(async (req, res) => {
    const { userName: user, Password: pwd, email, role } = req.body;

    if (!user || !pwd || role.length < 1) return res.status(400).json({ 'message': 'Enter Required Fields' });

    const roles = role.reduce((accumulator, currentData) => {
        accumulator[currentData] = currentData;
        return accumulator;
    }, {})

    // check for duplicate usernames in the db    
    const duplicate = await Admin.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const adminData = {
        username: user,
        password: hashedPwd,
        email,
        roles: {
            Admin: ROLES_LIST[roles?.Admin] || null,
            Editor: ROLES_LIST[roles?.Editor] || null,
        }
    };

    const newAdmin = new Admin(adminData);
    const savedAdmin = await newAdmin.save();

    // console.log(savedAdmin);
    if (savedAdmin) {
        res.status(201).json({ 'success': `New user ${user} created!`, savedAdmin });
    }
    else {
        res.status(400).json({ "message": "Profile not created" });
    }

});

//@desc Update Profile
//@route PUT admin/setting/profile
//access private
const updateProfile = asyncHandler(async (req, res) => {
    const { profileId, username, Password: password, role, email } = req.body;

    if (!profileId) return res.status(400).json({ 'message': 'profileId parameter is required' });    

    const roles = role.reduce((accumulator, currentData) => {
        accumulator[currentData] = currentData;
        return accumulator;
    }, {})

    const updatedProfile = await Admin.findByIdAndUpdate(profileId, {
        username,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        email,
        roles: {
            Admin: ROLES_LIST[roles?.Admin] || null,
            Editor: ROLES_LIST[roles?.Editor] || null,
        }
    }, { new: true });


    if (updatedProfile) {
        res.status(200).json({ "message": `${username} not updated` })
    }
    else {
        res.status(400).json({ "message": "Profile not updated" });
    }

});

//@desc delete the Profile
//@route DELETE admin/setting/profile
//access private
const deleteProfile = asyncHandler(async (req, res) => {
    const { pid } = req.body;
    if (!pid) return res.status(400).json({ 'message': 'pid parameter is required' });

    const deletedProfile = await Admin.findByIdAndDelete(pid);

    if (deletedProfile) {
        res.status(204).end();
    } else {
        res.status(400).json({ "message": "Profile not deleted" });
    }
});

module.exports = { getProfile, createProfile, updateProfile, deleteProfile, getDashboard };