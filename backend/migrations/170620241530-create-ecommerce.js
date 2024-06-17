module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ecommerce", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        isAlpha: true,
        notEmpty: true,
      },
      price: {
        type: Sequelize.INTEGER,
        isAlpha: true,
        notEmpty: true,
      },
      description: {
        type: Sequelize.TEXT,
        isAlpha: true,
        notEmpty: true,
      },
      category: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true,
      },
      image: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true,
      },
      sold: {
        type: Sequelize.BOOLEAN,
      },
      dateOfSale: {
        type: Sequelize.DATE,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ecommerce");
  },
};
