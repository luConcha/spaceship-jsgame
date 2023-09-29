import { Nave } from './item.js';

window.addEventListener('load', function () {
  const lienzo = document.getElementById('lienzo');
  const ctx = lienzo.getContext('2d');
  lienzo.width = 500;
  lienzo.height = 500;

  const colision = document.getElementById('colision');
  const ctxColision = colision.getContext('2d');
  colision.width = 500;
  colision.height = 500;

  class Juego {
    constructor(ancho, alto, contexto) {
      this.ancho = ancho;
      this.alto = alto;
      this.contexto = contexto;

      this.naves = [];

      this.ultimoTiempo = 0;
      this.tiempoSiguienteNave = 500;
      this.intervaloEntreNaves = 1500;

      this.puntacion = 0;
    }

    dibujar() {
      this.contexto.clearRect(0, 0, this.ancho, this.alto);
      ctxColision.clearRect(0, 0, this.ancho, this.alto);
    }

    actualizar(marcaTiempo) {
      let deltaTiempo = marcaTiempo - this.ultimoTiempo;
      this.ultimoTiempo = marcaTiempo;
      this.tiempoSiguienteNave += deltaTiempo;

      if (this.tiempoSiguienteNave > this.intervaloEntreNaves) {
        this.naves.push(new Nave(juego));
        this.tiempoSiguienteNave = 0;
      }
      [...this.naves].forEach((nave) => nave.actualizar(deltaTiempo));

      [...this.naves].forEach((nave) =>
        nave.dibujar(this.contexto, ctxColision)
      );

      this.naves = this.naves.filter((nave) => !nave.deboMorir);
    }

    dibujarPuntuacion() {
      this.contexto.fillStyle = 'white';
      this.contexto.font = 'bold 18px serif';
      this.contexto.fillText(`Score: ${this.puntacion}`, 220, 30);
    }
  }

  const juego = new Juego(lienzo.width, lienzo.height, ctx);

  window.addEventListener('click', function (e) {
    const colorPixel = ctxColision.getImageData(e.offsetX, e.offsetY, 2, 2);
    console.log('Evento', e.offsetX, e.offsetY);
    const cp = colorPixel.data;
    console.log(juego.naves);
    juego.naves.forEach((naves) => {
      console.log(naves.coloresAleatorios, cp);
      if (cp[0] !== 0 && cp[1] !== 0 && cp[2] !== 0) {
        naves.deboMorir = true;
        juego.puntacion++;
      }
    });
  });

  function animate(marcaTiempo) {
    juego.dibujar();
    juego.actualizar(marcaTiempo);

    juego.dibujarPuntuacion();
    requestAnimationFrame(animate);
  }

  animate(0);
});
