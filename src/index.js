const fs = require('fs');


const caminhoArquivo = process.argv;
const link = caminhoArquivo[2];

fs.readFile(link, 'utf8', (err, data) =>{
    if (err) {
        console.log('Qual foi o erro? ', err.code);
        return;
    }
    contaPalavras(data);

})

function contaPalavras(data) {
    const paragrafos = extrairPalavras(data);
    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return []
        return verificarCaracteresDuplicados(paragrafo);
    })
    console.log(contagem);
}

function extrairPalavras(data) {
    return data.toLowerCase().split('\n'); //dividir o texto em parágrafos usando a quebra de linha como separador
}

function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); //remove caracteres de pontuação usando expressão regular
}

function verificarCaracteresDuplicados(data) {
    const listaPalavras = data.split(' '); //dividir o texto em palavras usando o espaço como separador};
    const resultado = {};

    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra); //limpa a palavra de caracteres de pontuação
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1; //se a palavra já existe no resultado, incrementa o contador, caso contrário, inicia com 1

        }
    })

    return resultado;}