import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './navigation/Navigation';
import { ProveedorTema } from "./contexto/ContextoTema";

export default function App() {
  return (
    <ProveedorTema>
      <Navigation />
    </ProveedorTema>
  );
}
