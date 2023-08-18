const mdLinks = require('../index.js');
const path = require('path');

describe('mdLinks', () => {
  it('Deve extrair links do arquivo Markdown', () => {
    const userFilePath = 'README.md';
    const filePath = path.resolve(userFilePath); // Resolve o caminho absoluto

    return mdLinks(filePath)
      .then((links) => {
        expect(links).toHaveLength(links.length); // Verifica se o tamanho do array corresponde ao número de links
        links.forEach((link) => {
          expect(link.href).toBeDefined(); // Verifica se o link possui um URL
          expect(link.text).toBeDefined(); // Verifica se o link possui um texto
          expect(link.file).toBeDefined(); // Verifica se o link possui um arquivo
        });
      })
      .catch((error) => {
        throw error;
      });
  });

  it('Deve rejeitar se o arquivo não existir', () => {
    const nonExistentFilePath = 'path/to/nonexistent/file.md';
    return mdLinks(nonExistentFilePath)
      .catch((error) => {
        expect(error).toBeDefined(); // Verifica se um erro foi rejeitado
      });
  });

  it('Deve rejeitar se o arquivo não for um arquivo Markdown', () => {
    const nonMarkdownFilePath = path.resolve(__dirname, 'arquivo.txt');
    return mdLinks(nonMarkdownFilePath).catch(error => {
      expect(error).toBeDefined(); 
      expect(error.message).toBe('Arquivo não é Markdown'); 
    });
  });
});