// productosService.js
// CRUD de la colección "productos" en Firestore (SDK modular de Firebase v9+).
// El ID de cada documento es el nombre del producto (ej: "Pimienta Blanca").

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from "../src/config/firebaseConfig"; // tu instancia: export const db = getFirestore(app)

const COLECCION = 'productos';

/*
  Estructura del documento:
  {
    "Nombre del Producto": string,
    "Categoria": string,
    "Descripcion": string,
    "Origen": string,
    "Presentación": string,   // ej: "gramos"
    "Cantidad": number,       // double
    "Stock": number,          // int
    "Vencimiento": Timestamp  // se guarda como Timestamp de Firestore
  }
*/

// ---------- Helpers ----------

// Firestore no permite "/" en un ID, y no admite IDs vacíos, "." ni "..".
const crearId = (nombre) => {
  const id = String(nombre ?? '').trim().replace(/\//g, '-');
  if (!id || id === '.' || id === '..') {
    throw new Error('El nombre del producto no es válido para usarlo como ID.');
  }
  return id;
};

const aTimestamp = (fecha) => {
  if (fecha instanceof Timestamp) return fecha;
  if (fecha instanceof Date) return Timestamp.fromDate(fecha);
  if (typeof fecha === 'string' || typeof fecha === 'number') {
    return Timestamp.fromDate(new Date(fecha));
  }
  throw new Error('Fecha de vencimiento inválida.');
};

// Convierte el documento de Firestore a un objeto cómodo para la UI
// (Vencimiento pasa de Timestamp a Date).
const desdeFirestore = (snap) => {
  const data = snap.data();
  return {
    id: snap.id,
    ...data,
    Vencimiento: data.Vencimiento?.toDate ? data.Vencimiento.toDate() : null,
  };
};

// ---------- CREATE ----------

export const crearProducto = async (producto) => {
  const id = crearId(producto['Nombre del Producto']);
  const ref = doc(db, COLECCION, id);

  // Evita pisar un producto existente con el mismo nombre
  const existente = await getDoc(ref);
  if (existente.exists()) {
    throw new Error(`Ya existe un producto llamado "${id}".`);
  }

  await setDoc(ref, {
    'Nombre del Producto': producto['Nombre del Producto'].trim(),
    Categoria: producto.Categoria,
    Descripcion: producto.Descripcion,
    Origen: producto.Origen,
    'Presentación': producto['Presentación'],
    Cantidad: Number(producto.Cantidad),
    Stock: Math.trunc(Number(producto.Stock)),
    Vencimiento: aTimestamp(producto.Vencimiento),
  });

  return id;
};

// ---------- READ ----------

// Un producto por nombre (ID)
export const obtenerProducto = async (nombre) => {
  const snap = await getDoc(doc(db, COLECCION, crearId(nombre)));
  return snap.exists() ? desdeFirestore(snap) : null;
};

// Todos los productos
export const listarProductos = async () => {
  const snap = await getDocs(collection(db, COLECCION));
  return snap.docs.map(desdeFirestore);
};

// Filtrar por categoría (ej: "Especias").
// Nota: si combinás where + orderBy en otro campo, Firestore pide crear un índice.
export const listarPorCategoria = async (categoria) => {
  const q = query(
    collection(db, COLECCION),
    where('Categoria', '==', categoria),
    orderBy('Nombre del Producto')
  );
  const snap = await getDocs(q);
  return snap.docs.map(desdeFirestore);
};

// ---------- UPDATE ----------

// Actualiza solo los campos que le pases. No cambia el ID.
export const actualizarProducto = async (nombre, cambios) => {
  const ref = doc(db, COLECCION, crearId(nombre));
  const datos = { ...cambios };

  // Nunca modificar el nombre por acá: el ID quedaría desincronizado.
  // Para eso usá renombrarProducto.
  delete datos['Nombre del Producto'];

  if (datos.Cantidad !== undefined) datos.Cantidad = Number(datos.Cantidad);
  if (datos.Stock !== undefined) datos.Stock = Math.trunc(Number(datos.Stock));
  if (datos.Vencimiento !== undefined) datos.Vencimiento = aTimestamp(datos.Vencimiento);

  await updateDoc(ref, datos); // falla si el documento no existe
};

// Cambiar el nombre implica cambiar el ID: se copia el documento y se borra el viejo.
export const renombrarProducto = async (nombreActual, nombreNuevo) => {
  const refViejo = doc(db, COLECCION, crearId(nombreActual));
  const refNuevo = doc(db, COLECCION, crearId(nombreNuevo));

  const [snapViejo, snapNuevo] = await Promise.all([getDoc(refViejo), getDoc(refNuevo)]);
  if (!snapViejo.exists()) throw new Error('El producto original no existe.');
  if (snapNuevo.exists()) throw new Error('Ya existe un producto con ese nombre.');

  const batch = writeBatch(db);
  batch.set(refNuevo, { ...snapViejo.data(), 'Nombre del Producto': nombreNuevo.trim() });
  batch.delete(refViejo);
  await batch.commit();
};

// ---------- DELETE ----------

export const eliminarProducto = async (nombre) => {
  await deleteDoc(doc(db, COLECCION, crearId(nombre)));
};
