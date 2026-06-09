import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
   .version('1.0.0')
   .option('-i, --input <string>', 'Caminho do arquivo de entrada')
   .option('-o, --output <string>', 'Caminho do diretório de saída')
   .action((options) => {
      const { input, output } = options;
      if (!input || !output) {
         console.error('Por favor, forneça os caminhos de entrada e saída usando as opções -i e -o.');
         program.help(); // Exibe a ajuda do comando e encerra o processo
         return;

      }

      const textoEntrada = path.resolve(input);
      const diretorioSaida = path.resolve(output);

      try {
         processaArquivo(textoEntrada, diretorioSaida);
         console.log(chalk.green('Processamento iniciado. Por favor, aguarde...'));
      } catch (erro) {
         console.error(chalk.red('Ocorreu um erro durante o processamento:'), erro);
      }
   });
program.parse();

function processaArquivo(data, destino) {
   fs.readFile(data, 'utf8', (erro, data) => {
      try {
         if (erro) throw erro
         const resultado = contaPalavras(data);
         criaESalvaArquivo(resultado, destino);
      } catch (erro) {
         trataErros(erro);
      }
   })

}



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
      .then(() => {
         console.log(chalk.green('Arquivo criado!'));
      })
      .catch((erro) => {
         console.error(chalk.red('Ocorreu um erro ao criar o arquivo:'), erro);
      })
      .finally(() => {
         console.log(chalk.blue('Processo de criação do arquivo finalizado.'));
      });

}