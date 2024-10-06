import { Sequelize } from "sequelize";

// const dbName = process.env.DB_NAME;
// const dbRoot = process.env.DB_ROOT;
// const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDialect = process.env.DB_DIALECT;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize("db_project_tuhotel", "root", "", {
  host: dbHost,
  dialect: dbDialect,
  port: +dbPort,
});

const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection success");
  } catch (error) {
    console.error(error);
  }
};

test();

export default sequelize;
