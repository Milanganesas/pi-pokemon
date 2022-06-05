const { UUID, UUIDV4, INTEGER, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    nombre: {
      type: STRING,
      allowNull: false,
    },
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Vida: { type: INTEGER },
    Ataque: { type: INTEGER },
    Defensa: { type: INTEGER },
    Velocidad: { type: INTEGER },
    Altura: { type: INTEGER },
    Peso: { type: INTEGER }
  });
};
