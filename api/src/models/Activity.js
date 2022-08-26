const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    dificulty:{
      type: DataTypes.INTEGER,
    },
    duration:{
      type: DataTypes.INTEGER,
    },
    season:{
      type: DataTypes.ENUM("Summer","Winter", "Fall", "Spring"),
    },
  },{
    timeStamps: false
  });
};
