import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Button, Nav } from "react-bootstrap";
import ThemeContext from "../Common/ThemeContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);

  const updateProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/vendor/dashboard/productUpdate${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to update products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/vendor/dashboard/deleteProduct/${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteAllProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/vendor/dashboard/deleteAllProduct`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = localStorage.getItem("id");

        const response = await fetch(
          `http://localhost:8080/vendor/dashboard/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);
  return (
    <Container>
      <h2 className="text-center m-5 text-success">
        {localStorage.getItem("username")}'s Dashboard
      </h2>
      {products.length === 0 ? (
        <p className="text-center m-5 p-5">
          Oop's! No products found. Your Shop is Empty :( <br />
          <br />
          <Nav.Link
            href="/vendor/addProduct"
            className="text-center  p-2 btn btn-success d-inline"
            style={{
              textDecoration: "underline",

              margin: "5rem",
            }}
          >
            Add a Product to your Shop
          </Nav.Link>
        </p>
      ) : (
        <ul className="vendorProducts">
          {products.map((product) => (
            <li key={product.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  className="imageStyle"
                />
                <Card.Body>
                  <Card.Title>{product.vendor.brand}</Card.Title>
                  <Card.Text>
                    {product.type}'s {product.name}
                    <br />
                    <strong>Rs. {product.price}</strong>
                    <br />
                    {product.description}
                    <br />
                    <span className="text-warning">
                      {product.quantity <= 2
                        ? "Only few Left"
                        : `${product.quantity} left`}
                    </span>
                    , Available size: {product.size}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex-row">
                  <Button variant={theme} onClick={updateProduct}>
                    Update Product
                  </Button>
                  <Button
                    onClick={() => deleteProduct(product.id)}
                    variant={theme}
                  >
                    Delete Product
                  </Button>
                </Card.Footer>
              </Card>
            </li>
          ))}
          <Button
            style={{
              background: "none",
              border: "none",
              color: "black",
              textDecoration: "underline",
            }}
            onClick={deleteAllProduct}
          >
            Delete all products, if you want to close your shop
          </Button>
        </ul>
      )}
    </Container>
  );
}
