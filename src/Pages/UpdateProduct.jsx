import React, { useState, useContext } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Modal,
  Toast,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../Common/ThemeContext";
import { Navigate, redirect, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./pages.css";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const navigate = useNavigate();

  const [description, setDescription] = useState(
    searchParams.get("productDescription")
  );
  const [price, setPrice] = useState(searchParams.get("productPrice"));
  const [name, setName] = useState(searchParams.get("productName"));
  const [quantity, setQuantity] = useState(searchParams.get("productQuantity"));

  const [type, setType] = useState(searchParams.get("productType"));
  const [brand, setBrand] = useState(searchParams.get("productBrand"));
  const [imageUrl, setImageUrl] = useState(searchParams.get("productImg"));

  const { theme } = useContext(ThemeContext);

  const [sizes, setSizes] = useState({});

  //console.log(sizes);
  const updateProduct = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      sizes,
      type,
      imageUrl,
      brand,
    };

    await fetch(
      `http://localhost:8080/vendor/dashboard/productUpdate/${productId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(product),
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("product successfully updated", {
            autoClose: 2000,
            position: "bottom-left",
            hideProgressBar: true,
          });
          navigate("/vendor/dashboard");
        } else {
          response.text().then((errorMessage) => {
            toast.error(`${errorMessage}, try again`, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: true,
            });
          });
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        toast.error("Something went wrong. Please try again later.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center signup bg-dark text-white"
        style={{ minHeight: "100vh" }}
      >
        <Form
          onSubmit={updateProduct}
          style={{ width: "100%", maxWidth: "600px" }}
          className="p-4 rounded bg-secondary"
        >
          <h3 className="text-center m-2">Update Product</h3>
          <p className="text-center mb-5">Product ID : {productId}</p>
          {/* Form Fields */}
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                className="bg-dark text-white border-light"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="number"
                placeholder="Price"
                className="bg-dark text-white border-light"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="number"
                placeholder="Quantity"
                className="bg-dark text-white border-light"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 justify-content-center b">
            <Col sm={8}>
              <div
                className="mb-1 text-white bg-dark border-light"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid",
                  borderColor: "white",
                  borderRadius: "0.4rem",
                  padding: "1rem",
                }}
              >
                {["S", "M", "L", "XL", "XXL"].map((sizeOption, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Check
                      inline
                      label={sizeOption}
                      value={sizeOption}
                      name="sizes"
                      type="checkbox"
                      id={`inline-checkbox-${index}`}
                      checked={sizes[sizeOption] !== undefined}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSizes((prev) => {
                          const updated = { ...prev };
                          if (checked) {
                            updated[sizeOption] = ""; // default empty quantity
                          } else {
                            delete updated[sizeOption];
                          }
                          return updated;
                        });
                      }}
                      className="text-white me-2"
                    />
                    {sizes[sizeOption] !== undefined && (
                      <Form.Control
                        type="number"
                        placeholder="Quantity"
                        className="bg-dark text-white border-light w-30"
                        value={sizes[sizeOption]}
                        onChange={(e) =>
                          setSizes((prev) => ({
                            ...prev,
                            [sizeOption]: e.target.value,
                          }))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Image URL"
                className="bg-dark text-white border-light"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Brand"
                className="bg-dark text-white border-light"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                type="text"
                placeholder="Men | Women | Kids | Beauty ..."
                className="bg-dark text-white border-light"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                required
                as="textarea"
                placeholder="Description"
                className="border-dark"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Col sm={8} className="d-flex justify-content-evenly">
              <Button variant={theme} type="submit">
                Update Product
              </Button>
              <Button
                variant={theme}
                type="button"
                onClick={() => {
                  setName("");
                  setDescription("");
                  setPrice("");
                  setQuantity(0);
                  setSizes("");
                  setType("");
                  setImageUrl("");
                }}
              >
                Reset
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
}
