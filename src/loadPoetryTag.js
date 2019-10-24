const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

class PoetryTagModel extends Sequelize.Model {}

PoetryTagModel.init(
  {
    poetry_id: {
      type: Sequelize.INTEGER
    },
    tag_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'poetry_tag',
    timestamps: false
  }
);

module.exports = {
  PoetryTagModel
};
