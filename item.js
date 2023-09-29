export class Nave {
  constructor(juego) {
    this.juego = juego;

    this.spriteAncho = 34;
    this.spriteAlto = 34;

    this.tamanioModificador = Math.random() * 0.9 + 0.8;
    this.cuadro = 0;
    this.cuadroMax = 0;

    this.tiempoUltimoCambio = 0;
    this.intervaloCambio = Math.random() * 50 + 50;

    this.ancho = this.spriteAncho * this.tamanioModificador;
    this.alto = this.spriteAlto * this.tamanioModificador;
    this.imagen = new Image();
    this.imagen.src = 'assets/SpaceShip.png';

    this.deboMorir = false;

    this.x = Math.random() * (juego.ancho - this.ancho);

    this.y = juego.alto;

    this.direccionY = Math.random() * 5 + 3;

    this.color = 'white';
  }

  dibujar(contexto, contextoColision) {
    contextoColision.fillStyle = this.color;

    contextoColision.fillRect(this.x, this.y, this.ancho, this.alto);
    contexto.drawImage(
      this.imagen,
      this.cuadro * this.spriteAncho,
      0,
      this.spriteAncho,
      this.spriteAlto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    );
  }

  actualizar(deltaTiempo) {
    this.y -= this.direccionY;
    if (this.y < 0 - this.alto) this.deboMorir = true;
    if (this.tiempoUltimoCambio > this.intervaloCambio) {
      if (this.cuadro > this.cuadroMax) this.cuadro = 0;
      else this.cuadro++;
    }
    this.tiempoUltimoCambio += deltaTiempo;
  }
}
