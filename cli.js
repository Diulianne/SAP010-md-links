const { mdLinks, validateLink } = require('./index.js');

if (process.argv.length < 3) {
  console.error('Você precisa fornecer o caminho do arquivo como argumento.');
  process.exit(1); // Encerre o processo com um código de erro
}

const path = process.argv[2];
// const path =  './README.md'
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');

mdLinks(path)
  .then((linksObject) => {
    if (validate) {
      return Promise.all(linksObject.map((link) => validateLink(link)));
    }
    return linksObject;
  })
  .then((resultLinks) => {
    if (stats) {
      const totalLinks = resultLinks.length;
      const uniqueLinks = new Set(resultLinks.map((link) => link.href)).size;

      console.log(`Total: ${totalLinks}`);
      console.log(`Unique: ${uniqueLinks}`);

      if (validate) {
        const brokenLinks = resultLinks.filter((link) => link.ok === 'FAIL').length;
        console.log(`Broken: ${brokenLinks}`);
      }
    } else {
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
    }
  })
  .catch((error) => {
    console.error('Erro:', error.message);
  });
