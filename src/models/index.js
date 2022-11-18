const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('ai_evaluation_dev', 'root', 'tung', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'User',
        timestamps: true
    }
);

const Group = sequelize.define(
    'Group',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'Group',
        timestamps: true
    }
);

const SubGroup = sequelize.define(
    'SubGroup',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        groupId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Group',
                key: 'id'
            }
        }
    },
    {
        tableName: 'SubGroup',
        timestamps: true
    }
);

const Problem = sequelize.define(
    'Problem',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inputDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        outputDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subGroupId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'SubGroup',
                key: 'id'
            }
        }
    },
    {
        tableName: 'Problem',
        timestamps: true
    }
);

const Dataset = sequelize.define(
    'Dataset',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        problemId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Problem',
                key: 'id'
            }
        }
    },
    {
        tableName: 'Dataset',
        timestamps: true
    }
);

const Submission = sequelize.define(
    'Submission',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        accuracyModel: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        accuracyTest: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        excutionTime: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        excutionMemories: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        problemId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Problem',
                key: 'id'
            }
        }
    },
    {
        tableName: 'Submission',
        timestamps: true
    }
);

const createDB = async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
};

module.exports = {
    createDB,
    User,
    Group,
    SubGroup,
    Problem,
    Dataset,
    Submission
};
