const express = require('express')
const router = express.Router();
const taskController = require('./../controller/taskController')


router.route('/').post(taskController.create).put(taskController.updateTask).get(taskController.retrieveTask)
router.route('/:Id/tasks/:taskId').delete(taskController.deleteTask)


module.exports =router;