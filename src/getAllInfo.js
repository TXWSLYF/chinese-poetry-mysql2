const fs = require('fs');
const path = require('path');

// 朝代集合
let dynastys = [];

// 标签集合
let tags = [];

fs.readdirSync(path.resolve(__dirname, '../data/poets')).forEach(file => {
  const filePath = path.resolve(__dirname, '../data/poets', file);
  const { dynasty } = require(filePath);

  if (dynasty) {
    dynastys.push(dynasty);
  }
});

dynastys = [...new Set(dynastys)];
fs.writeFileSync(
  path.resolve(__dirname, '../data/dynastys.json'),
  JSON.stringify(dynastys)
);

fs.readdirSync(path.resolve(__dirname, '../data/poetrys')).forEach(file => {
  const filePath = path.resolve(__dirname, '../data/poetrys', file);
  const fileContent = require(filePath);

  if (fileContent.tags) {
    tags = [...tags, ...fileContent.tags];
  }
});

tags = [...new Set(tags)];
fs.writeFileSync(
  path.resolve(__dirname, '../data/tags.json'),
  JSON.stringify(tags)
);
