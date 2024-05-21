const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const envFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: envFile });
} else {
    dotEnv.config()
}

module.exports = {
    PORT: process.env.PORT,
    CONNECTION_STRING: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    RFRESH_TOKEN_SECRET: process.env.RFRESH_TOKEN_SECRET,
    AACCESS_TOKEN_SECRET: process.env.AACCESS_TOKEN_SECRET,
    AREFRESH_TOKEN_SECRET: process.env.AREFRESH_TOKEN_SECRET,
};