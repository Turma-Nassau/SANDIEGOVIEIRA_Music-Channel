<h1 align="center">:cd: :musical_note: Music Channel</h1>

## :memo: Descrição
O Music Channel é uma aplicação que lista arquivos de áudio disponíveis e os exibe em uma interface de usuário simples. O projeto é composto por uma API em Node.js e um aplicativo React.

## Passos necessários para executar o projeto:
- Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixar a versão mais recente do Node.js em https://nodejs.org/.
- Clone o repositório:

Abra o terminal ou prompt de comando e navegue até o diretório em que você deseja clonar o projeto.

Execute o seguinte comando para clonar o repositório:
```s
git clone https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel.git
```
- Instale as dependências:

Navegue até o diretório raiz do projeto clonado.:
```s
cd music-channel
```
- Instale as dependências da API:
```s
cd api
npm install
```
- Em outro terminal, navegue para o diretório do aplicativo React e instale as dependências:
```s
cd musicchannel
npm install
```
- Inicie o servidor:
```s
node server.js
```
- Inicie o React:
```s
npm start
```
O aplicativo Music Channel estará sendo executado em http://localhost:3000, e a API estará sendo executada em http://localhost:4000/api.

## :books: Funcionalidades
* <b>Funcionamento</b>:  A aplicação consiste em duas partes principais: a API e o aplicativo React. A API é responsável por fornecer a lista de arquivos de áudio disponíveis, enquanto o aplicativo React consome essa API e exibe os arquivos na interface do usuário.

## :wrench: Tecnologias utilizadas
* HTML5
* React
* CSS3
* Node-JS
* API Fetch
* Express
## Estrutura de Dados da API

- Responsalvel por ler os arquivos
- Nesse trecho do arquivo 'audioController.js', a função getAudioFiles é exportada para ser utilizada como um controlador de rota. Ela recebe as requisições HTTP (req) e envia as respostas (res).

Dentro da função, o primeiro passo é definir o diretório onde os arquivos de áudio estão localizados. Neste projeto, o diretório usado é definido como musicas. Mais pode ajustar o caminho para corresponder à localização correta dos seus arquivos.

Em seguida, utilizei a função readdirSync do módulo fs para obter uma lista de todos os arquivos no diretório. Depois, é aplicado um filtro para selecionar apenas os arquivos que possuem a extensão .mp3. Essa lista filtrada é armazenada na variável mp3Files.

Por fim, é enviada a lista de arquivos em formato JSON como resposta sendo utilizado o método res.json(mp3Files). Caso ocorra algum erro durante a leitura dos arquivos, um erro é retornado com uma mensagem de erro adequada.

```s
exports.getAudioFiles = (req, res) => {
  const audioFolder = path.join(__dirname, '..', 'musicas');

  try {
    const files = fs.readdirSync(audioFolder);
    const mp3Files = files.filter(file => file.endsWith('.mp3'));

    res.json(mp3Files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read audio files' });
  }
};

```
- No arquivo abaixo 'audioRoutes.js', possui a  configuração da rota
- Aqui é definido que a rota '/audios' será tratada pelo controlador 'getAudioFiles' do 'audioController'. Pois quando uma requisição GET for feita para a rota '/audios', a função 'getAudioFiles' será executada para retornar a lista de arquivos de áudio.

```s
  router.get('/audios', audioController.getAudioFiles);

```
Essa é a estrutura de dados básica da API. Ela lê os arquivos de áudio de um diretório específico e retorna a lista de arquivos para o cliente que fez a requisição.



## Estrutura de dados do React

- No arquivo 'App.js', possui o seguinte trecho de código:

```s
import React, { useState, useEffect } from 'react';
import { getAudioFiles } from './api/audioAPI';

function App() {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const data = await getAudioFiles();
        setAudios(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudios();
  }, []);

  return (
    <div>
      <h1>List of Audio Files</h1>
      <ul>
        {audios.map(audio => (
          <li key={audio}>{audio}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

```
Nesse trecho, possui o componente principal 'App'. Ele utiliza o hook 'useState' para criar o estado 'audios', que é um array vazio inicialmente. Esse estado será atualizado com a lista de arquivos de áudio obtida da API.

O hook 'useEffect' é utilizado para realizar uma chamada assíncrona à API e obter os arquivos de áudio. Quando o componente é montado, a função 'fetchAudios' é executada. Essa função utiliza a função 'getAudioFiles' do arquivo 'audioAPI.js' para fazer a requisição à API.

Quando a resposta da API é recebida, o estado audios é atualizado utilizando a função 'setAudios', o que faz com que o componente seja renderizado novamente.

No retorno do componente, temos a estrutura JSX que define a interface do usuário. A lista de arquivos de áudio é renderizada como uma lista não ordenada 'ul', onde cada item é um elemento 'li'.
   
 
- No arquivo 'audioAPI.js', possui o seguinte trecho de código:
   
  
```s
const BASE_URL = 'http://localhost:4000/api';

export const getAudioFiles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/audios`);
    if (!response.ok) {
      throw new Error('Failed to fetch audio files');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

```
Nesse trecho, temos a função 'getAudioFiles', que realiza a requisição assíncrona à API para obter a lista de arquivos de áudio.

Primeiro, foi definido a constante 'BASE_URL' que representa o URL base da API. Em seguida, foi usada a função 'fetch' para fazer a requisição GET para a rota '/audios' da API.

Se a resposta da API não for bem-sucedida (status de resposta diferente de 200), é lançado um erro. Caso contrário, é ultilizado o método 'json()' para obter os dados da resposta como um objeto JavaScript.

Os dados são retornados pela função 'getAudioFiles' e serão utilizados posteriormente no componente 'App'.
   
Essa é a estrutura de dados básica do React. Ela utiliza os hooks 'useState' e 'useEffect' para gerenciar o estado do componente e realizar chamadas assíncronas à API. Os dados obtidos da API são armazenados no estado e utilizados para renderizar a interface do usuário.

## Nota adicional para caso queira ver a transferência de dados da API em tempo real:

- Abra o projeto React em seu navegador, certificando-se de que a aplicação esteja em execução.
- Abra o Chrome DevTools. Você pode fazer isso clicando com o botão direito em qualquer lugar na página e selecionando "Inspecionar" ou pressionando Ctrl+Shift+I (Windows/Linux) ou Cmd+Option+I (Mac).
- Na guia "DevTools", navegue até a seção "Network" (Rede).
- Atualize a página ou realize uma ação na aplicação que dispara uma requisição à API.
- Observe as solicitações na lista exibida na guia "Network". Você verá uma entrada para cada solicitação feita pela aplicação.
- Clique na solicitação desejada para visualizar os detalhes.
- Na aba "Headers" (Cabeçalhos), você pode ver informações sobre a solicitação, como a URL, os cabeçalhos e os parâmetros enviados.
- Na aba "Preview" (Visualização) ou "Response" (Resposta), você pode ver o corpo da resposta retornada pela API, que geralmente contém os dados transferidos.

## Imagens adicionais da API em funcionamento

![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/ed230901-a168-480b-a4f0-178624a19b32)
![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/ccd4df96-04ef-4026-aa9e-08da9bb6fcf0)
![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/599a549a-421a-45c7-bbf6-eda174d84eed)
![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/372ff618-e587-483d-b60f-dc0b291f5a1d)
![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/cf426326-c794-44f4-bab4-7451f8142e33)
![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/31c5cb59-0a24-42bf-9f5c-37dfca89a03f)
![image](https://github.com/Turma-Nassau/SANDIEGOVIEIRA_Music-Channel/assets/38019660/b5489448-f692-4e69-9a1b-d9b49fedcedc)


## :soon: Implementação futura
* Suporte a formatos de arquivo adicionais: Além dos arquivos MP3, permitir o suporte a outros formatos populares de áudio, como WAV, FLAC ou AAC..
* Reprodução de áudio: Adicionar funcionalidade de reprodução de áudio aos arquivos listados. Isso pode incluir controles de reprodução, como play, pause e controle de volume.
* Pesquisa e filtragem: Implementar recursos de pesquisa e filtragem para facilitar a localização de arquivos de áudio específicos. Isso pode incluir a adição de um campo de pesquisa onde os usuários podem digitar palavras-chave ou filtros, como gênero, artista ou ano.

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
