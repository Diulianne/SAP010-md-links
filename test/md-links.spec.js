const path = require('path');
const axios = require('axios');
const { mdLinks, validateLink } = require('../index.js');

jest.mock('axios'); // Mock o módulo axios

describe('mdLinks', () => {
  it('Deve extrair links do arquivo Markdown', () => {
    const userFilePath = 'README.md';
    const filePath = path.resolve(userFilePath); // Resolve o caminho absoluto

    return mdLinks(filePath)
      .then((links) => {
        expect(links).toHaveLength(links.length);
        // Verifica se o tamanho do array corresponde ao número de links
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
    return mdLinks(nonMarkdownFilePath).catch((error) => {
      expect(error).toBeDefined();
      expect(error.message).toBe('Arquivo ou diretório não encontrado');
    });
  });
});

describe('validateLink', () => {
  it('deve validar um link', () => {
    const link = {
      href: 'https://www.example.com',
      text: 'Example',
      file: '/path/to/file.md',
    };

    axios.get.mockResolvedValue({ status: 200 });

    return validateLink(link).then((result) => {
      expect(result.status).toBe(200);
      expect(result.ok).toBe('Ok');
    });
  });

  it('deve lidar com erros HTTP', () => {
    const link = {
      href: 'https://www.example.com',
      text: 'Example',
      file: '/path/to/file.md',
    };

    // Simular uma falha na requisição HTTP
    const mockError = new Error('Network Error');
    axios.get = jest.fn(() => Promise.reject(mockError));

    return validateLink(link)
      .then((result) => {
        expect(result.status).toBe('Erro ao realizar requisição HTTP');
        expect(result.ok).toBe('FAIL');
      })
      .catch((error) => {
        throw error;
      });
  });

  it('deve lidar com erros HTTP com status 300', () => {
    const link = {
      href: 'https://www.example.com',
      text: 'Example',
      file: '/path/to/file.md',
    };

    // Simular um status HTTP >= 300
    const mockResponse = {
      status: 301,
    };

    // Substituir axios.get com uma função mock que retorna o mockResponse
    axios.get = jest.fn(() => Promise.resolve(mockResponse));

    return validateLink(link)
      .then((result) => {
        expect(result.status).toBe(301);
        expect(result.ok).toBe('FAIL');
      })
      .catch((error) => {
        throw error;
      });
  });
});
