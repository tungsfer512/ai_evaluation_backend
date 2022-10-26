const createGroup = (sequelize, DataTypes) => {
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
                allowNull: false
            }
        },
        {
            tableName: 'Group',
            timestamps: true
        }
    );
    return Group;
};

module.exports = createGroup;
