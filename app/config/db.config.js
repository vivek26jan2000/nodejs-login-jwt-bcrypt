module.exports = {
  HOST: "3.111.155.41",
  USER: "bpcadmin",
  PASSWORD: "Bpcindi4ro0t",
  DB: "vivek_testdb",
  dialect: "mysql",

  //   IP: 3.111.155.41
  // Port: 3306
  // DB name: csc
  // Username: bpcadmin
  // Password: Bpcindi4ro0t
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
