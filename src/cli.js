import fs from 'fs';
import trataErros from './erros/funcoesErros.js';
import { contaPalavras } from './index.js';

const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf8', (erro, data) => {
    try {
        if (erro) throw erro
        contaPalavras(data);
    } catch (erro) {
        trataErros(erro);
    }
})
