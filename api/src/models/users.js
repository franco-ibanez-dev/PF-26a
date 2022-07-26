const { DataTypes, UUIDV4, INTEGER } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      fullName: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.TEXT,
      },

      country: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      province: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      street: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      postalCode: {
        type: DataTypes.STRING,
        defaultValue: "",
      },

      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    { timestamps: false }
  );
};
