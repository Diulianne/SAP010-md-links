const mdLinks = require('../index.js');

const path = require('path');

describe('mdLinks', () => {
  it('should extract links from Markdown content', (done) => {
    const userFilePath = 'README.md'; // Substitua pelo caminho real do arquivo que o usuário digitar
    const filePath = path.resolve(userFilePath); // Resolve o caminho absoluto

    mdLinks(filePath)
      .then((links) => {
        expect(links).toHaveLength(links.length); // Verifica se o tamanho do array corresponde ao número de links
        links.forEach((link) => {
          expect(link.href).toBeDefined(); // Verifica se o link possui um URL
          expect(link.text).toBeDefined(); // Verifica se o link possui um texto
          expect(link.file).toBeDefined(); // Verifica se o link possui um arquivo
        });
        done();
      })
      .catch((error) => {
        done(error); // Notifique o Jest sobre o erro
      });
  });

  it('should reject if file does not exist', (done) => {
    const nonExistentFilePath = 'path/to/nonexistent/file.md'; // Substitua pelo caminho real do arquivo inexistente

    mdLinks(nonExistentFilePath)
      .catch((error) => {
        expect(error).toBeDefined(); // Verifica se um erro foi rejeitado
        done();
      });
  });


  it('should reject if file is not a Markdown file', () => {
    const nonMarkdownFilePath = path.resolve(__dirname, 'arquivo.txt');

    return mdLinks(nonMarkdownFilePath).catch(error => {
      expect(error).toBeDefined(); 
      expect(error.message).toBe('Arquivo não é Markdown'); 
    });
  });
});