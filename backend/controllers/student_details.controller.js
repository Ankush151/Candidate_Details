const StudentDetail = require('../models/student_detils.models')


// saving the students details 
exports.create = (req, res) => {

    if(!req.body.name){
        res.status(400).json({message:"Name cannot be empty"})
    }
    if(!req.body.roll){
        res.status(400).json({message:"Roll Number cannot be empty"})
    }
    if(!req.body.subject){
        res.status(400).json({message:"Subject cannot be empty"})
    }
    if(!req.body.practical){
        res.status(400).json({message:"Practical cannot be empty"})
    }
    if(!req.body.theory){
        res.status(400).json({message:"Theory cannot be empty"})
    }
    if(!req.body.total){
        res.status(400).json({message:"Total cannot be empty"})
    }
    if(!req.body.grade){
        res.status(400).json({message:"grade cannot be empty"})
    }

    const studentDetails = new StudentDetail ({
        name:req.body.name,
        roll:req.body.roll,
        subject:req.body.subject,
        practical:req.body.practical,
        theory:req.body.theory,
        total:req.body.total,
        grade:req.body.grade
    })

    console.log("Saving data...");
    studentDetails
        .save(studentDetails)
        .then(studentDetails => {
            console.log("Data successfully saved", studentDetails);
            res.status(200).json(studentDetails)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message:err.message || "Some error occured while saving Students Detail"
            })
        })
}


// Find all students data 

exports.findAll = (req, res) => {
    StudentDetail.find()
        .then(studentdetail => {
            console.log(studentdetail);
            res.json(studentdetail)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occured while retriving all the students details"
            })
        })
}

// Find a single student detail

exports.findOne = (req,res) => {
    StudentDetail.findOne({_id:req.params._id})
        .then(studentdetail => {
            console.log(studentdetail);
            res.json(studentdetail)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: err.message || "Some error occured while retriving the particular student detail"
            })
        })
}

// update student details

exports.update = (req, res) => {
    if(!req.body.name){
        res.status(400).json({message:"Name cannot be empty"})
    }
    if(!req.body.roll){
        res.status(400).json({message:"Roll Number cannot be empty"})
    }
    if(!req.body.subject){
        res.status(400).json({message:"Subject cannot be empty"})
    }
    if(!req.body.practical){
        res.status(400).json({message:"Practical cannot be empty"})
    }
    if(!req.body.theory){
        res.status(400).json({message:"Theory cannot be empty"})
    }
    if(!req.body.total){
        res.status(400).json({message:"Total cannot be empty"})
    }
    if(!req.body.grade){
        res.status(400).json({message:"grade cannot be empty"})
    }
    
    StudentDetail.findOneAndUpdate({_id:req.params._id}, {

        name: req.body.name,
        roll: req.body.roll,
        subject:req.body.subject,
        practical:req.body.practical,
        theory:req.body.theory,
        total:req.body.total,
        grade:req.body.grade

    })
    .then(studentdetail => {
        res.json(studentdetail)
        console.log(studentdetail);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occured while updating a data"
        })
    })
}       

//deleting a student detail

exports.delete = (req, res) => {
    StudentDetail.findOneAndDelete ({_id:req.params._id})
    .then(data => {
        console.log("deleted the data");
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message:err.message || "Some error occured while deteing a student detail"
        })
    })
}