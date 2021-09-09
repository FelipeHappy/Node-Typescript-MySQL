import { Sequelize } from 'sequelize';

const db = new Sequelize('nodetypescript', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
})

export default db;