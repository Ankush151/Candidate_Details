const mongoose = require('mongoose');

const studentDetails = mongoose.Schema ({
    name:{
        type:String,
        require: true
    },
    roll: {
        type: Number,
        require: true
    },
    subject:{
        type:String,
        require:true
    },
    practical : {
        type: Number,
        require: true
    },
    theory : {
        type : Number,
        require: true 
    },
    total : {
        type: Number,
        require: true 
    },
    grade: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model("Student-Details", studentDetails)   