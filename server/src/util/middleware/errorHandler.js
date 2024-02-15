const { constants } = require("../constants");
const { logEvents } = require("./logevents");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message });
            logEvents(`Validation Failed|||${err.message}|||stackTrace: ${err.stack} `,"err");
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message });
            logEvents(`Not Found|||${err.message}`,"err");
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message });
            logEvents(`Unauthorized|||${err.message}`,"err");
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message });
            logEvents(`Forbidden|||${err.message}`,"err");
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message });
            logEvents(`Server Error|||${err.message}|||stackTrace: ${err.stack} `,"err");
            break;
        default:
            if (err) {
                console.log("Uncaught Error", err.message);
                logEvents(`Uncaught Error|||${err.message}|||stackTrace: ${err.stack} `,"err");
            }
            console.log("No Error, All good !");
            break;
    }
};

module.exports = errorHandler;