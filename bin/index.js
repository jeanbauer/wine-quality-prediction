#!/usr/bin/env node

const fs = require('fs');
const tipo = process.argv[2];
const arquivo = process.argv[3];
if (tipo === 'treinamento') {
  // console.log('treinamento');
} else if (tipo === 'generalizacao') {
  // console.log('generalizacao');
} else {
  return console.log('Comando não especificado');
}

if (!arquivo) return console.log('Precisamos de um arquivo do tipo csv');

fs.readFile(arquivo, 'utf8', (err, data) => {
  if (err) return console.log(err);

  const normalizado = data.replace(/"([0-9]*),([0-9]*)"/g, (match, a, b) => `${a}.${b}`);
  const linhas = normalizado.split('\n');

  const comparaMaiorValor = (a, b) => (a) > (b) ? (a) : (b);

  const vinhos = linhas.slice(1).map(linha => linha.split(';').map(l => parseFloat(l))); 

  const totaisKeys = {
    fixed_acidity: 0,
    volatile_acidity: 0,
    citric_acid: 0,
    residual_sugar: 0,
    chlorides: 0,
    free_sulfur_dioxide: 0,
    total_sulfur_dioxide: 0,
    density: 0,
    pH: 0,
    sulphates: 0,
    alcohol: 0,
    quality: 0
  };

  const totais = vinhos 
   .reduce((acc, linha) => {
     Object.keys(acc).forEach((k, i) => {
       acc[k] = comparaMaiorValor(acc[k], linha[i]);
     });
     return acc;
   }, totaisKeys);

  const vinhosNormalizados = vinhos.map(linha => {
    Object.keys(totais).forEach((k, i) => {
      linha[i] = linha[i] / totais[k];
    });

    return linha;
  });

  console.log(totais);
});