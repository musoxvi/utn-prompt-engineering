import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import placeholderImage from "../assets/placeholder.jpg";

const Products = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const { data: mattresses = [], isLoading, error } = useQuery(
    ["mattresses"],
    getAllMattresses,
    {
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 30,
    }
  );

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Our Products
        </Typography>

        {isLoading ? (
          <Typography variant="body1" color="text.secondary">
            Loading products...
          </Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            Error loading products. Please try again later.
          </Typography>
        ) : mattresses.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No products available at the moment.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {mattresses.map((mattress) => (
              <Grid item xs={12} sm={6} md={4} key={mattress._id}>
                {/* Card presionable */}
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${mattress._id}`)}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="250"
                      image={
                        mattress.images
                          ? `data:image/jpeg;base64,${mattress.images}`
                          : placeholderImage
                      }
                      alt={mattress.name || "Placeholder"}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        height: "250px",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6">{mattress.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dimensions: {mattress.dimensions}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Material: {mattress.material}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        Price: ${mattress.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export { Products };
