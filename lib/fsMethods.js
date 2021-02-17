import fs from 'fs/promises';

const readFile = path =>
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    return data;
  });

const writeFile = (file, data) =>
  fs.writeFile(`${file}`, data, err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

const fsMethods = { readFile, writeFile };

export default fsMethods;