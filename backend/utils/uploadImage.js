import multer from 'multer';

// Usamos memoria como almacenamiento para almacenar la imagen en un buffer
const storage = multer.memoryStorage();

// Configuramos el tamaño máximo de archivo permitido y tipo de archivo (opcional)
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Solo se permiten imágenes (JPEG, PNG, GIF, WEBP)'));
    }
    cb(null, true);
  },
});

// Exportamos la función para que sea utilizada en los controladores
export const uploadImage = upload.single('images'); // 'images' es el campo en el formulario

// Controlador para guardar y devolver la imagen en base64
export const handleImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Convertir el buffer a base64
  const base64Image = req.file.buffer.toString('base64');
  
  // Retornar la imagen como base64
  return res.json({
    image: `data:${req.file.mimetype};base64,${base64Image}`,
  });
};
