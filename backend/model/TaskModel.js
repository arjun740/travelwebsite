const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        trim: true
    },
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    additionalDetails: {
        type: String,
        trim: true
    }
});
taskSchema.pre(/^find/, function(next) {
    this.start = Date.now();
    next();
});
taskSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
