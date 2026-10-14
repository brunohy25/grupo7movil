import {
  addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function coleccionProductos() {
  if (!db) throw new Error('Firebase no está configurado.');
  return collection(db, 'productos');
}

// orderBy('nombre') deja afuera los documentos sin campo `nombre` (formato anterior).
export function escucharProductos(alCambiar, alFallar) {
  try {
    return onSnapshot(
      query(coleccionProductos(), orderBy('nombre')),
      (resultado) => alCambiar(resultado.docs.map((d) => ({ ...d.data(), id: d.id }))),
      alFallar,
    );
  } catch (error) {
    alFallar(error);
    return () => {};
  }
}

// Mismas reglas que firestore.rules: nombre no vacío y stock entero >= 0.
export function validarProducto(form) {
  const nombre = form.nombre.trim();
  const stock = Number(form.stock);
  if (!nombre) return { error: 'Ingresá el nombre del producto.' };
  if (String(form.stock).trim() === '' || !Number.isSafeInteger(stock) || stock < 0) {
    return { error: 'El stock debe ser un número entero mayor o igual a 0.' };
  }
  return {
    datos: {
      nombre,
      categoria: form.categoria.trim(),
      presentacion: form.presentacion.trim(),
      stock,
      origen: form.origen.trim(),
      vencimiento: form.vencimiento.trim(),
      descripcion: form.descripcion.trim(),
    },
  };
}

export function crearProducto(datos) {
  return addDoc(coleccionProductos(), {
    ...datos,
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
  });
}

export function actualizarProducto(id, datos) {
  return updateDoc(doc(coleccionProductos(), id), { ...datos, actualizadoEn: serverTimestamp() });
}

export function eliminarProducto(id) {
  return deleteDoc(doc(coleccionProductos(), id));
}
