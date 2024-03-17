const Tasks = require('./../model/taskModel');
const catchAsync = require('./../util/AsyncCatch');
const mongoose = require("mongoose");
const Course = require('./../model/courseModel');
const AppError = require('./../util/AppError');
exports.create = catchAsync(async (req, res, next) => {
    const task = await Tasks.create(req.body);
    const courseId = task.courseId;
    const taskId = task._id;

    const updatedCourse = await Course.findOneAndUpdate(
        { courseId: courseId },
        { $push: { tasks: taskId } },
        { new: true }
    );
    if (!updatedCourse) {
        return next(new AppError(`Could not find Course associated with Course-Id ${courseId}`, 404));
    }
    res.status(201).json({
        message: "Task created successfully"
    });
});


exports.deleteTask = catchAsync(async (req, res, next) => {
    const { Id, taskId } = req.params;
    console.log(Id,taskId)
    const course = await Course.findById(Id);
    console.log(course)
    if (!course) {
        return next(new AppError(`Could not find Course associated with Course-Id ${Id}`, 404));
    }
    const taskIndex = course.tasks.findIndex(task => {
        console.log(`${task.toString()}${taskId}`)
        return task.toString() === taskId
    });

    if (taskIndex === -1) {
        return next(new AppError(`Could not find Task associated with task-Id ${taskId}`, 404));
    }

    course.tasks.splice(taskIndex, 1);
    const task = await Tasks.findByIdAndDelete(taskId);
    await course.save();

    res.status(204).json({ status: 'success' });
});

exports.updateTask = catchAsync(async (req, res, next) => {
    const { taskId } = req.body;
    console.log(taskId,req.body)
    const task = await Tasks.findById(taskId);

    if (!task) {
        return next(new AppError('No Task found with the provided ID', 404));
    }

    const updatedTask = await Tasks.findByIdAndUpdate(taskId, req.body, { new: true });

    res.status(200).json({
        status: "Success",
        data: updatedTask
    });
});

exports.retrieveTask = catchAsync(async (req, res, next) => {
    const tasks = await Tasks.find();

    res.status(200).json({
        status: "Success",
        data: tasks
    });
});

