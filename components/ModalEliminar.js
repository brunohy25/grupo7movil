// components/ModalEliminar.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';

export default function ModalEliminar({ visible, producto, onCancel, onConfirm }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Barra naranja decorativa superior */}
          <View style={styles.topBar} />

          <Text style={styles.title}>Eliminar producto</Text>
          <Text style={styles.message}>
            ¿Estás seguro que deseas eliminar el producto seleccionado?
          </Text>

          {producto && (
            <Text style={styles.productName}>"{producto.nombre}"</Text>
          )}

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
              <Text style={styles.btnCancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnDelete} onPress={onConfirm}>
              <Text style={styles.btnDeleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    width: '100%',
    maxWidth: 400,
    paddingBottom: SPACING.lg,
    overflow: 'hidden',
  },
  topBar: {
    height: 6,
    backgroundColor: COLORS.orange,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  message: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  productName: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textGray,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  btnCancelText: {
    color: COLORS.textDark,
    fontWeight: '600',
    fontSize: FONTS.sizes.sm,
  },
  btnDelete: {
    flex: 1,
    backgroundColor: COLORS.red,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  btnDeleteText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
});