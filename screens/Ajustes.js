import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { auth } from "../src/config/firebaseConfig";
import { sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { colores } from "../constants/colores";
import { estilos, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BarraNavegaciónInferior from "../components/BarraNavegaciónInferior";
import ModalAlerta from "../components/ModalAlerta";

export default function Ajustes({ navigation }) {
  const usuario = auth.currentUser;
  const { modoOscuro, cambiarTema } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const insets = useSafeAreaInsets();

  const [notificaciones, setNotificaciones] = useState(true);
  const [modalTerminos, setModalTerminos] = useState(false);
  const [modalAyuda, setModalAyuda] = useState(false);

  // Estados de popups personalizados
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
    boton: "Cerrar",
  });

  // 1. Cambiar contraseña
  const handleCambiarContrasena = () => {
    if (!usuario?.email) {
      setModalInfo({
        visible: true,
        titulo: "Atención",
        mensaje: "No se encontró el correo del usuario.",
        boton: "Entendido",
      });
      return;
    }
    setModalPasswordVisible(true);
  };

  const confirmarCambioContrasena = async () => {
    setModalPasswordVisible(false);
    try {
      await sendPasswordResetEmail(auth, usuario.email);
      setModalInfo({
        visible: true,
        titulo: "Correo enviado",
        mensaje: "Revisá tu bandeja de entrada o spam para crear una nueva contraseña.",
        boton: "Entendido",
      });
    } catch (error) {
      setModalInfo({
        visible: true,
        titulo: "Error",
        mensaje: "No se pudo enviar el correo de recuperación.",
        boton: "Cerrar",
      });
    }
  };

  // 2. Eliminar cuenta
  const handleEliminarCuenta = () => {
    setModalEliminarVisible(true);
  };

  const confirmarEliminarCuenta = async () => {
    setModalEliminarVisible(false);
    try {
      if (usuario) {
        await deleteUser(usuario);
        setModalInfo({
          visible: true,
          titulo: "Cuenta eliminada",
          mensaje: "Tu cuenta ha sido eliminada con éxito.",
          boton: "Entendido",
        });
      }
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setModalInfo({
          visible: true,
          titulo: "Seguridad",
          mensaje: "Por motivos de seguridad, debes volver a iniciar sesión antes de eliminar la cuenta.",
          boton: "Entendido",
        });
      } else {
        setModalInfo({
          visible: true,
          titulo: "Error",
          mensaje: "No se pudo eliminar la cuenta. Intenta más tarde.",
          boton: "Cerrar",
        });
      }
    }
  };

  // 3. Abrir enlaces de contacto
  const abrirEnlace = async (url) => {
    try {
      const soportado = await Linking.canOpenURL(url);
      if (soportado) {
        await Linking.openURL(url);
      } else {
        setModalInfo({
          visible: true,
          titulo: "Atención",
          mensaje: "No se pudo abrir la aplicación requerida.",
          boton: "Cerrar",
        });
      }
    } catch (error) {
      setModalInfo({
        visible: true,
        titulo: "Error",
        mensaje: "Ocurrió un problema al abrir el enlace.",
        boton: "Cerrar",
      });
    }
  };

  return (
    <View style={[estilos.contenedorVerde, { paddingTop: insets.top }]}>
      {/* Encabezado */}
      <View style={[estilos.encabezado, estilos.encabezadoAjustes]}>
        <Text style={[estilos.titulo, estilos.tituloAjustes]}>Ajustes</Text>
      </View>

      <ScrollView
        style={[tema.fondo, estilos.bordeRedondeadoAbajo]}
        contentContainerStyle={[estilos.contenido, estilos.contenidoAjustes]}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= SECCIÓN: APARIENCIA ================= */}
        <Text style={[estilos.subtitulo, tema.texto]}>Apariencia</Text>

        <View style={[estilos.opcion, tema.tarjetaAjustes]}>
          <View style={estilos.informacion}>
            <Ionicons name="moon-outline" size={22} color={tema.texto.color} />
            <Text style={[estilos.texto, tema.texto]}>Modo oscuro</Text>
          </View>
          <Switch
            value={modoOscuro}
            onValueChange={cambiarTema}
            trackColor={{ false: colores.switchInactivo, true: colores.switchActivo }}
            thumbColor={colores.blanco}
          />
        </View>

        {/* Separador */}
        <View style={[estilos.divisorSeccion, tema.divisor]} />

        {/* ================= SECCIÓN: NOTIFICACIONES ================= */}
        <Text style={[estilos.subtitulo, tema.texto]}>Notificaciones</Text>

        <View style={[estilos.opcion, tema.tarjetaAjustes]}>
          <View style={estilos.informacion}>
            <Ionicons name="notifications-outline" size={22} color={tema.texto.color} />
            <Text style={[estilos.texto, tema.texto]}>Notificaciones push</Text>
          </View>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            trackColor={{ false: colores.switchInactivo, true: colores.switchActivo }}
            thumbColor={colores.blanco}
          />
        </View>

        {/* Separador */}
        <View style={[estilos.divisorSeccion, tema.divisor]} />

        {/* ================= SECCIÓN: PRIVACIDAD Y SEGURIDAD ================= */}
        <Text style={[estilos.subtitulo, tema.texto]}>Privacidad y Seguridad</Text>

        <TouchableOpacity
          style={[estilos.opcion, tema.tarjetaAjustes]}
          onPress={handleCambiarContrasena}
          activeOpacity={0.7}
        >
          <View style={estilos.informacion}>
            <Ionicons name="key-outline" size={22} color={tema.texto.color} />
            <Text style={[estilos.texto, tema.texto]}>Cambiar contraseña</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colores.placeholderClaro} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.opcion, tema.tarjetaAjustes]}
          onPress={() => setModalTerminos(true)}
          activeOpacity={0.7}
        >
          <View style={estilos.informacion}>
            <Ionicons name="document-text-outline" size={22} color={tema.texto.color} />
            <Text style={[estilos.texto, tema.texto]}>Términos y condiciones</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colores.placeholderClaro} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.opcion, tema.tarjetaAjustes]}
          onPress={handleEliminarCuenta}
          activeOpacity={0.7}
        >
          <View style={estilos.informacion}>
            <Ionicons name="trash-outline" size={22} color={colores.rojo} />
            <Text style={[estilos.texto, estilos.textoPeligro]}>Eliminar cuenta</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colores.rojo} />
        </TouchableOpacity>

        {/* Separador */}
        <View style={[estilos.divisorSeccion, tema.divisor]} />

        {/* ================= SECCIÓN: AYUDA Y SOPORTE ================= */}
        <Text style={[estilos.subtitulo, tema.texto]}>Ayuda y Soporte</Text>

        <TouchableOpacity
          style={[estilos.opcion, tema.tarjetaAjustes]}
          onPress={() => setModalAyuda(true)}
          activeOpacity={0.7}
        >
          <View style={estilos.informacion}>
            <Ionicons name="help-circle-outline" size={22} color={tema.texto.color} />
            <Text style={[estilos.texto, tema.texto]}>Preguntas frecuentes y contacto</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colores.placeholderClaro} />
        </TouchableOpacity>
      </ScrollView>

      {/* ================= MODAL: TÉRMINOS Y CONDICIONES ================= */}
      <Modal visible={modalTerminos} animationType="fade" transparent={true}>
        <View style={estilos.modalFondo}>
          <View style={[estilos.modalCard, tema.tarjeta]}>
            <View style={estilos.modalHeader}>
              <Text style={[estilos.modalTitulo, tema.texto]}>Términos y Condiciones</Text>
              <TouchableOpacity onPress={() => setModalTerminos(false)}>
                <Ionicons name="close" size={24} color={tema.texto.color} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[estilos.parrafoTerminos, tema.texto]}>
                Bienvenido a <Text style={estilos.textoNegrita}>Sabor Andino S.R.L.</Text> Al utilizar nuestra aplicación, aceptas las siguientes condiciones de uso:
              </Text>

              <Text style={[estilos.preguntaFaq, tema.texto]}>1. Uso de la cuenta</Text>
              <Text style={[estilos.respuestaFaq, tema.texto]}>
                El usuario es el único responsable de la confidencialidad de sus credenciales y de todas las transacciones realizadas desde su perfil.
              </Text>

              <Text style={[estilos.preguntaFaq, tema.texto]}>2. Gestión de pedidos y stock</Text>
              <Text style={[estilos.respuestaFaq, tema.texto]}>
                Los precios, disponibilidad y tiempos de entrega de especias y condimentos regionales están sujetos a stock y confirmación del depósito.
              </Text>

              <Text style={[estilos.preguntaFaq, tema.texto]}>3. Privacidad de datos</Text>
              <Text style={[estilos.respuestaFaq, tema.texto]}>
                Tus datos de contacto y entrega son resguardados de forma confidencial y solo se emplean para la logística interna de distribución.
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={estilos.modalBoton}
              onPress={() => setModalTerminos(false)}
            >
              <Text style={estilos.textoBoton}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: AYUDA Y SOPORTE ================= */}
      <Modal visible={modalAyuda} animationType="fade" transparent={true}>
        <View style={estilos.modalFondo}>
          <View style={[estilos.modalCard, tema.tarjeta]}>
            <View style={estilos.modalHeader}>
              <Text style={[estilos.modalTitulo, tema.texto]}>Ayuda y Soporte</Text>
              <TouchableOpacity onPress={() => setModalAyuda(false)}>
                <Ionicons name="close" size={24} color={tema.texto.color} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Canales de contacto */}
              <Text style={[estilos.subtituloModal, tema.texto]}>
                Canales de Atención Directa
              </Text>

              <TouchableOpacity
                style={[estilos.filaContacto, tema.tarjetaAjustes]}
                onPress={() =>
                  abrirEnlace("https://wa.me/5493875551234?text=Hola,%20necesito%20ayuda%20con%20la%20app%20Sabor%20Andino")
                }
              >
                <FontAwesome name="whatsapp" size={22} color={colores.whatsapp} />
                <Text style={[estilos.textoContacto, tema.texto]}>WhatsApp: +54 9 387 555-1234</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[estilos.filaContacto, tema.tarjetaAjustes]}
                onPress={() => abrirEnlace("mailto:soporte@saborandino.com?subject=Consulta%20desde%20la%20App")}
              >
                <Ionicons name="mail-outline" size={22} color={colores.verdePrincipal} />
                <Text style={[estilos.textoContacto, tema.texto]}>soporte@saborandino.com</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[estilos.filaContacto, tema.tarjetaAjustes]}
                onPress={() => abrirEnlace("tel:+543874998877")}
              >
                <Ionicons name="call-outline" size={22} color={colores.verdePrincipal} />
                <Text style={[estilos.textoContacto, tema.texto]}>Tel: (0387) 499-8877</Text>
              </TouchableOpacity>

              {/* Preguntas frecuentes */}
              <Text style={[estilos.subtituloModalSecundario, tema.texto]}>
                Preguntas Frecuentes
              </Text>

              <View style={estilos.itemFaq}>
                <Text style={[estilos.preguntaFaq, tema.texto]}>¿Cómo realizo un pedido?</Text>
                <Text style={[estilos.respuestaFaq, tema.texto]}>
                  Ingresá a la sección "Productos", elegí la especia o condimento deseado y presioná en agregar al pedido.
                </Text>
              </View>

              <View style={estilos.itemFaq}>
                <Text style={[estilos.preguntaFaq, tema.texto]}>¿Cómo cancelo o edito una entrega?</Text>
                <Text style={[estilos.respuestaFaq, tema.texto]}>
                  Comunicate inmediatamente con administración vía WhatsApp antes de que el transporte inicie su recorrido.
                </Text>
              </View>

              <View style={estilos.itemFaqUltimo}>
                <Text style={[estilos.preguntaFaq, tema.texto]}>¿Cómo cambio mi correo o teléfono?</Text>
                <Text style={[estilos.respuestaFaq, tema.texto]}>
                  Podés editar tus datos en la pestaña "Mi Perfil" en la barra inferior.
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={estilos.modalBoton}
              onPress={() => setModalAyuda(false)}
            >
              <Text style={estilos.textoBoton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODALES DE ALERTA PERSONALIZADOS (ESTILO IMAGE 1) ================= */}
      {/* Modal Cambiar Contraseña */}
      <ModalAlerta
        visible={modalPasswordVisible}
        titulo="Cambiar contraseña"
        mensaje={`¿Deseas enviar un correo a ${usuario?.email || "tu correo"} para restablecer tu contraseña?`}
        textoConfirmar="Enviar correo"
        onConfirmar={confirmarCambioContrasena}
        textoCancelar="Cancelar"
        onCancelar={() => setModalPasswordVisible(false)}
      />

      {/* Modal Eliminar Cuenta (con botón en rojo) */}
      <ModalAlerta
        visible={modalEliminarVisible}
        titulo="Eliminar cuenta"
        mensaje="Esta acción es irreversible y se perderán todos tus datos asociados. ¿Estás seguro?"
        textoConfirmar="Eliminar definitivamente"
        onConfirmar={confirmarEliminarCuenta}
        textoCancelar="Cancelar"
        onCancelar={() => setModalEliminarVisible(false)}
        esPeligro={true}
        botonesVerticales={true}
      />

      {/* Modal de información / feedback / errores */}
      <ModalAlerta
        visible={modalInfo.visible}
        titulo={modalInfo.titulo}
        mensaje={modalInfo.mensaje}
        textoConfirmar={modalInfo.boton || "Cerrar"}
        onConfirmar={() => setModalInfo({ visible: false, titulo: "", mensaje: "", boton: "Cerrar" })}
      />

      {/* Barra de navegación inferior */}
      <BarraNavegaciónInferior navigation={navigation} />
    </View>
  );
}
