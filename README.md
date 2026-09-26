# 2048

Un puzzle 2048 sencillo para [lucasramos.uy](https://lucasramos.uy/). Sitio estático sin dependencias, cuenta ni telemetría. Flechas, WASD, botones y gestos táctiles. La partida y el récord se guardan en el navegador.

## Probar

```sh
python3 -m http.server 8080
```

Abrí `http://localhost:8080/`. También funciona abriendo `index.html` directamente.

## Publicación

Este PR entrega el juego, pero no cambia producción. Para publicarlo bajo una ruta del dominio, conectá la rama principal a un origen estático y agregá una ruta específica en el Worker **antes** de la ruta más amplia que pudiera interceptarla. Los archivos usan rutas relativas. Verificá juego, teclado, gestos y diseño móvil en la URL final.
