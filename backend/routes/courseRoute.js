const express = require('express')
const router = express.Router();
const courseController = require('./../controller/courseController')
router.route('/').get(courseController.getAllCoursesWithTasks).post(courseController.createCourse)
router.route('/:courseId').get(courseController.getCourse).put(courseController.updateCourse).delete(courseController.deleteCourse)
router.route('/:courseId/task').get(courseController.getCourseTask)

module.exports = router;