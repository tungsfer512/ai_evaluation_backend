const { DataTypes, Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

const User = sequelize.define(
    'user',
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
        tableName: 'user',
        timestamps: true
    }
);

const Group = sequelize.define(
    'group',
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
        tableName: 'group',
        timestamps: true
    }
);

const SubGroup = sequelize.define(
    'subgroup',
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
            references: {
                model: 'group',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        tableName: 'subgroup',
        timestamps: true
    }
);

const Problem = sequelize.define(
    'problem',
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
        inputSample: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        outputSample: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        subGroupId: {
            type: DataTypes.UUID,
            references: {
                model: 'subgroup',
                key: 'id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        datasetId: {
            type: DataTypes.UUID,
            references: {
                model: 'dataset',
                key: 'id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    },
    {
        tableName: 'problem',
        timestamps: true
    }
);

const Dataset = sequelize.define(
    'dataset',
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
        }
    },
    {
        tableName: 'dataset',
        timestamps: true
    }
);

const Sample = sequelize.define(
    'sample',
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
        size: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        truth: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        datasetId: {
            type: DataTypes.UUID,
            references: {
                model: 'dataset',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        tableName: 'sample',
        timestamps: true
    }
);

const Submission = sequelize.define(
    'submission',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        selectionRate: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        accuracy: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        f1score: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        precision: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        recall: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        executionTime: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        executionMemories: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        },
        problemId: {
            type: DataTypes.UUID,
            references: {
                model: 'problem',
                key: 'id'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    },
    {
        tableName: 'submission',
        timestamps: true
    }
);

const SubmissionDetail = sequelize.define(
    'submissiondetail',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        input: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        accuracy: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        f1score: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        precision: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        recall: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        executionTime: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        executionMemories: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        submissionId: {
            type: DataTypes.UUID,
            references: {
                model: 'submission',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        tableName: 'submissiondetail',
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
    Sample,
    Submission,
    SubmissionDetail,
};
