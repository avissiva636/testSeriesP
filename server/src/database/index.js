module.exports = {
    connectDb: require("./dbConnection"),
    employeeModel: require("./models/Employee"),
    userModel: require("./models/User"),
    adminModel: require("./models/Admin")
};