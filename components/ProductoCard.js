import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';

export default function ProductoCard({ producto, onVer, onEditar, onEliminar }) {
  return (
    <View style={styles.card}>
      {/* Fila superior: imagen + info + flecha */}
      <View style={styles.topRow}>
        <View style={styles.imageBox}>
          {producto.imagen ? (
            <Image source={{ uri: producto.imagen }} style={styles.image} />
          ) : (
            <Ionicons name="leaf" size={32} color={COLORS.primaryLight} />
          )}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.nombre} numberOfLines={1}>
            {producto.nombre}
          </Text>
          <Text style={styles.detalle} numberOfLines={1}>
            {producto.categoria} - {producto.presentacion}
          </Text>
          <Text style={styles.stock}>
            Stock: <Text style={styles.stockNumber}>{producto.stock} un.</Text>
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={22} color={COLORS.textGray} />
      </View>

      {/* Fila inferior: acciones */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={onVer}>
          <Ionicons name="eye-outline" size={18} color={COLORS.textDark} />
          <Text style={styles.actionText}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onEditar}>
          <Ionicons name="pencil" size={18} color={COLORS.textDark} />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onEliminar}>
          <Ionicons name="trash-outline" size={18} color={COLORS.red} />
          <Text style={[styles.actionText, { color: COLORS.red }]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBox: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoBox: {
    flex: 1,
  },
  nombre: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  detalle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textGray,
    marginBottom: 4,
  },
  stock: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
  },
  stockNumber: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  actionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
    marginLeft: 4,
    fontWeight: '500',
  },
});