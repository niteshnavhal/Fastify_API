// for test purposes
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserModel = sequelize.define(
    "tblUser",
    {
      appUserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      appUserName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      appPassword: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      appRoleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appName: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      appUserType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        //0: default, 1:Admin, 2:agent, 3:client
        validate: {
          isIn: {
            args: [[0, 1, 2, 3]], // Define valid numbers
            msg: "Invalid status value",
          },
        },
      },
      appMobile: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      appIsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      appIsSuperAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      appCreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appCreatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      appCreatedType: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appModifyBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appModifyDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      appModifyType: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appParentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appIsDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      appDeleteBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appDeleteDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      appAllowMultipleLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      appSubAdminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      appUserIp: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserModel;
};
