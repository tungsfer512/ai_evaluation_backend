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
    User.hasMany(Submission, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Submission.belongsTo(User);

    Problem.hasMany(Submission, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Submission.belongsTo(Problem);

    Problem.hasMany(Dataset, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Dataset.belongsTo(Problem);

    Group.hasMany(SubGroup, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    SubGroup.belongsTo(Group);

    Group.hasMany(Problem, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Problem.belongsTo(Group);

    SubGroup.hasMany(Problem, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
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
