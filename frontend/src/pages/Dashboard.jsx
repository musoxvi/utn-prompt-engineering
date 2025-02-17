import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addMattress,
  updateMattress,
  deleteMattress,
  getAllMattresses,
} from "../services/mattress";
import { Layout } from "../components/Layout";
import {
  Snackbar,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    dimensions: "",
    material: "",
    price: "",
    images: null,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: "", open: false });
  const [dialog, setDialog] = useState({ open: false, id: null });

  const { data: mattresses = [] } = useQuery("mattresses", getAllMattresses, {
    staleTime: 300000,
    refetchInterval: 30000,
  });

  const deleteMutation = useMutation(deleteMattress, {
    onSuccess: () => {
      queryClient.invalidateQueries("mattresses");
      handleSnackbar("Colchón eliminado correctamente");
      setDialog({ open: false, id: null });
    },
    onError: () => {
      handleSnackbar("Error al eliminar colchón");
    },
  });

  const handleSnackbar = (message) => setSnackbar({ message, open: true });
  const handleCloseSnackbar = () => setSnackbar({ message: "", open: false });

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dimensions || !formData.material || !formData.price) {
      handleSnackbar("Todos los campos obligatorios deben completarse");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images" && formData.images) {
          Array.from(formData.images).forEach((file) => data.append("images", file));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (isUpdating) {
        await updateMattress(formData._id, data);
        handleSnackbar("Colchón actualizado correctamente");
      } else {
        await addMattress(data);
        handleSnackbar("Colchón agregado correctamente");
      }

      setFormData({ name: "", brand: "", dimensions: "", material: "", price: "", images: null });
      setIsUpdating(false);
      queryClient.invalidateQueries("mattresses");
    } catch (error) {
      handleSnackbar("Error al procesar la solicitud");
    }
  };

  const handleDelete = async () => {
    if (dialog.id) {
      deleteMutation.mutate(dialog.id);
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
          Dashboard de Colchones
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {isUpdating ? "Actualizar colchón" : "Agregar nuevo colchón"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
              {["name", "brand", "dimensions", "material", "price"].map((field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  type={field === "price" ? "number" : "text"}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  required={["name", "dimensions", "material", "price"].includes(field)}
                  fullWidth
                  margin="dense"
                />
              ))}
              <input type="file" name="images" multiple onChange={handleChange} />
            </Box>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              {isUpdating ? "Actualizar colchón" : "Agregar colchón"}
            </Button>
          </form>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Lista de Colchones
          </Typography>
          {mattresses.length === 0 ? (
            <Typography>No hay colchones disponibles.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Dimensiones</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mattresses.map((mattress) => (
                  <TableRow key={mattress._id}>
                    <TableCell>{mattress.name}</TableCell>
                    <TableCell>{mattress.brand}</TableCell>
                    <TableCell>{mattress.dimensions}</TableCell>
                    <TableCell>{mattress.material}</TableCell>
                    <TableCell>${mattress.price}</TableCell>
                    <TableCell>
                      <Button color="error" onClick={() => setDialog({ open: true, id: mattress._id })}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>

        <Dialog open={dialog.open} onClose={() => setDialog({ open: false, id: null })}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>¿Estás seguro de que deseas eliminar este colchón?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({ open: false, id: null })}>Cancelar</Button>
            <Button onClick={handleDelete} color="error">Eliminar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export { Dashboard };
