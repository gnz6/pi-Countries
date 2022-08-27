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
    // id:{
    //     type: DataTypes.UUID,
    //     defaultValue: UUIDV4,
    //     allowNull: false,
    //     primaryKey: true
    // },
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
      type: DataTypes.ENUM("All", "Summer","Winter", "Fall", "Spring"),
      defaultValue: "All"
    },
  },{
    timestamps: false
  });
};
