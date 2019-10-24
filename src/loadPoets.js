const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const { DynastyModel } = require('./loadDynastys');

class PoetModel extends Sequelize.Model {}

PoetModel.init(
  {
    // 描述
    desc: {
      type: Sequelize.TEXT
    },
    // 所属朝代
    dynasty_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    // 姓名
    name: {
      type: Sequelize.STRING
    },
    // 头像地址
    image: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'poets',
    // 是否自动创建 createdAt 和 updatedAt 字段
    timestamps: false
  }
);

async function loadPoets() {
  await PoetModel.sync({ force: true });

  const fileNames = fs.readdirSync(path.resolve(__dirname, '../data/poets/'));
  for (const fileName of fileNames) {
    const poetInfo = require(path.resolve(
      __dirname,
      '../data/poets',
      fileName
    ));
    const { desc, dynasty, name, image = '' } = poetInfo;
    let dynasty_id = null;

    if (dynasty) {
      dynasty_id = await DynastyModel.findOne({
        where: {
          dynasty
        }
      });
      dynasty_id = dynasty_id.id;
    }

    await PoetModel.create({
      desc,
      dynasty_id: dynasty_id,
      name,
      image
    });
  }
}

module.exports = {
  PoetModel,
  loadPoets
};
