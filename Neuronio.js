const _ = require('./helpers');

class Neuronio {
  constructor(pesos, tipo) {
    this.y = 0; // sigmoid, valor da saida de fato
    this.v = 0;
    this.tipo = tipo;
    this.setPeso(pesos);
  }

  setPeso(pesos) {
    // console.log(pesos, typeof pesos);
    pesos.forEach((peso, k) => this[`w${k}`] = _.id(peso));
  }

  setPesos(w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11) {
    if (this.tipo === 'saida') {
      this.w0 = _.id(w0);
      this.w1 = _.id(w1);
      this.w2 = _.id(w2);
      this.w3 = _.id(w3);
    } else {
      this.w0 = _.id(w0);
      this.w1 = _.id(w1);
      this.w2 = _.id(w2);
      this.w3 = _.id(w3);
      this.w4 = _.id(w4);
      this.w5 = _.id(w5);
      this.w6 = _.id(w6);
      this.w7 = _.id(w7);
      this.w8 = _.id(w8);
      this.w9 = _.id(w9);
      this.w10 = _.id(w10);
      this.w11 = _.id(w11);
    }
  }

  derivada() {
    const y = this.y;
    return _.id(y * (1 - y));
  }

  calcula(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11) {
    // Object.keys(this).filter(w => w.indexOf('w') >= 0).forEach((w, k) => {
    //   this.v = this[w] + ([`x${k + 1}`] * this[w]);
    // });
    if (this.tipo === 'saida') {
      this.v = _.id(this.w0 + (x1 * this.w1) + (x2 * this.w2) + (x3 * this.w3));
      this.y = _.id(1/(1 + Math.pow(Math.E, -this.v))); // sigmoid
    } else if (this.tipo === 'oculta') {
      this.v = _.id(this.w0 + (x1  * this.w1) + (x2  * this.w2) + (x3  * this.w3) + (x4  * this.w4) + (x5  * this.w5) + (x6  * this.w6) + (x7  * this.w7) + (x8  * this.w8) + (x9  * this.w9) + (x10 * this.w10) + (x11 * this.w11));
      this.y = _.id(1/(1 + Math.pow(Math.E, -this.v)));
    }
  }
}

module.exports = Neuronio;