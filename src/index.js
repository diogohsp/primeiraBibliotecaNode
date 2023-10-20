import fs from 'fs';
import chalk from 'chalk';
import { match } from 'assert';
import { url } from 'inspector';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map (captura => ({[captura[1]] : [captura [2]]}))
    return resultados.length !== 0 ? resultados : "Não há links no arquivo";
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//função assincrona com async e await

async function pegaArquivo(caminhoDoArquivo){
    //caso tudo de certo TRY
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } 
    //caso não de certo CATCH
    catch (erro) {
        trataErro(erro)
    }
}

export default pegaArquivo;

//função assincrona com then()

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises //funções abaixo são "encadeadas"
//     .readFile(caminhoDoArquivo, encoding) //promessa é a forma que o js trabalha com codigo assincrono
//     .then((texto) => console.log(chalk.green(texto))) //readfile entao(then) execute... é uma função assincrona
//     .catch(trataErro)// lindando com erros assincronos

// }

//função sincrona

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro){
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     }) // readFile precisa de 3 parametros, o _ é para desconsiderar oque seria o "erro"
// }

pegaArquivo('./arquivos/texto.md');

// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)