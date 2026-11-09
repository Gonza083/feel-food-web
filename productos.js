/* =========================================================
   FEEL FOODS · Configuración de la tienda
   Este es el único archivo que hace falta tocar para
   cambiar precios, productos, textos o el número de WhatsApp.
   ========================================================= */

window.FF_CONFIG = {
  // Número de WhatsApp que recibe los pedidos (formato internacional, sin + ni espacios).
  // 549 + característica sin 0 + número sin 15.
  whatsapp: '5493456595975',
  whatsappVisible: '3456 59 59 75',
  instagram: 'FeelFoodsMarket',
  moneda: 'ARS',

  ciudad: 'Chajarí',
  provincia: 'Entre Ríos',
  // Pedido mínimo en pesos (0 = sin mínimo).
  pedidoMinimo: 15000,
  // Texto del envío que se muestra en la web y va en el mensaje de WhatsApp.
  envio: 'Envío gratis dentro de Chajarí',
  // Texto para quien está fuera de la ciudad (dejar '' para ocultarlo).
  envioOtras: 'Otras localidades: coordinamos el envío por WhatsApp',

  // Formas de pago: el cliente elige una en el carrito y va en el mensaje.
  pagos: ['Efectivo al recibir', 'Transferencia'],
  // Aclaración sobre el pago (el alias NO va en la web: se pasa por WhatsApp).
  pagoNota: 'Si elegís transferencia, te pasamos el alias por WhatsApp',

  // Texto opcional que aparece arriba de todo (dejar '' para ocultarlo).
  aviso: 'Envío gratis en Chajarí · Pedido mínimo $15.000',

  // Venta a comercios: localidades donde ya hay comercios con Feel Foods.
  comercios: ['Chajarí', 'Feliciano', 'San Pedro', 'Villa del Rosario'],

  // Sección "¿Quiénes somos?". Si el texto queda vacío, la sección no se muestra.
  // Cada elemento de la lista es un párrafo.
  nosotros: [
    'FeelFoods nació con una idea simple: acercar el sabor, la calidad y lo natural de los frutos secos a la mesa de todos los días.',
    'Somos de Chajarí, Entre Ríos. Elegimos almendras, nueces, castañas, avellanas y frutas secas, y las combinamos en mixes pensados para cada momento: para entrenar, para el trabajo, para compartir o simplemente para darte un gusto.',
    'Cada paquete lleva sus ingredientes a la vista, sin vueltas. Hoy nos encontrás en comercios de Chajarí, Feliciano, San Pedro y Villa del Rosario, y también podés pedirnos directo por WhatsApp para que te lo llevemos a tu casa.',
  ],
};

/* Íconos disponibles para ingredientes:
   nuez, almendra, caju, mani, pasa, banana, avellana, pistacho

   categoria: 'mix' (mixes) o 'suelto' (frutos secos sueltos)
   corto:     nombre que se ve en la etiqueta del dibujo del paquete (opcional)
   etiquetas: datos cortos que se muestran como chips (opcional, para los sueltos)
   presentaciones: [] (vacío) = el precio se muestra como "Consultar" y hay un botón para preguntar por WhatsApp */
window.FF_PRODUCTOS = [
  /* ---------------- MIXES ---------------- */
  {
    id: 'premium',
    categoria: 'mix',
    nombre: 'Mix Premium',
    color: '#7B481A',
    bajada: 'Solo frutos secos nobles. Sin agregados, sin vueltas.',
    ingredientes: [
      ['Nueces', 'nuez'], ['Avellanas', 'avellana'], ['Almendras', 'almendra'],
      ['Castañas de cajú', 'caju'],
    ],
    conMani: false,
    presentaciones: [
      { peso: '250 g', precio: 8200 },
      { peso: '500 g', precio: 16000 },
      { peso: '1 kg', precio: 32000 },
    ],
    foto: 'img/premium.webp', // foto del producto (si queda '', se muestra un dibujo del paquete)
  },
  {
    id: 'premium-mani',
    categoria: 'mix',
    nombre: 'Mix Premium c/ maní',
    color: '#87581E',
    bajada: 'La selección Premium con maní tostado sin sal.',
    ingredientes: [
      ['Nueces', 'nuez'], ['Avellanas', 'avellana'], ['Almendras', 'almendra'],
      ['Castañas de cajú', 'caju'], ['Maní tostado s/sal', 'mani'],
    ],
    conMani: true,
    presentaciones: [
      { peso: '250 g', precio: 6100 },
      { peso: '500 g', precio: 11800 },
      { peso: '1 kg', precio: 23000 },
    ],
    foto: 'img/premium-mani.webp',
  },
  {
    id: 'deporte',
    categoria: 'mix',
    nombre: 'Mix Deporte',
    color: '#974744',
    bajada: 'Energía rápida para antes o después de entrenar.',
    ingredientes: [
      ['Nueces', 'nuez'], ['Almendras', 'almendra'], ['Castañas de cajú', 'caju'],
      ['Maní tostado s/sal', 'mani'], ['Banana glaseada', 'banana'],
    ],
    conMani: true,
    presentaciones: [
      { peso: '250 g', precio: 5900 },
      { peso: '500 g', precio: 11100 },
      { peso: '1 kg', precio: 21700 },
    ],
    foto: 'img/deporte.webp',
  },
  {
    id: 'europeo',
    categoria: 'mix',
    nombre: 'Mix Europeo',
    color: '#418964',
    bajada: 'El clásico equilibrado: frutos secos y el dulzor de la pasa.',
    ingredientes: [
      ['Nueces', 'nuez'], ['Almendras', 'almendra'], ['Castañas de cajú', 'caju'],
      ['Pasas de uva', 'pasa'],
    ],
    conMani: false,
    presentaciones: [
      { peso: '250 g', precio: 5800 },
      { peso: '500 g', precio: 10900 },
      { peso: '1 kg', precio: 21500 },
    ],
    foto: 'img/europeo.webp',
  },
  {
    id: 'europeo-mani',
    categoria: 'mix',
    nombre: 'Mix Europeo c/ maní',
    color: '#54BB70',
    bajada: 'Nuestro Europeo, con el toque crocante del maní tostado.',
    ingredientes: [
      ['Nueces', 'nuez'], ['Almendras', 'almendra'], ['Castañas de cajú', 'caju'],
      ['Maní tostado s/sal', 'mani'], ['Pasas de uva', 'pasa'],
    ],
    conMani: true,
    presentaciones: [
      { peso: '250 g', precio: 5000 },
      { peso: '500 g', precio: 9900 },
      { peso: '1 kg', precio: 18500 },
    ],
    foto: 'img/europeo-mani.webp',
  },

  /* ---------------- FRUTOS SECOS SUELTOS ---------------- */
  {
    id: 'almendras',
    categoria: 'suelto',
    nombre: 'Almendras',
    color: '#9A6236',
    bajada: 'Sabor delicado y textura crocante.',
    ingredientes: [['Almendras', 'almendra']],
    conMani: false,
    presentaciones: [
      { peso: '500 g', precio: 17500 },
      { peso: '1 kg', precio: 33000 },
    ],
    foto: 'img/almendras.webp',
  },
  {
    id: 'nueces',
    categoria: 'suelto',
    nombre: 'Nueces cuartos',
    corto: 'Nueces',
    color: '#7E5A34',
    bajada: 'Un ingrediente versátil para disfrutar y crear.',
    ingredientes: [['Nueces', 'nuez']],
    etiquetas: ['En cuartos'],
    conMani: false,
    presentaciones: [
      { peso: '500 g', precio: 12000 },
      { peso: '1 kg', precio: 23000 },
    ],
    foto: 'img/nueces.webp',
  },
  {
    id: 'avellanas',
    categoria: 'suelto',
    nombre: 'Avellanas',
    color: '#8B4E2B',
    bajada: 'Pequeñas, aromáticas y llenas de personalidad.',
    ingredientes: [['Avellanas', 'avellana']],
    conMani: false,
    presentaciones: [
      { peso: '250 g', precio: 13000 },
      { peso: '500 g', precio: 25700 },
      { peso: '1 kg', precio: 49000 },
    ],
    foto: 'img/avellanas.webp',
  },
  {
    id: 'caju',
    categoria: 'suelto',
    nombre: 'Castañas de cajú',
    corto: 'Cajú',
    color: '#A57B3C',
    bajada: 'Suavidad y sabor en cada bocado.',
    ingredientes: [['Castañas de cajú', 'caju']],
    conMani: false,
    presentaciones: [
      { peso: '500 g', precio: 10000 },
      { peso: '1 kg', precio: 20500 },
    ],
    foto: 'img/caju.webp',
  },
  {
    id: 'mani',
    categoria: 'suelto',
    nombre: 'Maní',
    color: '#A9793F',
    bajada: 'El sabor de un clásico que siempre acompaña.',
    ingredientes: [['Maní', 'mani']],
    conMani: true,
    presentaciones: [
      { peso: '500 g', precio: 3500 },
      { peso: '1 kg', precio: 6000 },
    ],
    foto: 'img/mani.webp',
  },
  {
    id: 'banana',
    categoria: 'suelto',
    nombre: 'Banana glaseada',
    corto: 'Banana',
    color: '#B5831C',
    bajada: 'Un toque dulce que conquista desde el primer bocado.',
    ingredientes: [['Banana glaseada', 'banana']],
    conMani: false,
    presentaciones: [
      { peso: '500 g', precio: 8000 },
      { peso: '1 kg', precio: 15000 },
    ],
    foto: 'img/banana.webp',
  },
  {
    id: 'pasas',
    categoria: 'suelto',
    nombre: 'Pasas',
    color: '#6B2F45',
    bajada: 'Dulces, suaves y naturalmente deliciosas.',
    ingredientes: [['Pasas de uva', 'pasa']],
    conMani: false,
    presentaciones: [
      { peso: '500 g', precio: 4800 },
      { peso: '1 kg', precio: 8800 },
    ],
    foto: 'img/pasas.webp',
  },
  {
    id: 'pistacho',
    categoria: 'suelto',
    nombre: 'Pistacho',
    color: '#5E7F34',
    bajada: 'Un sabor único para disfrutar sin apuro.',
    ingredientes: [['Pistacho', 'pistacho']],
    etiquetas: ['Con cáscara', 'Salado'],
    conMani: false,
    presentaciones: [
      { peso: '1 kg', precio: 51500 },
    ],
    foto: 'img/pistacho.webp',
  },
];
