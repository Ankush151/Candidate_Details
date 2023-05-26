

function getAllAppRoutes(app) {
    app.use('/api/studentsData', require('../routes/student_detail.routes'))
}

module.exports = getAllAppRoutes