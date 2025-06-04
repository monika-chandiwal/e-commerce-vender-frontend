import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Button, Nav } from "react-bootstrap";
import ThemeContext from "../Common/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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
                  <Card.Title>{product.brand}</Card.Title>
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
                    <br />
                    Available sizes
                    <br />
                    {Object.entries(product.sizes).map(([size, stock]) => (
                      <span key={size}>
                        {size} - {stock}{" "}
                      </span>
                    ))}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex-row">
                  <Button
                    variant={theme}
                    onClick={() =>
                      navigate(
                        `/vendor/updateProduct?productId=${product.id}&productName=${product.name}&productPrice=${product.price}&productType=${product.type}&productDescription=${product.description}&productImg=${product.imageUrl}&productBrand=${product.brand}&productSize=${product.sizes}&productQuantity=${product.quantity}`
                      )
                    }
                  >
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
        </ul>
      )}
      <div className="text-center">
        <Button
          className="btn btn-secondary m-1 pt-0"
          onClick={deleteAllProduct}
        >
          <br />
          Delete all products, if you want to close your shop
        </Button>
      </div>
    </Container>
  );
}
