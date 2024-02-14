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
    app.use("/api/users", require("./routes/userRoutes"));
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