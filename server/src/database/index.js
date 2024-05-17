module.exports = {
    connectDb: require("./dbConnection"),
    employeeModel: require("./models/Employee"),
    userModel: require("./models/User"),
    adminModel: require("./models/Admin"),
    SubjecthModel: require("./models/Subject"),
    CourseModel: require("./models/Course"),
    BatchModel: require("./models/Batch"),
    StudentModel: require("./models/Student"),
    QpOutlineModel: require("./models/QpOutline"),
    PSeriesModel: require("./models/prelimsSeries"),
    mSeriesModel: require("./models/mainsSeries"),
    pQpDesModel: require("./models/PrelimsQpDesc"),
    psQuestionModel: require("./models/PrelimsQuestion"),
    pSalesModel: require("./models/prelimsSales")
};