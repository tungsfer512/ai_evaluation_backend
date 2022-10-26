const createProblem = (sequelize, DataTypes) => {
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
            }
        },
        {
            tableName: 'Problem',
            timestamps: true
        }
    );
    return Problem;
};

module.exports = createProblem;
