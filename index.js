const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

function mdLinks(filePath) {
  const absolutePath = path.resolve(filePath);
  const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const fileExtension = path.extname(absolutePath);

  return new Promise((resolve, reject) => {
    fs.stat(absolutePath)
      .then((stats) => {
        if (stats.isFile() && validExtensions.includes(fileExtension)) {
          return fs.readFile(absolutePath, 'utf-8');
        } if (stats.isDirectory()) {
          return fs.readdir(absolutePath)
            .then((fileList) => {
              const allLinksPromises = fileList.map((file) => {
                const fileAbsolutePath = path.join(absolutePath, file);
                return mdLinks(fileAbsolutePath);
              });

              return Promise.all(allLinksPromises)
                .then((results) => {
                  const linksArray = [].concat(...results);
                  resolve(linksArray);
                })
                .catch((error) => {
                  reject(error);
                });
            });
        }
        throw new Error('Arquivo ou diretório não encontrado');
      })
      .then((markdownContent) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match = linkRegex.exec(markdownContent);
        while (match !== null) {
          const [, text, href] = match;
          links.push({ href, text, file: absolutePath });
          match = linkRegex.exec(markdownContent);
        }
        resolve(links);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

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
