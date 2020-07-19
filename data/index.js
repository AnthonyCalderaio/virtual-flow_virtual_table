const { writeFileSync } = require('fs');
const { join } = require('path');
const csv = require('csvtojson');
const { dotCase } = require('dot-case');

Promise.all([
  csv().fromFile(join('raw-data', 'proteins.csv')),
  csv().fromFile(join('raw-data', 'colors.csv')),
])
  .then(async ([proteins, colors]) => {
    proteins = proteins.map(normalizeObject);
    const colorMap = toMap(colors, 'inter_screen_id');
    proteins.forEach((p) => {
      p.color = colorMap[p.inter_screen_id].color;
    });

    for (const protein of proteins) {
      await readCompounds(protein);
    }

    writeFileSync('data.json', JSON.stringify(toMap(proteins, 'inter_screen_id'), null, 2));
  })
  .catch((e) => {
    console.log(e);
  });

const readCompounds = async protein => {
  const data = (
    await csv().fromFile(join('raw-data', protein.inter_screen_id, 'data.csv'))
  ).map(normalizeObject);
  protein.compounds = toMap(data, 'compound_screening_id');
};

const toMap = (arr, key) => {
  return arr.reduce((accum, current) => {
    accum[current[key]] = current;
    return accum;
  }, {});
};

const normalizeObject = (o) => {
  const result = {};
  Object.keys(o).forEach((c) => {
    const normalized = snakeCase(c);
    result[normalized] = o[c];
  });
  return result;
};

const snakeCase = (input, options) => {
  return dotCase(input, {
    delimiter: '_',
    ...options,
  });
};
