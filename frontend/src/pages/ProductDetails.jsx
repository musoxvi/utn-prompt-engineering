import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMattressById } from "../services/mattress";
import { Layout } from "../components/Layout";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Icono para el botón
import placeholderImage from "../assets/placeholder.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para volver atrás
  const { data: mattress, isLoading, error } = useQuery(
    ["mattress", id],
    () => getMattressById(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        {/* Botón de volver */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error">
            Error loading product details.
          </Typography>
        ) : !mattress ? (
          <Typography variant="h6" color="text.secondary">
            Product not found.
          </Typography>
        ) : (
          <Card sx={{ maxWidth: 600, mx: "auto" }}>
            <CardMedia
              component="img"
              height="300"
              image={
                mattress.images
                  ? `data:image/jpeg;base64,${mattress.images}`
                  : placeholderImage
              }
              alt={mattress.name}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "300px",
              }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {mattress.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Dimensions: {mattress.dimensions}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Material: {mattress.material}
              </Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                Price: ${mattress.price}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Layout>
  );
};

export { ProductDetails };
