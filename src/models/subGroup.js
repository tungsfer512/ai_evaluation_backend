const createSubGroup = (sequelize, DataTypes) => {
    const SubGroup = sequelize.define('SubGroup', {
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
        }
    }, {
        tableName: 'SubGroup', 
        timestamps: true
    });
    return SubGroup;
}

module.exports = createSubGroup;