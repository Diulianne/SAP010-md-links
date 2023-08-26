#!/usr/bin/env node

const chalk = require('chalk');
const { mdLinks, validateLink } = require('./index.js');

if (process.argv.length < 3) {
  console.error('Você precisa fornecer o caminho do arquivo como argumento.');
  process.exit(1);
}

const path = process.argv[2];
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

      console.log(`${chalk.bold.cyan('Total: ') + chalk.bold.cyan(totalLinks)} `);
      console.log(`${chalk.bold.magenta('Unique: ') + chalk.bold.magenta(uniqueLinks)}`);

      if (validate) {
        const brokenLinks = resultLinks.filter((link) => link.ok === 'FAIL').length;
        console.log(`${chalk.bold.red('Broken: ') + chalk.bold.red(brokenLinks)} `);
      }
    } else {
      resultLinks.forEach((link) => {
        console.log(chalk.green(`\nhref: ${link.href}`));
        console.log(chalk.yellow(`text: ${link.text}`));
        console.log(chalk.blue(`file: ${link.file}`));

        if (validate && link.status !== undefined && link.ok !== undefined) {
          console.log(chalk.magenta(`status: ${link.status}`));
          console.log(chalk.cyan(`ok: ${link.ok}`));
        }

        console.log('------------------------------------------------------------------------');
      });
    }
  })
  .catch((error) => {
    console.error('Erro:', error.message);
  });
