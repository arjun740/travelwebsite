const Courses = require('./../model/courseModel');
const Tasks = require('./../model/taskModel');
const catchAsync = require('./../util/AsyncCatch');
const AppError = require('./../util/AppError')
exports.getAllCoursesWithTasks = catchAsync(async (req, res, next) => {
    const coursesWithTasks = await Courses.find().populate({path:'tasks',model:'Task'});
    res.status(200).json({
        status: "success",
        data: {
            courses: coursesWithTasks
        }
    });
});

exports.createCourse = catchAsync(async (req,res,next) => {
    const course = await  Courses.create(req.body);
    res.status(201).json({
        message: "Course is created successfully",
        course
    })
})

exports.getCourse = catchAsync(async (req,res,next) => {
    const courseId = req.params.courseId;

    const course = await Courses.findOne({courseId: courseId});
    if (!course) {
        return next(new AppError(`Could not find course associated with courseId ${courseId}`, 404));
    }
    res.status(200).json({
        message : "The Course is retrieved successfully",
        course
    })
})
exports.getCourseTask = catchAsync(async (req, res, next) => {
    const courseId = req.params.courseId;
    const task = await Tasks.find({courseId: courseId})
    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const courseId = req.params.courseId;
    const updatedCourse = await Courses.findOneAndUpdate({ courseId }, req.body, { new: true });

    if (!updatedCourse) {
        return next(new AppError(`Could not find course with the associated ID ${courseId}`, 404));
    }

    res.status(200).json({
        status: `Successfully updated the course data with given data ${courseId}`,
        data: updatedCourse
    });
});

exports.deleteCourse = catchAsync(async (req, res, next) =>{
    const courseId = req.params.courseId;
    const result = await Courses.deleteOne({ courseId });
    await Tasks.deleteMany({ courseId });
    if (result.deletedCount === 0) {
        return next(new AppError(`Could not find course with the associated ID ${courseId}`, 404));
    }
    res.status(200).json({
        message: `Course with ID ${courseId} deleted successfully`
    });
})
