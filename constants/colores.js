export const colores = {
  verdePrincipal: "#3e6531", // barra superior, nav inferior, botones
  verdeOscuro: "#2C3E2D",    // títulos y botón secundario
  verdeClaro: "#C8D6C4",     // texto inactivo de la barra inferior
  crema: "#FAF8F3",          // fondo general
  blanco: "#FFFFFF",
  bordeSuave: "#E2E2D8",     // borde de las tarjetas
  campoFondo: "#e3e3dc",     // fondo de los inputs
  campoBorde: "#c5c6bf",     // borde de los inputs
  iconoGris: "#ccc",         // iconos dentro de los inputs
  textoOscuro: "#494949",    // títulos de las tarjetas
  textoSecundario: "#919191", // texto descriptivo de las tarjetas
  rojo: "#cc3636",           // acciones de eliminar
  switchInactivo: "#CCCCCC",
  switchActivo: "#7D9B76",
  placeholderClaro: "#777777",
  placeholderOscuro: "#AAAAAA",

  // Paleta complementaria unificada de theme
  naranja: "#E89B3C",
  naranjaClaro: "#F5B963",
  verde: "#4CAF50",
  gris: "#9E9E9E",
  sombra: "#000000",
};

// para el modo oscuro separo en paletas de colores
export const coloresTema = {
  claro: {
    fondo: "#FAF8F3",
    tarjeta: "#FFFFFF",
    texto: "#2C3E2D",
    campo: "#e3e3dc",
    borde: "#c5c6bf",
  },
  oscuro: {
    fondo: "#1E1E1E",
    tarjeta: "#333333",
    texto: "#FFFFFF",
    campo: "#333333",
    borde: "#555555",
  },
};

// Tokens COLORS unificados (sistema en inglés para compatibilidad directa)
export const COLORS = {
  primary: '#2D5016',
  primaryLight: '#5A7D2A',
  primaryDark: '#1F3810',

  orange: '#E89B3C',
  orangeLight: '#F5B963',

  cream: '#F5F1E8',
  white: '#FFFFFF',
  inputBg: '#E8E8E8',
  inputBorder: '#D0D0D0',

  // TEXTO
  textDark: '#1A1A1A',
  textGray: '#7A7A7A',
  textLight: '#FFFFFF',

  // ESTADOS
  red: '#D32F2F',
  redLight: '#F5D5D5',
  green: '#4CAF50',
  gray: '#9E9E9E',

  // BORDES
  border: '#E0E0E0',
  shadow: '#000000',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 50,
};

export const FONTS = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
};

// Aliases para máxima compatibilidad
export const colors = COLORS;
export default colores;