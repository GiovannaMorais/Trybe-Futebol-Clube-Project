module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "teams",
          key: "id",
        },
        field: "home_team",
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "home_team_goals",
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "teams",
          key: "id",
        },
        field: "away_team",
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "away_team_goals",
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: "in_progress",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
