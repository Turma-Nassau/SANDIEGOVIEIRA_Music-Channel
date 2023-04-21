<h1 align="center">:cd: :musical_note: Music Channel</h1>

## :memo: Descrição
Projeto de site para ouvir músicas.

## :books: Funcionalidades
* <b>Funcionalidades </b>:  Neste site, o usuário poderá ouvir musicas através de um canal de musicas fornecido por uma API.

## :wrench: Tecnologias utilizadas
* HTML
* Javascript
* CSS
* Node-JS
## Estrutura de Dados

- Node-ID3

```s
   const fs = require('fs');
const path = require('path');
const express = require('express');
const ID3 = require('node-id3'); // biblioteca id3 para ler os metadados

```
- Ler todos os arquivos

```s
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err); // ler todos os arquivos
    }  

```
- Filtro de arquivos

```s
 files.filter(file => {
      return path.extname(file).toLowerCase() === '.mp3'; // filtra os arquivos mp3
    }).forEach(mp3 => {
      const tags = ID3.read(path.join(directoryPath, mp3));
      mp3Files.push({
        file: mp3,
        image: tags.image ? tags.image.imageBuffer.toString() : null 
      });
    });

```
- Após o servidor ser iniciado, a API trás os arquivos e a imagem do arquivo mp3 correspondente, após ser implementado em html estará visível.

![image](https://user-images.githubusercontent.com/38019660/233528143-96ee916a-837f-4d89-804a-844aff12b9ce.png)

![image](https://user-images.githubusercontent.com/38019660/233528459-5b8708b5-e167-4277-abb9-824eef1b91ae.png)


## :soon: Implementação futura
* Projeto poderá receber adição de DB e funções como poder alterar cor do site, modo escuro e como também a função de se adaptar ao formato mobile ao ser acessado através de dispositivos móveis.

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/SANDIEGOVIEIRA">
        <sub>
          <b>SANDIEGOVIEIRA</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
* Em desenvolvimento :construction_worker: :construction:.
