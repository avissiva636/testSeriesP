const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./util/middleware/errorHandler");
const { connectDb } = require("./database");
const path = require("path");
const ejs = require('ejs');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const validateToken = require('./util/middleware/validateTokenHandler');

const initializeServer = async () => {
    const app = express();

    port = process.env.PORT || 5000;

    await connectDb();


    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../public')));

    app.use('/', require('./routes/root'));
    // app.use("/api/users", require("./routes/userRoutes"));
    app.use('/user/log', require('./routes/api/user/userLog'));
    app.use('/user/prelims', require('./routes/api/user/userPrelims'));
    app.use('/user/mains', require('./routes/api/user/userMains'));
    app.use('/user/purchased', require('./routes/api/user/userPurchased'));
    app.use('/user/schedule', require('./routes/api/user/userScheduledTest'));
    app.use('/user/discussion', require('./routes/api/user/userDiscussion'));
    app.use('/user/progress', require('./routes/api/user/userProgress'));
    app.use('/user/archive', require('./routes/api/user/userArchives'));
    app.use('/user/profile', require('./routes/api/user/userProfile'));

    app.use('/admin/subject', require('./routes/api/adminpanel/subjectRoutes'));
    app.use('/admin/course', require('./routes/api/adminpanel/courseRoutes'));
    app.use('/admin/batch', require('./routes/api/adminpanel/batchRoutes'));
    app.use('/admin/student', require('./routes/api/adminpanel/studentRoutes'));
    app.use('/admin/qpoutline', require('./routes/api/adminpanel/qpOutlineRoutes'));
    app.use('/admin/pseries', require('./routes/api/adminpanel/prelimsSeriesRoutes'));
    app.use('/admin/pQpDescseries', require('./routes/api/adminpanel/prelimsQpDescRoutes'));
    app.use('/admin/psQuestions', require('./routes/api/adminpanel/pQuestionRoutes'));
    app.use('/admin/pSales', require('./routes/api/adminpanel/prelimSalesRoutes'));
    app.use('/admin/mseries', require('./routes/api/adminpanel/mainsSeriesRoutes'));

    app.use('/refresh', require('./routes/refresh'));
    app.use('/logout', require('./routes/logout'));

    app.use(validateToken);
    app.use('/employees', require('./routes/api/employees'));

    app.all('*', (req, res) => {
        res.status(404);
        if (req.accepts('html')) {
            res.sendFile(path.join(__dirname, 'views', '404.html'));
        } else if (req.accepts('json')) {
            res.json({ "error": "404 Not Found" });
        } else {
            res.type('txt').send("404 Not Found");
        }
    });

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server runnig on port ${port}`)
    });
};

initializeServer();