const { DataTypes, Sequelize } = require('sequelize');

const createUser = require('./user');
const createDataset = require('./dataset');
const createGroup = require('./group');
const createProblem = require('./problem');
const createSubGroup = require('./subGroup');
const createSubmission = require('./submission');

const sequelize = new Sequelize('ai_evaluation_dev', 'root', 'tung', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = createUser(sequelize, DataTypes);
const Problem = createProblem(sequelize, DataTypes);
const Submission = createSubmission(sequelize, DataTypes);
const Group = createGroup(sequelize, DataTypes);
const SubGroup = createSubGroup(sequelize, DataTypes);
const Dataset = createDataset(sequelize, DataTypes);

const createDB = async () => {
    User.hasMany(Submission);
    Submission.belongsTo(User);

    Problem.hasMany(Submission);
    Submission.belongsTo(Problem);

    Problem.hasMany(Dataset);
    Dataset.belongsTo(Problem);

    Group.hasMany(SubGroup);
    SubGroup.belongsTo(Group);

    Group.hasMany(Problem);
    Problem.belongsTo(Group);

    SubGroup.hasMany(Problem);
    Problem.belongsTo(SubGroup);

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
};

module.exports = {
    createDB,
    User,
    Problem,
    Submission,
    Group,
    SubGroup,
    Dataset
};
