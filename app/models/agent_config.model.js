module.exports = (sequelize, Sequelize) => {
  const Agent = sequelize.define("agent_config", {
    username: {
      type: Sequelize.STRING,
    },
    siteName: {
      type: Sequelize.STRING,
    },
    siteID: {
      type: Sequelize.STRING,
    },
    frequency: {
      type: Sequelize.STRING,
    },
    databaseIP: {
      type: Sequelize.INTEGER,
    },
    databasePort: {
      type: Sequelize.INTEGER,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return Agent;
};

// Site Name        : __________
// Site ID               : __________
// Frequency        : __________
// Username        : __________
// Password         : __________
// Database IP     : __________
// Database Port : __________
