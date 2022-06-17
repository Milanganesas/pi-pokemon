const { INTEGER, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tipo', {
    nombre: {
      type: STRING,
    },
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
  }, {
    timestamps: false,
  });
};