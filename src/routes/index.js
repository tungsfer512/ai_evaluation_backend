const userRouter = require('./user');
const problemRouter = require('./problem');
// const dataRouter = require('./data');
const groupRouter = require('./group');
// const submissionRouter = require('./submission');
const authRouter = require('./auth');

const initWebRouter = (app) => {
    // Problems
    app.use('/api/v1/problems', problemRouter);
    // // Datasets
    // app.use('/api/v1/datas', dataRouter);
    // Groups and Sub-Groups
    app.use('/api/v1/groups', groupRouter);
    // // Submissions
    // app.use('/api/v1/submissions', submissionRouter);
    // Login, register
    app.use('/api/v1/auth', authRouter);
    // Users and admins
    app.use('/api/v1', userRouter);
};

module.exports = initWebRouter;
