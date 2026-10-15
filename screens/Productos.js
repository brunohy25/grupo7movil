import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colores } from "../constants/colores";
import { estilosGlobales, estilosTema } from "../constants/estilos";
import { usarTema } from "../contexto/ContextoTema";
import { escucharProductos, eliminarProducto } from "../src/servicios/productos";
import ProductoCard from '../components/ProductoCard';
import ModalEditar from '../components/ModalEditar';
import ModalDetalle from '../components/ModalDetalle';
import ModalEliminar from '../components/ModalEliminar';
import BarraNavegaciónInferior from '../components/BarraNavegaciónInferior'


export default function Productos({ navigation }) {
  const { modoOscuro } = usarTema();
  const tema = estilosTema[modoOscuro ? "oscuro" : "claro"];
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [modalEditar, setModalEditar] = useState({ visible: false, producto: null });
  const [modalDetalle, setModalDetalle] = useState({ visible: false, producto: null });
  const [modalEliminar, setModalEliminar] = useState({ visible: false, producto: null });
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  // Lista en tiempo real: altas, ediciones y bajas llegan solas por onSnapshot.
  React.useEffect(() => escucharProductos(
    (lista) => {
      setProductos(lista);
      setCargando(false);
    },
    () => {
      setErrorCarga("No se pudieron cargar los productos.");
      setCargando(false);
    }
  ), []);

  // ModalEditar ya guardó en Firestore; acá solo se cierra.
  const handleGuardarEdicion = () => {
    setModalEditar({ visible: false, producto: null });
    Alert.alert('Éxito', 'Producto actualizado correctamente.');
  };

  const handleConfirmarEliminar = async () => {
    const producto = modalEliminar.producto;
    if (!producto) return;
    // Se cierra antes de borrar para evitar un doble toque.
    setModalEliminar({ visible: false, producto: null });
    try {
      await eliminarProducto(producto.id);
      Alert.alert('Eliminado', 'El producto fue eliminado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto.');
    }
  };

  return (
    <SafeAreaView
      style={estilosGlobales.contenedorPrincipal}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colores.verdePrincipal} />

      {/* Cabecera */}
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Productos</Text>
        <TouchableOpacity
          style={styles.botonAgregar}
          onPress={() => navigation.navigate("NuevoProductos")}
        >
          <Text style={styles.textoAgregar}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.cuerpo, tema.fondo]}>
        {/* Búsqueda fuera de la lista para que el campo no pierda el foco */}
        <View style={styles.filaBusqueda}>
          <View style={[styles.cajaCampo, styles.campoBusqueda, tema.campo]}>
            <Ionicons name="search" size={20} color={modoOscuro ? tema.texto.color : colores.grisOscuro} />
            <TextInput
              style={[styles.inputBusqueda, modoOscuro && tema.texto]}
              placeholder="Buscar producto..."
              placeholderTextColor={colores.placeholderClaro}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>
          <TouchableOpacity
            style={[styles.cajaCampo, styles.botonFiltro, tema.campo]}
            onPress={() => alert("Filtros próximamente")}
          >
            <MaterialIcons name="filter-list" size={24} color={modoOscuro ? tema.texto.color : colores.filtroIcono} />
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
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                {cargando ? (
                  <ActivityIndicator size="large" color={colores.verdePrincipal} />
                ) : (
                  <Text style={[styles.emptyText, tema.textoSecundario]}>
                    {errorCarga || "No hay productos."}
                  </Text>
                )}
              </View>
            }
          />

      </View>

      {/* Barra de navegación inferior */}
      <BarraNavegaciónInferior navigation={navigation}/>
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
  listContent: {
    paddingBottom: 24,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: colores.textoSecundario,
  },
});
