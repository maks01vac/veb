
const courseStore = require('../store/courseStore')

const courseService ={}

courseService.getAll = function(){
    return courseStore.getAll()
}

module.exports = courseService;