// Validaciones compartidas de los formularios (registro, recuperación y perfil)

// Solo letras (incluye acentos y ñ) y espacios; el + exige al menos un carácter
export const REGEX_NOMBRE = /^[a-zA-Z\sñÑÀ-ſ]+$/;
export const REGEX_CORREO = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Equivale a /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/ separada por regla para la lista en vivo
export const REGLAS_CONTRASENA = [
  { texto: 'Mínimo 6 caracteres', cumple: (c) => c.length >= 6 },
  { texto: 'Una mayúscula', cumple: (c) => /[A-Z]/.test(c) },
  { texto: 'Una minúscula', cumple: (c) => /[a-z]/.test(c) },
  { texto: 'Un número', cumple: (c) => /[0-9]/.test(c) },
];

export const MENSAJE_NOMBRE_INVALIDO = 'Este campo solo puede contener letras y espacios';
