//https://github.com/search?q=React+Native+ThemeProvider+useContext+useState&type=code ejemplos
import React, { createContext, useContext, useState } from "react";

const ContextoTema = createContext();

export function ProveedorTema({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const cambiarTema = (valor) => {
    setModoOscuro(valor);
  };

  return (
    <ContextoTema.Provider value={{ modoOscuro, cambiarTema }}>
      {children}
    </ContextoTema.Provider>
  );
}

export function usarTema() {
  return useContext(ContextoTema);
}
