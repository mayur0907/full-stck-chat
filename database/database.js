const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize("chatapp","root","mayur@123",{
    host: "localhost",
    dialect:'mysql'
})

module.exports = sequelize
