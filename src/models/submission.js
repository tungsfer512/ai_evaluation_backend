const createSubmission = (sequelize, DataTypes) => {
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
                allowNull: false
            },
            accuracyTest: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            excutionTime: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            excutionMemories: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending',
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'Submission',
            timestamps: true
        }
    );
    return Submission;
};

module.exports = createSubmission;
