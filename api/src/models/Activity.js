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
    dificulty:{
      type: DataTypes.INTEGER,
      validate:{
        min:1,
        max:5,
      }
    },
    duration:{
      type: DataTypes.INTEGER,
      validate:{
        min:1,
        max:24,
      }
    },
    season:{
      type: DataTypes.STRING,
      defaultValue: "All"
    },
  },{
    timestamps: false
  });
};
