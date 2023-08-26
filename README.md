# Extrator de Links para Arquivos Markdown

## Índice

* [1. Introdução](#1-introdução)
* [2. Instalação](#2-instalação)
* [3. Funcionalidades](#3-funcionalidades)
* [4. Fluxograma](#4-fluxograma)
* [5. Tecnologias Utilizadas](#5-tecnologias-utilizadas)

***

## 1. Introdução

O md-links é uma ferramenta de linha de comando (CLI) desenvolvida usando o NodeJS, criada para simplificar a extração e análise de links em arquivos Markdown (.md). Com essa ferramenta, você pode explorar a estrutura dos seus arquivos Markdown, verificar a validade dos links e obter estatísticas úteis sobre esses elementos.

Este projeto foi desenvolvido como parte do quarto desafio durante o Bootcamp da Laboratória. Ele representa não apenas a capacidade de criar software, mas também a solução para um problema real. Ao longo do desenvolvimento, foram aplicadas tecnologias modernas, como NodeJS, JavaScript e várias bibliotecas, para construir uma solução prática e versátil.

Além de melhorar as habilidades técnicas, o projeto enfatizou a importância da qualidade do código e das boas práticas de desenvolvimento. O md-links reflete o progresso e o aprendizado conquistados durante o Bootcamp.

## 2. Instalação

Para instalar a ferramenta, você pode utilizar o seguinte comando no terminal:
```
npm i md-links-diulianne
```

### Uso

A ferramenta é utilizada da seguinte forma:
```
md-links <arquivo> [opções]
```

Exemplo:
```
md-links arquivo.md --validate
```

## 3. Funcionalidades

#### Ao usar `md-links <nome do arquivo>`, são fornecidas informações básicas, como nome do arquivo, texto e link.

![Captura de tela 2023-08-25 174042](https://github.com/Diulianne/SAP010-md-links/assets/89495506/4e6b09ea-65ce-468a-8ba2-76fbc26c3a33)


#### Possui verificação do status HTTP dos links com a opção `--validate`.

![Captura de tela 2023-08-25 174140](https://github.com/Diulianne/SAP010-md-links/assets/89495506/6e5ffb89-b793-4c25-b3b1-748a4fcc7810)


#### Oferece estatísticas detalhadas dos links usando a opção `--stats.`

![Captura de tela 2023-08-25 174205](https://github.com/Diulianne/SAP010-md-links/assets/89495506/d3b06120-b555-4510-9200-637765d6a1c8)


#### Combinando `--stats` e `--validate`, é possível obter análises detalhadas, incluindo o total de links, quantos são únicos e quantos estão quebrados.

![Captura de tela 2023-08-25 174241](https://github.com/Diulianne/SAP010-md-links/assets/89495506/b6e884c6-2b05-4a81-8b99-2ee87ac76249)





## 4. Fluxograma

A seguir está o fluxograma que ilustra os diferentes fluxos do projeto:

![_Fluxograma](https://github.com/Diulianne/SAP010-md-links/assets/89495506/0800baf1-d3fe-4a3f-bf59-d4ff77c2844e)



## 5. Tecnologias Utilizadas
[![My Skills](https://skillicons.dev/icons?i=js,nodejs,jest,git&theme=light)](https://skillicons.dev)
