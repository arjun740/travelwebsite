const mongoose = require("mongoose")
const slugify = require("slugify");
const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: String,
        required: true,
        trim: true
    },
    schedule: {
        type: String,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        min: 0
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            model: 'Task'
        }
    ]
});

courseSchema.pre(/^find/, function(next) {
    this.start = Date.now();
    next();
});

courseSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;