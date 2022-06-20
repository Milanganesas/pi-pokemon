const { UUID, UUIDV4, INTEGER, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    nombre: {
      type: STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('nombre', value.toUpperCase())
      }
    },
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    vida: { type: INTEGER, 
      validate: {
        min: 0,
        max: 300 }
    },
    ataque: { type: INTEGER, 
      validate: {
        min: 0,
        max: 200 }
    },
    defensa: { type: INTEGER, 
      validate: {
        min: 0,
        max: 300 }
    },
    velocidad: { type: INTEGER, 
      validate: {
        min: 0,
        max: 300 }
    },
    altura: { type: INTEGER, 
      validate: {
        min: 0,
        max: 100 }
    },
    peso: { type: INTEGER, 
      validate: {
        min: 0,
        max: 1000 }
    },
    imagen: { type: STRING }
  }, {
    timestamps: false,
  });
};
