const userRouter = require('./user');
const problemRouter = require('./problem');
const dataRouter = require('./data');
const groupRouter = require('./group');
const submissionRouter = require('./submission');

const initWebRouter = (app) => {
    // Users, login, register
    app.use('/api/users', userRouter);
    // Problems
    app.use('/api/problems', problemRouter);
    // Datasets
    app.use('/api/datas', dataRouter);
    // Groups and Sub-Groups
    app.use('/api/groups', groupRouter);
    // Submissions
    app.use('/api/submissions', submissionRouter);
};

module.exports = initWebRouter;
