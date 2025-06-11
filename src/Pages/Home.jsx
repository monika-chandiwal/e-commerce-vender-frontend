import React from "react";
import Header from "../Common/Header.jsx";
import FooterComponent from "../Common/Footer.jsx";
import { Image, Carousel, Card } from "react-bootstrap";
import { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

import "./pages.css";
const stories = [
  {
    title: "From Local to Global",
    vendor: "John",
    text: "I started by selling handmade crafts in my city. Within 3 months of joining the platform, my products reached over 5,000 customers across India. I now manage orders nationwide and have doubled my revenue.",
    bg: "lightgray",
  },
  {
    title: "Inventory Made Easy",
    vendor: "Faraas",
    text: "Managing stock used to be a nightmare. With the automated inventory tools from this platform, I reduced my time spent on manual tasks by 70%, allowing me to focus on growing my business.",
    bg: "skyblue",
  },
  {
    title: "Fashion Brand Takeoff",
    vendor: "Milon",
    text: "As a new fashion startup, I needed visibility. The platform’s promotion tools helped me reach a broader audience. I achieved 10,000+ orders in the first 6 months and built a loyal customer base.",
    bg: "lightblue",
  },
  {
    title: "Data-Driven Decisions",
    vendor: "Trendify",
    text: "The analytics dashboard helped us identify top-selling products and customer behavior. With this insight, we updated our catalog to reflect current trends, resulting in a 2x increase in sales conversion rates. The platform truly empowers vendors with real-time decision-making tools.",
    bg: "khaki",
  },
  {
    title: "Expansion Through Digital Reach",
    vendor: "GlowSkin Naturals",
    text: "Our brand was previously limited to local sales. After joining this platform, we reached a national audience. The clean UI and easy uploading of product listings allowed us to scale our offerings quickly. Our customer acquisition cost dropped by 25% thanks to integrated marketing tools.",
    bg: "lightpink",
  },
];
const questions = [
  {
    id: 1,
    ques: "How do I register as a vendor on the platform?",
    answer:
      "To register, go to the Vendor Login/Register page, fill in the required details, and upload your verification documents. Once reviewed and approved, your account will be activated.",
  },
  {
    id: 2,
    ques: " Is there any registration or listing fee?",
    answer:
      "No, vendor registration and product listings are completely free. We only charge a small commission on each successful sale.",
  },
  {
    id: 3,
    ques: "How do I add products to my store?",
    answer:
      "Once logged in to your vendor dashboard, go to “Add Product”, fill in the product details (name, price, quantity, image, etc.), and click submit. Your product will be live after a short review.",
  },
];
export default function Home() {
  const [show, setShow] = useState(false);
  const [showAns, setShowAns] = useState(null);

  const toggleAnswer = (id) => {
    if (showAns === id) {
      setShow(!show); // toggle visibility
    } else {
      setShow(true); // show the new answer
      setShowAns(id); // update the currently active ID
    }
  };

  const images = [
    {
      src: "https://media.istockphoto.com/id/2148788421/photo/online-shopping-home-and-person-with-phone-clothes-and-e-commerce-digital-and-browsing-for.webp?a=1&b=1&s=612x612&w=0&k=20&c=LDwnkqKhIgEZjAsDKjW_XU0vIbIS3H6Buc_ogFtaJ0w=",
      alt: "Online Shopping",
    },
    {
      src: "https://images.unsplash.com/photo-1665686310429-ee43624978fa?w=1600&auto=format&fit=crop",
      alt: "Shopping",
    },
    {
      src: "https://media.istockphoto.com/id/2173978774/photo/online-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=GLMAjujAcV0qJ5etuVAHj0yfaZtNTbQU7jj2QC25hWk=",
      alt: "E-commerce",
    },
  ];

  return (
    <>
      <Header />

      <Carousel
        className="m-5"
        wrap={true}
        interval={5000}
        controls={true}
        indicators={true}
      >
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            {img.src ? (
              <Image
                src={img.src || null}
                alt={img.alt || `Slide ${index + 1}`}
                className="carousel-image"
                fluid
              />
            ) : null}
          </Carousel.Item>
        ))}
      </Carousel>
      <section
        id="sell"
        style={{ margin: "20px", marginBottom: "80px", padding: "20px" }}
      >
        <h2>Why Sell With Us?</h2>
        <p>
          Whether you're a small artisan, a growing brand, or an established
          vendor, our e-commerce platform gives you the tools and visibility you
          need to grow your business online.
          <br />
          <br />
          <h4>Get Started in 3 Steps:</h4>
          <p>1. Sign Up as a vendor.</p>
          <p>2. Add Your Products with images, descriptions, and pricing.</p>
          <p>3. Start Selling and manage your store from your dashboard.</p> ✨
          Join hundreds of successful vendors who are growing their businesses
          online!
        </p>
      </section>

      <section id="success" className="mb-5 mt-5 container pb-5">
        <h2>Success Stories</h2>
        <p>Our vendors share how they achieved success through our platform.</p>
        <ul style={{ listStyle: "none" }}>
          <li>Vendor A increased sales by 200% in 3 months.</li>
          <li>Vendor B streamlined operations using our tools.</li>
          <li>Vendor C reached 10k+ customers in 6 months.</li>
        </ul>
        <div
          style={{
            display: "flex",
            flexFlow: "row",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {stories.map((story, index) => (
            <Card key={index} style={{ backgroundColor: story.bg }}>
              <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <Card.Subtitle>Vendor - {story.vendor}</Card.Subtitle>
                <Card.Text>{story.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="services"
        style={{
          margin: "50px",
          paddingBottom: "100px",
        }}
      >
        <h2>Our Services</h2>
        <p>
          Our platform is designed to empower vendors by offering a complete
          suite of e-commerce services tailored for business growth, customer
          satisfaction, and operational efficiency.
        </p>
        <h4>Core Services for Vendors</h4>
        <p>1. Product Listing & Catalog Management</p>
        <p>2. Order Management</p>
        <p>3. Inventory Control</p> <p>4. Analytics & Reports</p>
        <p>5. Marketing & Promotions</p>⚡ Our goal is to help vendors focus on
        their products while we handle the platform, tools, and tech.
      </section>

      <section
        id="faq"
        style={{
          margin: "50px",
          paddingBottom: "90px",
        }}
      >
        <div>
          <h2>Frequently Asked Questions (FAQs)</h2>
          {questions.map((faqItem) => (
            <div key={faqItem.id} className="faqItem">
              <h4 onClick={() => toggleAnswer(faqItem.id)}>
                <hr />
                {faqItem.ques}
                <button
                  onClick={() => toggleAnswer(faqItem.id)}
                  style={{
                    background: "none",
                    border: "none",
                  }}
                  className="toggleBtn"
                >
                  {show && showAns === faqItem.id ? (
                    <FaAngleUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </h4>

              <p
                style={{
                  display: show && showAns === faqItem.id ? "block" : "none",
                }}
              >
                {faqItem.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="footer-fixed">
        <FooterComponent />
      </div>
    </>
  );
}
