const mdLinks = require('./index.js');
const filePath = './README.md';
mdLinks(filePath)
  .then(links => {
    console.log(links);
  })
  .catch(error => {
    console.error('Erro:', error.message);
  });

  module.exports = mdLinks;