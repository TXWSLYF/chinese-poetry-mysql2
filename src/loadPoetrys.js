const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const { TagModel } = require('./loadTags');
const { PoetryTagModel } = require('./loadPoetryTag');
const { PoetModel } = require('./loadPoets');

class PoetryModel extends Sequelize.Model {}

PoetryModel.init(
  {
    // 关于
    about: {
      type: Sequelize.TEXT
    },
    // 作者 id
    poet_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    // 翻译
    fanyi: {
      type: Sequelize.TEXT
    },
    // 标题
    title: {
      type: Sequelize.STRING
    },
    // 正文
    content: {
      type: Sequelize.TEXT
    },
    // 赏析
    shangxi: {
      type: Sequelize.TEXT
    }
  },
  { sequelize, modelName: 'poetrys', timestamps: false }
);

async function loadPoetrys() {
  await PoetryModel.sync({ force: true });
  await PoetryTagModel.sync({ force: true });

  const fileNames = fs.readdirSync(path.resolve(__dirname, '../data/poetrys'));

  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const poetryInfo = require(path.resolve(
      __dirname,
      '../data/poetrys',
      fileName
    ));

    const {
      about = '',
      content = '',
      fanyi = '',
      name: title = '',
      poet: { name: poetName = '' },
      shangxi = '',
      tags = []
    } = poetryInfo;
    let poet_id = null;

    const poetInfo = await PoetModel.findOne({ where: { name: poetName } });
    if (poetInfo) {
      poet_id = poetInfo.id;
    }

    const { id: poetry_id } = await PoetryModel.create({
      about,
      fanyi,
      title,
      content,
      shangxi,
      poet_id
    });

    for (const tag of tags) {
      const { id: tag_id } = await TagModel.findOne({ where: { tag } });

      await PoetryTagModel.create({
        poetry_id,
        tag_id
      });
    }
  }
}

module.exports = {
  PoetryModel,
  loadPoetrys
};
