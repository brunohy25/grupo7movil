// components/ModalEditar.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export default function handleForgotPassword(resetemail) {
  sendPasswordResetEmail(auth, resetemail)
    .then(() => {
      alert("Password reset email sent! Check your inbox.");
      navigation.navigate('Login')
    })
    .catch((error) => {
      console.error("Error sending reset email:", error.code, error.message);
    })
}