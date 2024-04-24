require('dotenv').config()
const express = require("express");
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

app.get("/", (req, res) => {
    return res.json({mensaje: "Hola Mundo"});
});

app.get("/api/usuarios", async (req, res) => {

    const usuarios = await User.findAll();

    return res.json(usuarios);
})

const PUERTO = process.env.PORT || 3000

// conectando CON BD
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.BD_DATABASE, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: 'bd_mysql',
    dialect: 'mysql'
});

async function testConexionBD(){
    try {
        await sequelize.authenticate();
        console.log('CONEXION CORRECTA DE BD.');
      } catch (error) {
        console.error('ERROR DE CONEXION DE BD:', error);
      }
}

testConexionBD()

const User = sequelize.define(
    'User',
    {
      // Model attributes are defined here
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      password: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    },
  );
  
  // `sequelize.define` also returns the model
  // console.log(User === sequelize.models.User); 
  User.sync()


app.listen(PUERTO, () => {
    console.log("Servidor iniciado de NODE PRUEBA http://localhost:"+PUERTO);
})
