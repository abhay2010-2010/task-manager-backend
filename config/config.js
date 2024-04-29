const mongoose=require("mongoose");

const dbconnect=mongoose.connect("mongodb://localhost:27017/Manager");

module.exports={
    dbconnect
}