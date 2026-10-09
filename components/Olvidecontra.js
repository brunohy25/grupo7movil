// components/ModalEditar.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export default function handleForgotPassword(resetemail, navigation) {
  sendPasswordResetEmail(auth, resetemail)
    .then(() => {
      alert("Si el correo existe, se enviará el enlace para restablecer su contraseña.");
      navigation.navigate('Login')
    })
    .catch((error) => {
      console.error("Error al enviar enlace al correo:", error.code, error.message);
    })
}