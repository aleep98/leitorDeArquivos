import fs from 'fs';
import trataErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';

const program = new Command();

program
    .option('-i, --input <string>', 'Caminho do arquivo de entrada')
    .option('-o, --output <string>', 'Caminho do diretório de saída')
    .action((options) => {
        const { input, output } = options;
        if (!input || !output) {
            console.error('Por favor, forneça os caminhos de entrada e saída usando as opções -i e -o.');
            program.help(); // Exibe a ajuda do comando e encerra o processo
            return;
        }
    });

program.parse(process.argv);


const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile(link, 'utf8', (erro, data) => {
    try {
        if (erro) throw erro
       const resultado = contaPalavras(data);
       criaESalvaArquivo(resultado, endereco);
    } catch (erro) {
        trataErros(erro);
    }
})


// async function criaESalvaArquivo(listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);

//     try {
//         await fs.promises.writeFile(arquivoNovo, textoPalavras);
//         console.log('Arquivo criado!');
//     } catch (erro) {
//         trataErros(erro);
    
//     }
// }

 function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);

    
         fs.promises.writeFile(arquivoNovo, textoPalavras)
         .then (() => {
            console.log('Arquivo criado!');
         })
         .catch((erro) => {
            trataErros(erro);
         })
         .finally(() => {
            console.log('Processo de criação do arquivo finalizado.');
         });
       
}