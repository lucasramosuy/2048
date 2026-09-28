# 2048

Un puzzle 2048 sencillo para [lucasramos.uy](https://lucasramos.uy/). Sitio estático sin dependencias, cuenta ni telemetría. Flechas, WASD, botones y gestos táctiles. La partida y el récord se guardan en el navegador.

## Probar

```sh
python3 -m http.server 8080
```

Abrí `http://localhost:8080/`. También funciona abriendo `index.html` directamente.

## Publicación

Está en vivo en https://lucasramos.uy/2048/: el Worker del dominio enruta el prefijo `/2048` a un origen estático con el contenido de la rama principal. Los archivos usan rutas relativas, así que la misma carpeta sirve tanto local como detrás del Worker.
