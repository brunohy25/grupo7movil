import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import { mostrarAlerta } from '../contexto/ContextoAlerta';

const MENSAJE_ENLACE_ENVIADO =
  'Se ha enviado un enlace a su correo. Si su cuenta existe, recibirá las instrucciones para reestablecer su contraseña. Por favor, revise su bandeja de entrada y la casilla de spam.';

// Envía el enlace de recuperación. La respuesta es la misma exista o no la cuenta,
// para no revelar qué correos están registrados.
export default async function handleForgotPassword(correo, navigation) {
  try {
    await sendPasswordResetEmail(auth, correo.trim());
  } catch (error) {
    console.error('Error al enviar enlace al correo:', error.code, error.message);
    if (error.code === 'auth/network-request-failed') {
      mostrarAlerta('Error de conexión', 'No se pudo conectar con el servicio. Por favor, intente más tarde.');
      return;
    }
  }
  mostrarAlerta({
    titulo: 'Revise su correo',
    mensaje: MENSAJE_ENLACE_ENVIADO,
    textoConfirmar: 'Aceptar',
    onConfirmar: () => navigation.navigate('Login'),
  });
}
