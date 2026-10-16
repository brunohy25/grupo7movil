import React, { createContext, useContext, useState } from "react";
import ModalAlerta from "../components/ModalAlerta";

const ContextoAlerta = createContext();

let referenciaAlerta = null;

export function ProveedorAlerta({ children }) {
  const [alerta, setAlerta] = useState({
    visible: false,
    titulo: "",
    mensaje: "",
    textoConfirmar: "Cerrar",
    onConfirmar: null,
    textoCancelar: null,
    onCancelar: null,
    esPeligro: false,
    botonesVerticales: false,
  });

  const abrirAlerta = (tituloOConfig, mensajeOpcional, botonesOpcionales) => {
    let config = {};

    if (typeof tituloOConfig === "object" && tituloOConfig !== null) {
      config = { ...tituloOConfig };
    } else {
      config.titulo = tituloOConfig || "";
      config.mensaje = mensajeOpcional || "";

      if (Array.isArray(botonesOpcionales) && botonesOpcionales.length > 0) {
        if (botonesOpcionales.length === 1) {
          config.textoConfirmar = botonesOpcionales[0].text || "Aceptar";
          config.onConfirmar = botonesOpcionales[0].onPress;
        } else if (botonesOpcionales.length >= 2) {
          const botonCancelar = botonesOpcionales.find(b => b.style === "cancel") || botonesOpcionales[0];
          const botonConfirmar = botonesOpcionales.find(b => b !== botonCancelar) || botonesOpcionales[1];

          config.textoCancelar = botonCancelar.text || "Cancelar";
          config.onCancelar = botonCancelar.onPress;
          config.textoConfirmar = botonConfirmar.text || "Aceptar";
          config.onConfirmar = botonConfirmar.onPress;
          config.esPeligro = botonConfirmar.style === "destructive";
        }
      }
    }

    setAlerta({
      visible: true,
      titulo: config.titulo || "",
      mensaje: config.mensaje || "",
      textoConfirmar: config.textoConfirmar || "Cerrar",
      onConfirmar: () => {
        setAlerta(prev => ({ ...prev, visible: false }));
        if (typeof config.onConfirmar === "function") {
          config.onConfirmar();
        }
      },
      textoCancelar: config.textoCancelar || null,
      onCancelar: () => {
        setAlerta(prev => ({ ...prev, visible: false }));
        if (typeof config.onCancelar === "function") {
          config.onCancelar();
        }
      },
      esPeligro: !!config.esPeligro,
      botonesVerticales: !!config.botonesVerticales,
    });
  };

  const cerrarAlerta = () => {
    setAlerta(prev => ({ ...prev, visible: false }));
  };

  referenciaAlerta = abrirAlerta;

  return (
    <ContextoAlerta.Provider value={{ mostrarAlerta: abrirAlerta, cerrarAlerta }}>
      {children}
      <ModalAlerta
        visible={alerta.visible}
        titulo={alerta.titulo}
        mensaje={alerta.mensaje}
        textoConfirmar={alerta.textoConfirmar}
        onConfirmar={alerta.onConfirmar}
        textoCancelar={alerta.textoCancelar}
        onCancelar={alerta.onCancelar}
        esPeligro={alerta.esPeligro}
        botonesVerticales={alerta.botonesVerticales}
      />
    </ContextoAlerta.Provider>
  );
}

export function usarAlerta() {
  return useContext(ContextoAlerta);
}

// Permite disparar la alerta global desde cualquier componente o funcion sin duplicar modales
export function mostrarAlerta(tituloOConfig, mensaje, botones) {
  if (referenciaAlerta) {
    referenciaAlerta(tituloOConfig, mensaje, botones);
  } else {
    console.warn("ProveedorAlerta no inicializado aún.");
  }
}
