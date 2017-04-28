const fs                    = require('fs');
const _                     = require('./helpers');
const config                = require('./config');
const NeuronioSaida         = require('./neuronios/NeuronioSaida');
const NeuronioOculta        = require('./neuronios/NeuronioOculta');
const salvarPesos           = require('./helpers/salvarPesos');
const normalizarEntradas    = require('./helpers/normalizarEntradas');
const pesos                 = require('./data/pesos');

//node --stack-size=65500 index.js treinamento treinamento.csv

if (process.argv.length !== 4) {
  console.error('Informe <fase> <arquivo>');
  return;
}
const fase = process.argv[2];
const file = `./data/${process.argv[3]}`;

if (['treinamento', 'generalizacao'].indexOf(fase) === -1) {
  console.error('Escolha <fase> = treinamento ou generalizacao');
  return;
}

if (!fs.existsSync(file)) {
  console.error('<arquivo> = Não existe');
  return;
}

const entradas = normalizarEntradas(file);

const totalDeEpocas = 5000;
const eta = config.learningRate;

const h = pesos[0];//fase === 'generalizacao' ? pesos[0] : config.weights[0];
const o = pesos[1];//fase === 'generalizacao' ? pesos[1] : config.weights[1];

const h1 = new NeuronioOculta(h[0]);
const h2 = new NeuronioOculta(h[1]);
const h3 = new NeuronioOculta(h[2]);
const h4 = new NeuronioOculta(h[3]);
const h5 = new NeuronioOculta(h[4]);
const h6 = new NeuronioOculta(h[5]);
const h7 = new NeuronioOculta(h[6]);

const o1 = new NeuronioSaida(o[0]);
const o2 = new NeuronioSaida(o[1]);
const o3 = new NeuronioSaida(o[2]);
const o4 = new NeuronioSaida(o[3]);

// ===============================================
// INIT
// ===============================================
if (fase === 'treinamento') {
  treinamento(entradas);
} else {
  generalizacao(entradas);
}

function log() {
  //console.log.apply(null, arguments);
}

// ===============================================
// TREINAMENTO
// ===============================================
function treinamento(entradas) {
  const epocas = totalDeEpocas;
  let i = 0;
  let resposta;
  let mediaFinal;
  console.time('time');
  while (i < epocas) {
    i++;
    resposta = treinar(entradas.slice(0), []);
    // if (mediaFinal < 0.00009) {
    //   console.log('BREAK', i);
    //   break;
    // }
    // if (i % 1000 === 0) {
    // }
    // console.log(i, mediaFinal);
    if (i % 1000 === 0) {
      mediaFinal = _.mediaFinal(resposta);
      console.log(i, mediaFinal);
      salvarPesos([o1, o2, o3, o4, o5, o6, o7], [s1, i);
    }
  }
  console.timeEnd('time');
  // console.log(i, mediaFinal);
  // salvarPesos([h1, h2, h3, h4, h5, h6, h7], [o1, o2, o3, o4], i);
}

// ===============================================
// GENERALIZACO
// ===============================================
function generalizacao(entradas) {
  entradas
    .map(e => {
      const output = rodar.apply(null, e.input).map(i => i > 0.09 ? 1 : 0);
      const target = e.target;
      const certo = output
        .reduce((acc, curr, i) => {
          return (output[i] === target[i]) && acc;
        }, true);
      return {
        output,
        target,
        certo
      };
    })
    .reduce((acc, curr) => {
        const certo = curr.certo;
        if (certo) {
          acc[0].certo += 1;
        } else {
          acc[0].errado += 1;
        }
        console.log(certo ? "\x1b[32m" : "\x1b[31m", `target: ${curr.target.toString()} output: ${curr.output.toString()}`);
        return acc;
      }, [{ certo: 0, errado: 0 }])
    .map(i => {
      console.log("\n");
      console.log("\x1b[32m", 'CERTOS: ', i.certo);
      console.log("\x1b[31m", 'ERRADOS:', i.errado);
    });
}


function rodar(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11) {

  h1.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  h2.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  h3.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  h4.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  h5.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  h6.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  h7.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);

  o1.calcula(h1.y, h2.y, h3.y, h4.y, h5.y, h6.y, h7.y);
  o2.calcula(h1.y, h2.y, h3.y, h4.y, h5.y, h6.y, h7.y);
  o3.calcula(h1.y, h2.y, h3.y, h4.y, h5.y, h6.y, h7.y);
  o4.calcula(h1.y, h2.y, h3.y, h4.y, h5.y, h6.y, h7.y);

  return [o1.y, o2.y, o3.y, o4.y];

}


function treinar(entradas, totalErros) {

  const entrada = entradas.shift();

  if (!entrada) {
    return totalErros;
  }
  const input  = entrada.input;
  const target = entrada.target;

  const x1  = input[0];
  const x2  = input[1];
  const x3  = input[2];
  const x4  = input[3];
  const x5  = input[4];
  const x6  = input[5];
  const x7  = input[6];
  const x8  = input[7];
  const x9  = input[8];
  const x10 = input[9];
  const x11 = input[10];

  const output = rodar(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);

  // Erro
  const erro1 = _.id(target[0] - output[0]);
  const erro2 = _.id(target[1] - output[1]);
  const erro3 = _.id(target[2] - output[2]);
  const erro4 = _.id(target[3] - output[3]);

  const media = _.id(0.5 * (Math.pow((erro1 + erro2 + erro3 + erro4), 2)));
  const erros = [erro1, erro2, erro3, erro4];

  totalErros.push({erros:erros, media: media});

  log('erro1', target[0], output[0], ' => ' ,erro1);
  log('erro2', target[1], output[1], ' => ' ,erro2);
  log('erro3', target[2], output[2], ' => ' ,erro3);
  log('erro4', target[3], output[3], ' => ' ,erro4);

  // Camada SAIDA
  const grad_o1 = o1.derivada() * erro1;
  const grad_o2 = o2.derivada() * erro2;
  const grad_o3 = o3.derivada() * erro3;
  const grad_o4 = o4.derivada() * erro4;

  log('grad_o1', grad_o1);
  log('grad_o2', grad_o2);
  log('grad_o3', grad_o3);
  log('grad_o4', grad_o4);

  // ajustando pesos
  o1.setW(
    o1.w0 + (grad_o1 * eta),
    o1.w1 + (grad_o1 * eta * h1.y),
    o1.w2 + (grad_o1 * eta * h2.y),
    o1.w3 + (grad_o1 * eta * h3.y),
    o1.w4 + (grad_o1 * eta * h4.y),
    o1.w5 + (grad_o1 * eta * h5.y),
    o1.w6 + (grad_o1 * eta * h6.y),
    o1.w7 + (grad_o1 * eta * h7.y)
  );
  log('pesos_o1', o1);

  // Camada OCULTA
  const grad_h1 = h1.derivada() * (grad_o1 * o1.w1);
  const grad_h2 = h2.derivada() * (grad_o1 * o1.w2);
  const grad_h3 = h3.derivada() * (grad_o1 * o1.w3);
  const grad_h4 = h4.derivada() * (grad_o1 * o1.w4);
  const grad_h5 = h5.derivada() * (grad_o1 * o1.w5);
  const grad_h6 = h6.derivada() * (grad_o1 * o1.w6);
  const grad_h7 = h7.derivada() * (grad_o1 * o1.w7);

  // ajustando pesos
  h1.setW(
    h1.w0  + (grad_h1 * eta),
    h1.w1  + (grad_h1 * eta * x1),
    h1.w2  + (grad_h1 * eta * x2),
    h1.w3  + (grad_h1 * eta * x3),
    h1.w4  + (grad_h1 * eta * x4),
    h1.w5  + (grad_h1 * eta * x5),
    h1.w6  + (grad_h1 * eta * x6),
    h1.w7  + (grad_h1 * eta * x7),
    h1.w8  + (grad_h1 * eta * x8),
    h1.w9  + (grad_h1 * eta * x9),
    h1.w10 + (grad_h1 * eta * x10),
    h1.w11 + (grad_h1 * eta * x11)
  );

  h2.setW(
    h2.w0  + (grad_h2 * eta),
    h2.w1  + (grad_h2 * eta * x1),
    h2.w2  + (grad_h2 * eta * x2),
    h2.w3  + (grad_h2 * eta * x3),
    h2.w4  + (grad_h2 * eta * x4),
    h2.w5  + (grad_h2 * eta * x5),
    h2.w6  + (grad_h2 * eta * x6),
    h2.w7  + (grad_h2 * eta * x7),
    h2.w8  + (grad_h2 * eta * x8),
    h2.w9  + (grad_h2 * eta * x9),
    h2.w10 + (grad_h2 * eta * x10),
    h2.w11 + (grad_h2 * eta * x11)
  );

  h3.setW(
    h3.w0  + (grad_h3 * eta),
    h3.w1  + (grad_h3 * eta * x1),
    h3.w2  + (grad_h3 * eta * x2),
    h3.w3  + (grad_h3 * eta * x3),
    h3.w4  + (grad_h3 * eta * x4),
    h3.w5  + (grad_h3 * eta * x5),
    h3.w6  + (grad_h3 * eta * x6),
    h3.w7  + (grad_h3 * eta * x7),
    h3.w8  + (grad_h3 * eta * x8),
    h3.w9  + (grad_h3 * eta * x9),
    h3.w10 + (grad_h3 * eta * x10),
    h3.w11 + (grad_h3 * eta * x11)
  );

  h4.setW(
    h4.w0  + (grad_h4 * eta),
    h4.w1  + (grad_h4 * eta * x1),
    h4.w2  + (grad_h4 * eta * x2),
    h4.w3  + (grad_h4 * eta * x3),
    h4.w4  + (grad_h4 * eta * x4),
    h4.w5  + (grad_h4 * eta * x5),
    h4.w6  + (grad_h4 * eta * x6),
    h4.w7  + (grad_h4 * eta * x7),
    h4.w8  + (grad_h4 * eta * x8),
    h4.w9  + (grad_h4 * eta * x9),
    h4.w10 + (grad_h4 * eta * x10),
    h4.w11 + (grad_h4 * eta * x11)
  );

  h5.setW(
    h5.w0  + (grad_h5 * eta),
    h5.w1  + (grad_h5 * eta * x1),
    h5.w2  + (grad_h5 * eta * x2),
    h5.w3  + (grad_h5 * eta * x3),
    h5.w4  + (grad_h5 * eta * x4),
    h5.w5  + (grad_h5 * eta * x5),
    h5.w6  + (grad_h5 * eta * x6),
    h5.w7  + (grad_h5 * eta * x7),
    h5.w8  + (grad_h5 * eta * x8),
    h5.w9  + (grad_h5 * eta * x9),
    h5.w10 + (grad_h5 * eta * x10),
    h5.w11 + (grad_h5 * eta * x11)
  );

  h6.setW(
    h6.w0  + (grad_h6 * eta),
    h6.w1  + (grad_h6 * eta * x1),
    h6.w2  + (grad_h6 * eta * x2),
    h6.w3  + (grad_h6 * eta * x3),
    h6.w4  + (grad_h6 * eta * x4),
    h6.w5  + (grad_h6 * eta * x5),
    h6.w6  + (grad_h6 * eta * x6),
    h6.w7  + (grad_h6 * eta * x7),
    h6.w8  + (grad_h6 * eta * x8),
    h6.w9  + (grad_h6 * eta * x9),
    h6.w10 + (grad_h6 * eta * x10),
    h6.w11 + (grad_h6 * eta * x11)
  );

  h7.setW(
    h7.w0  + (grad_h7 * eta),
    h7.w1  + (grad_h7 * eta * x1),
    h7.w2  + (grad_h7 * eta * x2),
    h7.w3  + (grad_h7 * eta * x3),
    h7.w4  + (grad_h7 * eta * x4),
    h7.w5  + (grad_h7 * eta * x5),
    h7.w6  + (grad_h7 * eta * x6),
    h7.w7  + (grad_h7 * eta * x7),
    h7.w8  + (grad_h7 * eta * x8),
    h7.w9  + (grad_h7 * eta * x9),
    h7.w10 + (grad_h7 * eta * x10),
    h7.w11 + (grad_h7 * eta * x11)
  );
  return treinar(entradas, totalErros);
}
