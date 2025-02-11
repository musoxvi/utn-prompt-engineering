
import Mattress from "../models/mattressModel.js"; // Asegúrate de ajustar la ruta según la ubicación del modelo
import { uploadImage } from '../utils/uploadImage.js';


// Leer todos los colchones

const getAllMattresses = async (req, res) => {
  try {
    const mattresses = await Mattress.find();

    // Convertir las imágenes de Buffer a Base64 antes de enviarlas
    const mattressesWithImages = mattresses.map(mattress => {
      return {
        ...mattress.toObject(), // Convertir a objeto plano
        images: mattress.images ? mattress.images.toString('base64') : null, // Convertir a Base64 si existe imagen
      };
    });

    res.json(mattressesWithImages); // Enviar los colchones con las imágenes en Base64
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al recuperar los colchones" });
  }
};


// Crear un colchón con imagen
const addMattress = async (req, res) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      console.error("Error al cargar la imagen:", err);
      return res.status(400).json({ error: 'Error al cargar la imagen' });
    }

    console.log("Archivo cargado correctamente:", req.file); // Verifica el contenido de req.file

    try {
      // Convertimos el buffer de la imagen a una cadena Base64
      const imageBase64 = req.file ? req.file.buffer.toString('base64') : null;

      // Creamos un nuevo colchón con los datos del body y la imagen en formato Base64
      const newMattress = new Mattress({
        ...req.body, // Esto copiará todos los datos del body como el nombre, dimensiones, etc.
        images: imageBase64, // Almacenamos la imagen en formato Base64
      });

      const savedMattress = await newMattress.save();
      res.status(201).json(savedMattress); // Respondemos con el colchón creado
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al agregar el colchón" });
    }
  });
};



// Leer un colchón por ID
const getMattressById = async (req, res) => {
  try {
    const mattress = await Mattress.findById(req.params.id);

    if (!mattress) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    res.json(mattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al recuperar el colchón" });
  }
};

// Actualizar un colchón
const updateMattress = async (req, res) => {
  try {
    const updatedMattress = await Mattress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMattress) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    res.json(updatedMattress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el colchón" });
  }
};

// Eliminar un colchón
const deleteMattress = async (req, res) => {
  try {
    const deletedMattress = await Mattress.findByIdAndDelete(req.params.id);

    if (!deletedMattress) {
      return res.status(404).json({ error: "Colchón no encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el colchón" });
  }
};

export { getAllMattresses, addMattress, getMattressById, updateMattress, deleteMattress };
