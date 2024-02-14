// using library log for logging purpose
const winston = require('winston');//logger library

const path = require('path');
const { format } = require('date-fns');
const crypto = require("crypto");

// Function to generate dynamic filename based on log type and current date
const generateFilename = (logName) => {
    const currentDate = new Date().toISOString().split('T')[0];
    return path.join(__dirname, '..', '..', 'logs', logName, `${logName}_${currentDate}.txt`);
};


const eventLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: generateFilename('eventLog'),
            level: 'info', // Log level
            format: winston.format.combine(
                winston.format.json()
            ),
        }),
    ],
});

const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: generateFilename('errorLog'),
            level: 'info', // Log level
            format: winston.format.combine(
                winston.format.json()
            ),
        }),
    ],
});

const logEvents = (message, event) => {
    const dateTime = format(new Date(), 'yyyMMdd||HH:mm:ss');
    const logItem = `${dateTime}|||${crypto.randomUUID()}||||||${message}`;

    // Use Winston to log to file
    switch (event) {
        case "err":
            errorLogger.info(logItem);
            break;
        case "event":
            eventLogger.info(logItem);
            break;
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}|||${req.headers.origin}|||${req.url}|||`, 'event');
    next();
}


module.exports = { logEvents, logger };