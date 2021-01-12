const dotenv = require("dotenv");
const pgp = require("pg-promise")();

const conn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PSW
};
// const conn = 'postgres://qkttggliuyuscn:f2e322a990db39d9f982a6e0df72414d49c06fc0dd51da2976acfbd46ce005b4@ec2-46-137-84-173.eu-west-1.compute.amazonaws.com:5432/d4841cjejvo0r0';

const db = pgp(conn);

module.exports = {db};