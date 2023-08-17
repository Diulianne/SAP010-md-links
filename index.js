const fs = require('fs').promises;
const path = require('path');

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const fileExtension = path.extname(absolutePath); // Retorna a extensão do arquivo.

    // Verifica a existência do arquivo
    fs.access(absolutePath, fs.constants.F_OK)
      .then(() => {
        // Verifica a extensão do arquivo
        if (!validExtensions.includes(fileExtension)) {
          throw new Error('Arquivo não é Markdown'); // Rejeita a promessa se a extensão não for válida
        }

        // Lê o conteúdo do arquivo
        return fs.readFile(absolutePath, 'utf-8');
      })
      .then(markdownContent => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // Padrões de links em formato Markdown
        const links = []; // Será usado para armazenar os links extraídos do conteúdo Markdown.

        let match;
        while ((match = linkRegex.exec(markdownContent)) !== null) {
          const [, text, href] = match;
          links.push({ href, text, file: absolutePath });
        }

        resolve(links);
      })
      .catch(error => {
        reject(error); // Rejeita com a mensagem de erro, independente da origem
      });
  });
}

module.exports = mdLinks;
