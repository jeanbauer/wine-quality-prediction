const fs = require('fs');
const salvarPesos = require('./helpers/salvarPesos');
const Neuronio = require('./Neuronio');
const pesos = require('./configuracoes/pesos');
const _ = require('./helpers');
const configuracoes = require('./configuracoes');
const eta = configuracoes.taxaDeAprendizado;

const o = pesos[0];
const s = pesos[1];
const o1 = new Neuronio(o[0], 'oculta');
const o2 = new Neuronio(o[1], 'oculta');
const o3 = new Neuronio(o[2], 'oculta');

const s1 = new Neuronio(s[0], 'saida');

module.exports = () => {
  fnTreinar();
}

const fnTreinar = () => {

  const entradasNormalizadas = JSON.parse(fs.readFileSync('normalizados.json', 'utf8'));

  const totalDeEpocas = 30;

  const epocas = totalDeEpocas;
  let i = 0;
  let resposta;
  let mediaFinal;
  console.time('time');
  while (i < epocas) {
    i++;
    console.log(i);
    resposta = treinar(entradasNormalizadas.slice(0), []);
    if (i % 10 === 0) {
      mediaFinal = _.mediaFinal(resposta);
      salvarPesos([o1, o2, o3], [s1]);
    }
  }
  console.timeEnd('time');
}

function rodar(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11) {
  o1.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  o2.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  o3.calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11);
  s1.calcula(o1.y, o2.y, o3.y);
  return [s1.y];
}

function treinar(entradas, totalErros) {
  const entrada = entradas.shift();
  if (!entrada) return totalErros;

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

  const erro1 = _.id(target[0] - output[0]);
  const media = _.id(0.5 * (Math.pow((erro1), 2)));
  const erros = [erro1];

  totalErros.push({ erros, media });
  // console.log('Erro', target[0], output[0], ' => ' , erro1);

  // Camada SAIDA
  const grad_s1 = s1.derivada() * erro1;
  // console.log('grad_s1', grad_s1);

  // ajustando pesos
  s1.setPesos(
    s1.w0 + (grad_s1 * eta),
    s1.w1 + (grad_s1 * eta * o1.y),
    s1.w2 + (grad_s1 * eta * o2.y),
    s1.w3 + (grad_s1 * eta * o3.y)
  );
  //console.log('pesos_s1', s1);

  // Camada OCULTA
  const grad_o1 = o1.derivada() * (grad_s1 * s1.w1);
  const grad_o2 = o2.derivada() * (grad_s1 * s1.w2);
  const grad_o3 = o3.derivada() * (grad_s1 * s1.w3);
  //console.log('gradiente 1', grad_o1);
  // ajustando pesos
  o1.setPesos(
    o1.w0  + (grad_o1 * eta),
    o1.w1  + (grad_o1 * eta * x1),
    o1.w2  + (grad_o1 * eta * x2),
    o1.w3  + (grad_o1 * eta * x3),
    o1.w4  + (grad_o1 * eta * x4),
    o1.w5  + (grad_o1 * eta * x5),
    o1.w6  + (grad_o1 * eta * x6),
    o1.w7  + (grad_o1 * eta * x7),
    o1.w8  + (grad_o1 * eta * x8),
    o1.w9  + (grad_o1 * eta * x9),
    o1.w10 + (grad_o1 * eta * x10),
    o1.w11 + (grad_o1 * eta * x11)
  );
	 // console.log('pesos_o1', o1);

  o2.setPesos(
    o2.w0  + (grad_o2 * eta),
    o2.w1  + (grad_o2 * eta * x1),
    o2.w2  + (grad_o2 * eta * x2),
    o2.w3  + (grad_o2 * eta * x3),
    o2.w4  + (grad_o2 * eta * x4),
    o2.w5  + (grad_o2 * eta * x5),
    o2.w6  + (grad_o2 * eta * x6),
    o2.w7  + (grad_o2 * eta * x7),
    o2.w8  + (grad_o2 * eta * x8),
    o2.w9  + (grad_o2 * eta * x9),
    o2.w10 + (grad_o2 * eta * x10),
    o2.w11 + (grad_o2 * eta * x11)
  );
	
  o3.setPesos(
    o3.w0  + (grad_o3 * eta),
    o3.w1  + (grad_o3 * eta * x1),
    o3.w2  + (grad_o3 * eta * x2),
    o3.w3  + (grad_o3 * eta * x3),
    o3.w4  + (grad_o3 * eta * x4),
    o3.w5  + (grad_o3 * eta * x5),
    o3.w6  + (grad_o3 * eta * x6),
    o3.w7  + (grad_o3 * eta * x7),
    o3.w8  + (grad_o3 * eta * x8),
    o3.w9  + (grad_o3 * eta * x9),
    o3.w10 + (grad_o3 * eta * x10),
    o3.w11 + (grad_o3 * eta * x11)
  );

  return treinar(entradas, totalErros);
}
