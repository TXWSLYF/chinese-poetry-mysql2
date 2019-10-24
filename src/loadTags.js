const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const tags = require('../data/tags.json');

class TagModel extends Sequelize.Model {}

TagModel.init(
  {
    tag: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    modelName: 'tags',
    // 是否自动创建 createdAt 和 updatedAt 字段
    timestamps: false
  }
);

/**
 * @description 导入标签
 */
function loadTags() {
  return TagModel.sync({ force: true }).then(() => {
    return Promise.all(
      tags.map(tag => {
        return TagModel.create({ tag });
      })
    );
  });
}

module.exports = {
  TagModel,
  loadTags
};
