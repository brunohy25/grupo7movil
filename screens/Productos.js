// screens/Productos.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';
import { PRODUCTOS_MOCK } from '../data/ProductosMock';
import ProductoCard from '../components/ProductoCard';
import ModalEditar from '../components/ModalEditar';
import ModalDetalle from '../components/ModalDetalle';
import ModalEliminar from '../components/ModalEliminar';

export default function Productos({ navigation, route }) {
  const [productos, setProductos] = useState(PRODUCTOS_MOCK);
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState(false);

  const [modalEditar, setModalEditar] = useState({ visible: false, producto: null });
  const [modalDetalle, setModalDetalle] = useState({ visible: false, producto: null });
  const [modalEliminar, setModalEliminar] = useState({ visible: false, producto: null });

  // Si viene un producto nuevo desde NuevoProductos, lo agregamos
  React.useEffect(() => {
    if (route?.params?.nuevoProducto) {
      setProductos(prev => [route.params.nuevoProducto, ...prev]);
      navigation.setParams({ nuevoProducto: null });
    }
  }, [route?.params?.nuevoProducto]);

  // Filtrado por búsqueda
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleGuardarEdicion = (productoEditado) => {
    setProductos(prev =>
      prev.map(p => (p.id === productoEditado.id ? productoEditado : p))
    );
    setModalEditar({ visible: false, producto: null });
    Alert.alert('Éxito', 'Producto actualizado correctamente.');
  };

  const handleConfirmarEliminar = () => {
    if (!modalEliminar.producto) return;
    setProductos(prev => prev.filter(p => p.id !== modalEliminar.producto.id));
    setModalEliminar({ visible: false, producto: null });
    Alert.alert('Eliminado', 'El producto fue eliminado correctamente.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Productos</Text>
          <TouchableOpacity
            style={styles.btnAgregar}
            onPress={() => navigation.navigate('NuevoProductos')}
          >
            <Text style={styles.btnAgregarText}>+ Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador + Filtro */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={COLORS.textGray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar producto..."
              placeholderTextColor={COLORS.textGray}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity
            style={[styles.btnFiltro, filtroActivo && styles.btnFiltroActive]}
            onPress={() => setFiltroActivo(!filtroActivo)}
          >
            <Ionicons
              name="filter"
              size={18}
              color={filtroActivo ? COLORS.white : COLORS.textDark}
            />
          </TouchableOpacity>
        </View>

        {/* Lista */}
        {productosFiltrados.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="cube-outline" size={48} color={COLORS.textGray} />
            <Text style={styles.emptyText}>No hay productos</Text>
          </View>
        ) : (
          <FlatList
            data={productosFiltrados}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProductoCard
                producto={item}
                onVer={() => setModalDetalle({ visible: true, producto: item })}
                onEditar={() => setModalEditar({ visible: true, producto: item })}
                onEliminar={() => setModalEliminar({ visible: true, producto: item })}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Modales */}
      <ModalEditar
        visible={modalEditar.visible}
        producto={modalEditar.producto}
        onCancel={() => setModalEditar({ visible: false, producto: null })}
        onSave={handleGuardarEdicion}
      />

      <ModalDetalle
        visible={modalDetalle.visible}
        producto={modalDetalle.producto}
        onClose={() => setModalDetalle({ visible: false, producto: null })}
      />

      <ModalEliminar
        visible={modalEliminar.visible}
        producto={modalEliminar.producto}
        onCancel={() => setModalEliminar({ visible: false, producto: null })}
        onConfirm={handleConfirmarEliminar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  btnAgregar: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnAgregarText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textDark,
  },
  btnFiltro: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  btnFiltroActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textGray,
  },
});