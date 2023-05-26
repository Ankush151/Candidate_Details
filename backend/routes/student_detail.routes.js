const studentdetail = require("../controllers/student_details.controller")
const express = require('express')
const router = express.Router()


router.post("/", studentdetail.create);
router.get("/allstudentdetails", studentdetail.findAll);
router.get("/:_id", studentdetail.findOne)
router.put("/:_id", studentdetail.update)
router.delete("/delete/:_id", studentdetail.delete)

module.exports = router