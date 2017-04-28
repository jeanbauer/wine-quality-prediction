const fs = require('fs');

function salvarPesos(oculta, saida, sufix) {
  const filename = `configuracoes/pesos.js`; // const filename = `data/pesos/${sufix}.js`;
  fs.exists(filename, exists => {
    if (exists) {
      fs.unlinkSync(filename);
    }
    fs.appendFileSync(filename, 'module.exports = [\n');
    fs.appendFileSync(filename, '  [\n');
    oculta.map((n, i, d) => {
      const comma = (d.length - 1 === i) ? '' : ',';
      const x = `[${n.w0},${n.w1},${n.w2},${n.w3},${n.w4},${n.w5},${n.w6},${n.w7},${n.w8},${n.w9},${n.w10},${n.w11}]`;
      fs.appendFileSync(filename, `    ${x}${comma}\n`);
    });
    fs.appendFileSync(filename, '  ],\n');
    fs.appendFileSync(filename, '  [\n');
    saida.map((n, i, d) => {
      const comma = (d.length - 1 === i) ? '' : ',';
      const x = `[${n.w0},${n.w1},${n.w2},${n.w3},${n.w4},${n.w5},${n.w6},${n.w7}]`;
      fs.appendFileSync(filename, `    ${x}${comma}\n`);
    });
    fs.appendFileSync(filename, '  ]\n');
    fs.appendFileSync(filename, '];');
    console.log(`Arquivo ${filename} salvo!`)
  });
}

module.exports = salvarPesos;