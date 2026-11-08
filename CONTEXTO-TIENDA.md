# Feel Foods – Tienda web · Contexto

Última actualización: 7 de noviembre de 2026

## Qué es
Una web estática para mostrar los productos de Feel Foods, armar un carrito y mandar el pedido por WhatsApp. No usa servidor ni base de datos y no tiene pagos online: el pedido llega como un mensaje de WhatsApp ya escrito.

- **La mayoría de los clientes la van a usar desde el celular**, así que todo se diseña y se prueba primero para el celular.
- Para verla: doble clic en `tienda/index.html`.
- Para publicarla: arrastrar la carpeta `tienda/` a app.netlify.com, en "Deploy manually". Todavía no está publicada.
- El estilo buscado es **premium y atractivo**: verde oscuro de la marca, crema y naranja, con títulos en una fuente con serifa elegante.

## Datos del negocio (confirmados por el dueño el 6/11/2026)
- WhatsApp de pedidos: **3456 59 59 75** (`5493456595975`). Ojo: es distinto al de las etiquetas (3456 59 20 37).
- Están en **Chajarí, Entre Ríos**.
- **Envío gratis dentro de la ciudad. No hay retiro.** Todavía no se sabe qué pasa con los pedidos de otras localidades.
- **Pedido mínimo: $25.000.** Mientras no se llega al mínimo, la web no deja enviar el pedido.
- **Venden por mayor**, con otra lista para comercios (no la pasó). Los comercios donde más venden están en Chajarí, Feliciano, San Pedro y Villa del Rosario.

## Productos y precios (cargados el 6/11/2026)
| Producto | 250 g | 500 g | 1 kg |
|---|---|---|---|
| Mix Premium | 8.200 | 16.000 | 32.000 |
| Mix Premium c/ maní | 6.100 | 11.800 | 23.000 |
| Mix Deporte | 5.900 | 11.100 | 21.700 |
| Mix Europeo | 5.800 | 10.900 | 21.500 |
| Mix Europeo c/ maní | 5.000 | 9.900 | 18.500 |
| Almendras | – | 17.500 | 33.000 |
| Nueces cuartos | – | 12.000 | 23.000 |
| Castañas de cajú | – | 10.000 | 20.500 |
| Banana glaseada | – | 8.000 | 15.000 |
| Pasas | – | 4.800 | 8.800 |
| Pistacho con cáscara salado | – | – | 51.500 |
| Avellanas | – | Consultar | Consultar |
| Maní | – | Consultar | Consultar |

- Los precios por kilo de los mixes llegaron después del texto sobre la venta mayorista. Se tomaron como precios al público porque siguen la misma escala que los de 250 g y 500 g, pero **hay que confirmarlo con el dueño**.

- **Avellanas y maní** se venden sueltos, pero el dueño todavía no pasó los precios. Tienen `presentaciones: []`: la tarjeta muestra "Precio: Consultar" y un botón que abre WhatsApp con "Quiero consultar el precio de: …". No se pueden agregar al carrito. Cuando lleguen los precios, se cargan las presentaciones y la tarjeta pasa a funcionar como las demás. Las presentaciones (500 g y 1 kg) también están por confirmar.

## Archivos (`tienda/`)
| Archivo | Qué hace |
|---|---|
| `productos.js` | **Lo único que hace falta tocar.** WhatsApp, Instagram, ciudad, pedido mínimo, texto del envío, aviso de arriba, localidades de los comercios, texto de "¿Quiénes somos?" y la lista de productos. Cada producto tiene `categoria` (`mix` o `suelto`), `nombre`, `corto` (el nombre que va en la etiqueta del dibujo), `color`, `bajada`, `ingredientes`, `etiquetas` (chips para los productos sueltos), `conMani`, `presentaciones`, `destacado` y `foto`. |
| `index.html` | Estructura: portada, beneficios, productos (Mixes y Frutos secos sueltos), cómo pedir y condiciones, ¿Quiénes somos? (oculta mientras no haya texto), comercios, pie de página, carrito y barra fija para celular. |
| `styles.css` | Diseño completo. Al final están los ajustes para celular y los estilos de las secciones nuevas. |
| `app.js` | Dibujos en SVG de los paquetes y de los frutos secos (incluido el pistacho), tarjetas, filtros, carrito, pedido mínimo, validación y armado del mensaje para `wa.me`. |
| `img/logo.svg` | Logo vectorial, sacado de `web/assets.js`, el editor de etiquetas. |
| `fonts/` | Poppins Light, Regular y SemiBold, la misma fuente de las etiquetas. |

## Diseño
- Colores: verde `#054523` (oscuro `#03331a` / `#021f10`), naranja `#f9a12d` (el de la hojita del logo), verde claro `#54bb70` y fondo crema `#f7f2e8`.
- Fuentes: **Fraunces** para los títulos (viene de Google Fonts, así que necesita internet; si no carga, usa Georgia) y **Poppins** para el texto, guardada en la carpeta.
- Cada mix usa el color de su píldora en la etiqueta: Deporte `#974744`, Europeo `#418964`, Europeo c/ maní `#54BB70`, Premium `#7B481A` y Premium c/ maní `#87581E`. Los colores de los productos sueltos los elegí yo, en tonos tierra.
- **Fotos (6/11/2026):** los 5 mixes tienen foto: `img/premium.webp`, `premium-mani`, `deporte`, `europeo` y `europeo-mani`. Las generó el dueño con Gemini; los originales `.jfif` están en `tienda/imagenes prueba/`. Se pasaron a WebP de 900 px, unos 30 KB cada una. En las tarjetas usan `mix-blend-mode: multiply`, así el fondo blanco toma el color del producto. Se usan también en la portada (3 recuadros blancos inclinados) y en el carrito.
- **Fotos de los sueltos (7/11/2026):** almendras, nueces, cajú, banana, pasas, avellanas y maní tienen foto en bowl de madera con fondo blanco, generada con Gemini a partir de fotos de referencia (originales en `tienda/imagenes prueba/las que faltan/`). En las tarjetas se muestran sin recortar (`object-fit: contain`). **Falta la del pistacho**, que sigue con el dibujo del doypack.
- Las fotos son de IA y tienen detalles que no coinciden con la realidad: los códigos de barras no son los reales y en una dice "280gr". Conviene reemplazarlas más adelante por fotos reales.
- Filtros: Todos, Mixes, Frutos secos y Sin maní.

## Cómo funciona el pedido
1. El cliente elige la presentación y la cantidad, y toca "Agregar".
2. El carrito se abre desde el botón de arriba o desde la barra fija de abajo en el celular. Ahí se cambian cantidades o se quitan productos. Una barra muestra cuánto falta para el pedido mínimo, y el botón de enviar queda desactivado hasta llegar.
3. Completa su nombre y la dirección de entrega, las dos obligatorias, y puede dejar comentarios.
4. "Enviar pedido por WhatsApp" abre `wa.me/5493456595975` con el mensaje armado:
   ```
   ¡Hola Feel Foods! Quiero hacer este pedido:
   • 1 × Mix Deporte (250 g) — $5.900
   • 1 × Mix Premium (1 kg) — $32.000
   *Total estimado: $37.900*
   Nombre: …
   Dirección de entrega: …
   Envío: gratis dentro de Chajarí
   Comentarios: …
   ```
- El botón de la sección Comercios abre WhatsApp con el mensaje "Tengo un comercio y quiero recibir la lista de precios mayorista".
- El carrito y los datos del cliente quedan guardados en el navegador (`localStorage`: `ff-carrito-v1` y `ff-cliente-v1`).

## Pruebas (6/11/2026)
- Se probó en Edge headless dentro de un marco de 390 px, porque Edge headless no achica la ventana a menos de unos 500 px y las capturas directas salen recortadas.
- Se probaron el pedido mínimo (bloquea por debajo de $25.000), la validación de nombre y dirección, el mensaje de WhatsApp y los filtros.

## ⚠️ Antes de publicar
- Las descripciones de los productos y los textos de la portada los escribí yo. Hay que confirmarlos.
- "El favorito" sigue en el Mix Premium sin que el dueño lo haya confirmado.

## Lo que falta que pase el dueño
1. **Formas de pago.**
2. **El texto completo de "¿Quiénes somos?".** Llegó cortado ("…acercar el sabor, l"). Cuando llegue, va en `nosotros` dentro de `productos.js`, un párrafo por elemento, y la sección aparece sola.
3. **Pedidos de otras localidades** (Feliciano, San Pedro, Villa del Rosario, etc.): ¿se envían? ¿Con qué costo?
4. Confirmar que los precios por kilo de los mixes son al público y no mayoristas.
5. Confirmar los ingredientes de cada mix. Salen de las etiquetas.
6. Foto del pistacho, con el mismo estilo de bowl que los demás sueltos. Precios y presentaciones de avellanas y maní.
7. Qué producto destacar.
8. Opcional: datos confirmados para destacar (sin TACC, vegano, sin conservantes, duración), información nutricional y 2 o 3 opiniones reales.
9. Más adelante: dominio propio o el gratuito de Netlify. Con la dirección definitiva se puede agregar la imagen de vista previa para cuando se comparte el link, que necesita una dirección completa.

## Cuando llegue la información
- Precios, productos, WhatsApp, mínimo, envío y "Nosotros": editar `productos.js`.
- Fotos: guardarlas en `tienda/img/`, comprimidas para web (unos 1200 px de ancho, en .jpg o .webp), y cargar la ruta en `foto`.
- Formas de pago: mostrarlas en las condiciones de "Cómo pedir" (`#terms`, se arman en `app.js`) y en el carrito.
- Antes de publicar, volver a probar en el celular y hacer un pedido de prueba real a WhatsApp.
