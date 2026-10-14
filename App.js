import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-gesture-handler';
import Navigation from './navigation/Navigation';
import { ProveedorTema } from "./contexto/ContextoTema";
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, []);

  return (
    <ProveedorTema>
      <Navigation />
    </ProveedorTema>
  );
}
