require('./src/getAllInfo');
const { loadTags } = require('./src/loadTags');
const { loadDynastys } = require('./src/loadDynastys');
const { loadPoets } = require('./src/loadPoets');
const { loadPoetrys } = require('./src/loadPoetrys');
(async () => {
  await loadTags();
  await loadDynastys();
  await loadPoets();
  await loadPoetrys();
})();
