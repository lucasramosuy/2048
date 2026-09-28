# SRS · 2048

## Objetivo

Un puzzle 2048 sencillo para lucasramos.uy/2048/, sin dependencias, cuenta ni telemetría.

## Requisitos

1. Juego 2048 completo en 4 × 4: movimientos con flechas, WASD, botones en pantalla y gestos táctiles.
2. La partida y el récord se guardan en el navegador (localStorage) y se retoman al volver.
3. Sitio estático de un solo HTML + CSS + JS, servible desde cualquier origen estático con rutas relativas.
4. Diseño cuidado en móvil con 390 px como ancho de prueba, gestos fluidos y controles no nativos; textos en español.

## Fuera de alcance inicial

Tabla de puntajes en línea, cuentas, otros tamaños de tablero, temas visuales y sonido.

## Aceptación

Servir la carpeta con `python3 -m http.server 8080` (o abrir `index.html`) y completar movimientos por teclado, botones y gestos; verificar que el récord persiste al recargar; revisar 390 px y escritorio en la URL publicada.
