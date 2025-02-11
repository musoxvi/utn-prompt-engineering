import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";

const Products = () => {
  const { data: mattresses = [] } = useQuery(
    ["mattresses"],
    getAllMattresses,
    {
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 30,
    }
  );

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-primary">Our Products</h1>
          <div className="columns is-multiline">
            {mattresses.map((mattress) => (
              <div className="column is-one-third" key={mattress._id}>
                <div className="card">
                  <div className="card-image">
                    {mattress.images && (
                      <figure className="image is-4by3">
                        <img
                          src={`data:image/jpeg;base64,${mattress.images}`}
                          alt={mattress.name}
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    )}
                  </div>
                  <div className="card-content">
                    <p className="title">{mattress.name}</p>
                    <p>Dimensions: {mattress.dimensions}</p>
                    <p>Material: {mattress.material}</p>
                    <p>Price: ${mattress.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export { Products };
