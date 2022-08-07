module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      district: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      committee: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apartment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entrance: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entrancecode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      doornumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addinginfo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      order: {
        type: Sequelize.STRING,
        allowNull: false
      },
      priceTotal: {
        type: Sequelize.NUMBER,
        allowNull: false
      }
    }, {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    });
    return User;
  };