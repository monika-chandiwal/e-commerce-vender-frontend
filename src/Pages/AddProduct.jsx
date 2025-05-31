import React, { useState, useContext } from "react";
import { Button, Col, Form, Row, Container, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../Common/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./pages.css";

export default function AddProduct() {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id") || localStorage.getItem("id");

  const [productAdded, setProductAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [sizes, setSizes] = useState({});
  console.log(sizes);

  //console.log(sizes);
  const saveProduct = (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      sizes,
      type,
      brand,
      imageUrl,
      vendor: {
        id: parseInt(id),
      },
    };

    fetch("http://localhost:8080/vendor/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          setProductAdded(true);
          setShowModal(true);
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
      {/* Popup Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Added</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{name} has been added successfully!</p>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => {
              setShowModal(false);
              navigate(`/vendor/addProduct?id=${id}`);
            }}
          >
            Add Another Product
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setName("");
              setDescription("");
              setPrice("");
              setQuantity(0);
              setSizes("");
              setType("");
              setImageUrl("");
              navigate("/vendor/home");
            }}
          >
            Back to Vendor Home
          </Button>
        </Modal.Body>
      </Modal>

      <Container
        fluid
        className="d-flex justify-content-center align-items-center signup bg-dark text-white"
        style={{ minHeight: "100vh" }}
      >
        <Form
          onSubmit={saveProduct}
          style={{ width: "100%", maxWidth: "600px" }}
          className="p-4 rounded bg-secondary"
        >
          <h3 className="text-center mb-5">Add Product</h3>

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

          <Form.Group as={Row} className="mb-4 justify-content-center">
            <Col sm={8}>
              <Form.Control
                disabled
                type="text"
                className="bg-dark text-white border-light"
                value={id}
                placeholder={id == null ? " null " : id}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Col sm={8} className="d-flex justify-content-evenly">
              <Button variant={theme} type="submit">
                Add Product
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
