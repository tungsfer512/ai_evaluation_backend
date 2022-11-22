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
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        inputDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        outputDescription: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            defaultValue: 'pending',
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
