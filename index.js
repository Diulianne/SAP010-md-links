const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

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
      .then((markdownContent) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // Padrões de links em formato Markdown
        const links = []; // Será usado para armazenar os links extraídos do conteúdo Markdown.

        // let match;
        // while ((match = linkRegex.exec(markdownContent)) !== null) {
        //   const [, text, href] = match;
        //   links.push({ href, text, file: absolutePath });
        // }
        let match = linkRegex.exec(markdownContent);
        while (match !== null) {
          const [, text, href] = match;
          links.push({ href, text, file: absolutePath });
          match = linkRegex.exec(markdownContent); // Atualizar match para a próxima iteração
        }

        resolve(links);
      })
      .catch((error) => {
        reject(error); // Rejeita com a mensagem de erro, independente da origem
      });
  });
}

// function validateLink(link) {
//   return axios
//     .get(link.href)
//     .then((response) => {
//       const updatedLink = { ...link, status: response.status };
//       if (response.status >= 200 && response.status < 300) {
//         updatedLink.ok = 'Ok';
//       } else if (response.status >= 300) {
//         updatedLink.ok = 'FAIL';
//       }
//       return updatedLink;
//     })
//     .catch(() => {
//       const updatedLink = { ...link };
//       updatedLink.status = 'Erro ao realizar requisição HTTP';
//       updatedLink.ok = 'FAIL';
//       return updatedLink;
//     });
// }

function validateLink(link) {
  return axios
    .get(link.href)
    .then((response) => ({
      ...link,
      status: response.status,
      ok: response.status >= 200 && response.status < 300 ? 'Ok' : 'FAIL',
    }))
    .catch(() => ({
      ...link,
      status: 'Erro ao realizar requisição HTTP',
      ok: 'FAIL',
    }));
}

module.exports = {
  mdLinks,
  validateLink,
};
