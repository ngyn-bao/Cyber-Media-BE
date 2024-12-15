import { DataTypes } from "sequelize";
import sequelize from "../common/sequelize/sequelize.connection.js";

//định nghĩa model để sử dụng ORM
const typeVideoModel = sequelize.define(
  "videoType",
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "video_type",
    timestamps: false,
  }
);

// typeVideoModel.sync().then().catch();

export default typeVideoModel;
