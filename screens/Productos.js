import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colores } from "../constants/colores";
import { estilos } from "../constants/estilos";
import { COLORS, SPACING, RADIUS, FONTS } from '../theme/colors';
import { PRODUCTOS_MOCK } from "../data/ProductosMock";
import ProductoCard from '../components/ProductoCard';
import ModalEditar from '../components/ModalEditar';
import ModalDetalle from '../components/ModalDetalle';
import ModalEliminar from '../components/ModalEliminar';


export default function Productos({ navigation, route}) {
  const [productos, setProductos] = useState(PRODUCTOS_MOCK);
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState(false);
  const [modalEditar, setModalEditar] = useState({ visible: false, producto: null });
  const [modalDetalle, setModalDetalle] = useState({ visible: false, producto: null });
  const [modalEliminar, setModalEliminar] = useState({ visible: false, producto: null });
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
   React.useEffect(() => {
    if (route?.params?.nuevoProducto) {
      setProductos(prev => [route.params.nuevoProducto, ...prev]);
      navigation.setParams({ nuevoProducto: null });
    }
  }, [route?.params?.nuevoProducto]);

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

  const renderProducto = ({ item }) => (
    <View style={styles.tarjetaProducto}>
      <View style={styles.filaSuperior}>
        <Image
          source={item.imagen}
          style={styles.imagenProducto}
          resizeMode="contain"
        />
        <View style={styles.columnaTexto}>
          <Text style={styles.nombreProducto}>{item.nombre}</Text>
          <Text style={styles.detalleProducto}>
            {`${item.categoria} - ${item.peso}`}
          </Text>
          <Text style={styles.stockProducto}>{`Stock: ${item.stock} un.`}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#505050" />
      </View>

      {/* Acciones de la tarjeta */}
      <View style={styles.filaAcciones}>
        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => alert(`Ver ${item.nombre}`)}
        >
          <Ionicons name="eye" size={20} color="#7c7c7c" />
          <Text style={styles.textoAccion}>Ver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => alert(`Editar ${item.nombre}`)}
        >
          <MaterialIcons name="edit" size={20} color="#696a6b" />
          <Text style={styles.textoAccion}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonAccion}
          onPress={() => alert(`Eliminar ${item.nombre}`)}
        >
          <Ionicons name="trash-outline" size={20} color={colores.rojo} />
          <Text style={[styles.textoAccion, styles.textoEliminar]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={estilos.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colores.verdePrincipal} />

      {/* Cabecera */}
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Productos</Text>
        <TouchableOpacity
          style={styles.botonAgregar}
          onPress={() => alert("Va a la sección Nuevo producto")}
        >
          <Text style={styles.textoAgregar}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cuerpo}>
        {/* Búsqueda fuera de la lista para que el campo no pierda el foco */}
        <View style={styles.filaBusqueda}>
          <View style={[styles.cajaCampo, styles.campoBusqueda]}>
            <Ionicons name="search" size={20} color="#575757" />
            <TextInput
              style={styles.inputBusqueda}
              placeholder="Buscar producto..."
              placeholderTextColor="#a4a4a4"
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity
            style={[styles.cajaCampo, styles.botonFiltro]}
            onPress={() => alert("Filtros próximamente")}
          >
            <MaterialIcons name="filter-list" size={24} color="#404040" />
          </TouchableOpacity>
        </View>

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

      </View>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity
          style={estilos.itemNavegacion}
          onPress={() => navigation.popTo("Home")}
        >
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_home.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={estilos.textoNavActivo}>Inicio</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNavegacion}
          onPress={() => {
            // navigation.navigate("Perfil"); // Descomentar cuando tengamos lista la pantalla de Perfil
            alert("Va a la sección Perfil");
          }}
        >
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_perfil.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={estilos.textoNavInactivo}>Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.itemNavegacion}
          onPress={() => {
            // navigation.navigate("Ajustes"); // Descomentar cuando tengamos lista la pantalla de Ajustes
            alert("Va a la sección Ajustes");
          }}
        >
          <View style={estilos.contenedorIconoNav}>
            <Image
              source={require("../assets/Icono_ajustes.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />
            <Text style={estilos.textoNavInactivo}>Ajustes</Text>
          </View>
        </TouchableOpacity>
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
  cabecera: {
    height: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    color: colores.blanco,
  },
  botonAgregar: {
    backgroundColor: colores.crema,
    borderRadius: 10,
    width: 127,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  textoAgregar: {
    fontSize: 16,
    fontWeight: "600",
    color: colores.verdePrincipal,
  },
  cuerpo: {
    flex: 1,
    backgroundColor: colores.crema,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 17,
    paddingTop: 18,
  },
  filaBusqueda: {
    flexDirection: "row",
    gap: 11,
    marginBottom: 18,
  },
  cajaCampo: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colores.campoFondo,
    borderWidth: 1,
    borderColor: colores.campoBorde,
    alignItems: "center",
  },
  campoBusqueda: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  inputBusqueda: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  botonFiltro: {
    width: 50,
    justifyContent: "center",
  },
  lista: {
    gap: 15,
    paddingBottom: 20,
  },
  tarjetaProducto: {
    backgroundColor: colores.blanco,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colores.bordeSuave,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filaSuperior: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  imagenProducto: {
    width: 70,
    height: 70,
  },
  columnaTexto: {
    flex: 1,
    marginLeft: 20,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "600",
    color: colores.textoOscuro,
  },
  detalleProducto: {
    fontSize: 15,
    fontWeight: "500",
    color: colores.textoSecundario,
  },
  stockProducto: {
    fontSize: 18,
    fontWeight: "600",
    color: colores.verdePrincipal,
  },
  filaAcciones: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botonAccion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  textoAccion: {
    fontSize: 15,
    fontWeight: "500",
    color: colores.textoOscuro,
  },
  textoEliminar: {
    color: colores.rojo,
  },
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
