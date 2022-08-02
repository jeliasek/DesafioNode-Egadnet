# DesafioNode-Egadnet

### Tópicos 

- [Descrição do Projeto](#descrição-do-projeto)

- [Ferramentas e Bibliotecas Utilizadas](#ferramentas-e-bibliotecas-utilizadas)

- [Casos de Teste Previstos](#casos-de-teste-previstos)

- [Comprovação dos Requisitos](#comprovação-dos-requisitos)

- [Abrir e rodar o projeto](#abrir-e-rodar-o-projeto)

- [Desenvolvedores](#desenvolvedores)

## Descrição do projeto 
<p align="justify">

 Desafio proposto pela empresa Egadnet com o objetivo de analisar as habilidades técnicas dos candidatos para Node.js. 
 
 Desenvolvimento de uma API que recebe requisições POST com um determinado CEP como parâmetro, o qual será consultado pela API "ViaCEP - https://viacep.com.br". A API deve possuir algum tipo de autenticação, escolhido pelo desenvolvedor, além de ter uma solução de busca em Cache para CEPs pesquisados em um intervalo inferior a 5 minutos.

</p>

## Ferramentas e Bibliotecas Utilizadas

:triangular_flag_on_post: Node.Js

:triangular_flag_on_post: Express

:triangular_flag_on_post: Axios

:triangular_flag_on_post: Redis

:triangular_flag_on_post: JWT

:triangular_flag_on_post: ESLint

## Casos de Teste Previstos

**Autenticação**
| Caso de Teste (ID) | Entradas | Passo a Passo | Saídas Esperadas |
|---|---| ---|---|
| 001 | { 'user': '', 'password': '' } | Não informar o usuário, nem senha | { 'auth': false, 'error': 'Usuário e Senha São Obrigatórios. Tente Novamente.'} |
| 002 | { 'user': "lalala", 'password': '123' } | Informar usuário e senha inválidos. | { 'auth': false, error: 'Usuário/Senha inválido(s)'} |
| 003 | { 'user': 'egadnet', 'password': 'admin' } | Informar usuário e senha válidos. | { 'auth': true, token (gerado pelo JWT) } |

**Buscar CEP**

Pré Requisito(s): Estar autenticado, ou seja, possuir um token válido.
| Caso de Teste (ID) | Entradas | Passo a Passo | Saídas Esperadas |
|---|---| ---|---|
| 001 | { 'cep': '' } | Não informar o CEP | { 'error': 'Por favor, informe o CEP.' } |
| 002 | { 'cep': '89140 00' } | Informar o CEP com espaços na String. | { 'error': 'CEP a ser buscado não pode conter espaços. Tente Novamente!' } |
| 003 | { 'cep': '891400000' } | Informar o CEP com mais de 8 caracteres. | { 'error': 'O CEP a ser buscado deve conter 8 dígitos, sendo todos numéricos. Tente Novamente!' } |
| 004 | { 'cep': '8914000' } | Informar o CEP com menos de 8 caracteres. | { 'error': 'O CEP a ser buscado deve conter 8 dígitos, sendo todos numéricos. Tente Novamente!' } |
| 005 | { 'cep': '8914000A' } | Informar o CEP com letras dentro da String. | { 'error': 'O CEP a ser buscado deve conter somente numéricos. Tente Novamente!' } |
| 006 | { 'cep': '12345678' } | Informar o CEP com 8 numéricos, porém inexistente. | { 'error': ''CEP informado não foi encontrado. Tente Novamente!' } |
| 007 | { 'cep': '89140000' } | Informar o CEP com 8 numéricos, corretamente. | {"cep": "89140-000","logradouro": "","complemento": "","bairro": "","localidade": "Ibirama","uf": "SC","ibge": "4206900","gia": "","ddd": "47","siafi": "8135","origemRetorno": "API VIACEP"} |
| 008 | { 'cep': '89140000' } | Informar o CEP com 8 numéricos, corretamente, por mais de uma vez em um intervalo inferior a 5 minutos. | {"cep": "89140-000","logradouro": "","complemento": "","bairro": "","localidade": "Ibirama","uf": "SC""ibge": "4206900","gia": "","ddd": "47","siafi": "8135","origemRetorno": "CACHE"} |

## Comprovação dos Requisitos

- [Acesse aqui](./Egadnet.pdf)
