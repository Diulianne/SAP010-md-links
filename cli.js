const { mdLinks, validateLink } = require('./index.js');

if (process.argv.length < 3) {
  console.error('Você precisa fornecer o caminho do arquivo como argumento.');
  process.exit(1); // Encerre o processo com um código de erro
}

const path = process.argv[2];
// const path =  './README.md' // process.argv[2];
const validate = process.argv.includes('--validate');

mdLinks(path)
  .then((linksObject) => {
    if (validate) {
      return Promise.all(linksObject.map((link) => validateLink(link)));
    }
    return linksObject;
  })
  .then((resultLinks) => {
    resultLinks.forEach((link) => {
      console.log(`\nhref: ${link.href}`);
      console.log(`text: ${link.text}`);
      console.log(`file: ${link.file}`);

      if (validate && link.status !== undefined && link.ok !== undefined) {
        console.log(`status: ${link.status}`);
        console.log(`ok: ${link.ok}`);
      }

      console.log('------------------------------------------------------------------------');
    });
  })
  .catch((error) => {
    console.error('Erro:', error.message);
  });
