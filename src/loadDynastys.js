const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const dynastys = require('../data/dynastys.json');

class DynastyModel extends Sequelize.Model {}

DynastyModel.init(
  {
    dynasty: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    modelName: 'dynastys',
    // 是否自动创建 createdAt 和 updatedAt 字段
    timestamps: false
  }
);

/**
 * @description
 */
function loadDynastys() {
  return DynastyModel.sync({ force: true }).then(() => {
    return Promise.all(
      dynastys.map(dynasty => {
        return DynastyModel.create({ dynasty });
      })
    );
  });
}

module.exports = {
  DynastyModel,
  loadDynastys
};
