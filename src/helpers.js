
function filtraOcorrencias(paragrafo) {
    return Object.keys(paragrafo).filter(chave => paragrafo[chave]);
}

// function montaSaidaArquivo(listaPalavras) {
//     let textoFinal = '';
//     listaPalavras.forEach((paragrafo, indice) => {
//         const duplicadas = filtraOcorrencias(paragrafo).join(', ');
//         textoFinal += `Palavras duplicadas no parágrafo${indice + 1}: ${duplicadas}\n`;

//     });

//     return textoFinal;
// }

// A função acima foi refatorada para melhorar a legibilidade e evitar a criação de uma string com uma vírgula no final quando não houver palavras duplicadas.

function montaSaidaArquivo(listaPalavras) {
    let textoFinal = '';
    listaPalavras.forEach((paragrafo, indice) => {
        const duplicadas = filtraOcorrencias(paragrafo);

        if(duplicadas.length > 0){
            textoFinal += `Palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas.join(', ')}\n`;
        }

    });

    return textoFinal;
}



export { montaSaidaArquivo };