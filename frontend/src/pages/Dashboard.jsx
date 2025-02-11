import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { addMattress, updateMattress, deleteMattress, getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";
import { Toast } from "../components/Toast";
import { Modal } from "../components/Modal";

const fields = [
  { name: "name", label: "Nombre del colchón", type: "text", required: true },
  { name: "brand", label: "Marca", type: "text", required: false }, // Este campo sigue siendo opcional
  { name: "dimensions", label: "Dimensiones (cm)", type: "text", required: true }, // Cambié 'width', 'length', 'height' a 'dimensions'
  { name: "material", label: "Material principal", type: "text", required: true }, // Este campo es ahora obligatorio
  { name: "price", label: "Precio", type: "number", required: true }, // El precio sigue siendo obligatorio
  { name: "images", label: "Imágenes", type: "file", required: false } // Campo opcional para subir imágenes
];

const Dashboard = () => {

  const initialFormData = fields.reduce((acc, field) => {
    if (field.type === "checkbox-group") {
      // Para los grupos de checkboxes, inicializamos un array vacío
      acc[field.name] = [];
    } else if (field.type === "file") {
      // Para los archivos, inicializamos como null
      acc[field.name] = null;
    } else {
      // Para otros tipos de campos, inicializamos como cadena vacía
      acc[field.name] = "";
    }
    return acc;
  }, {});
  
  const [formData, setFormData] = useState(initialFormData);
  


  const queryClient = useQueryClient();
  //const [formData, setFormData] = useState({ firmness: "", features: [], layers: "", images: null });
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [modal, setModal] = useState({ isActive: false, message: "", onConfirm: null });

  const { data: mattresses = [] } = useQuery(["mattresses"], getAllMattresses, {
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30,
  });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((feature) => feature !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // Almacena el archivo seleccionado
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de campos requeridos
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        showToast(`El campo ${field.label} es obligatorio`, "error");
        return;
      }
    }
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "features") {
        formData[key].forEach((feature) => data.append("features", feature));
      } else if (key === "layers") {
        formData[key].split(",").forEach((layer) => data.append("layers", layer.trim()));
      } else if (key === "images" && formData[key]) {
        // Asegúrate de que `formData[key]` es un archivo
        data.append("images", formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });
  
    try {
      if (isUpdating) {
        await updateMattress(formData._id, data);
        showToast("Colchón actualizado correctamente", "success");
      } else {
        await addMattress(data);
        showToast("Colchón agregado correctamente", "success");
      }
      setFormData(initialFormData); // Restablecer el formulario
      setIsUpdating(false);
      queryClient.invalidateQueries(["mattresses"]);
    } catch (error) {
      showToast("Error al procesar la solicitud", "error");
    }
  };
  
  
  

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Dashboard</h1>
          <form onSubmit={handleSubmit}>
            {fields.map(({ name, label, type, required, options }) => (
              <div className="field" key={name}>
                <label className="label">{label}</label>
                <div className="control">
                  {type === "select" ? (
                    <div className="select">
                      <select name={name} value={formData[name] || ""} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : type === "checkbox-group" ? (
                    <div>
                      {options.map((option) => (
                        <label key={option} className="checkbox">
                          <input
                            type="checkbox"
                            name={name}
                            value={option}
                            checked={formData.features.includes(option)}
                            onChange={handleChange}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : type === "file" ? (
                    <input
                      className="input"
                      type={type}
                      name={name}
                      onChange={handleChange}
                      required={required}
                    />
                  ) : (
                    <input
                      className="input"
                      type={type}
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      required={required}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="control">
              <button className="button is-primary" type="submit">
                {isUpdating ? "Actualizar colchón" : "Agregar colchón"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
      <Modal isActive={modal.isActive} title="Confirmación" message={modal.message} onConfirm={modal.onConfirm} onCancel={() => setModal({ isActive: false, message: "", onConfirm: null })} />
    </Layout>
  );
};

export { Dashboard };