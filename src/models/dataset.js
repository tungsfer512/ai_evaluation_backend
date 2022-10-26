const createDataset = (sequelize, DataTypes) => {
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
                allowNull: false
            }
        },
        {
            tableName: 'Dataset',
            timestamps: true
        }
    );
    return Dataset;
};

module.exports = createDataset;
