import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Card from "../components/Card";

function Home() {
  return (
    <div>
      <Hero />

      <div className="card-container">
        <Link to="/chat" className="card-link">
          <Card title="Chat App" description="Real-time messaging application" />
        </Link>

        <Link to="/food" className="card-link">
          <Card title="Food Delivery" description="Menu, cart and checkout system" />
        </Link>

        <Link to="/admin" className="card-link">
          <Card title="Admin Dashboard" description="SaaS analytics dashboard" />
        </Link>

        <Link to="/ecommerce" className="card-link">
          <Card title="E-Commerce Website" description="Products, cart and checkout flow" />
        </Link>

        <Link to="/exam" className="card-link">
          <Card title="Online Exam System" description="MCQ, timer and result dashboard" />
        </Link>
      </div>
    </div>
  );
}

export default Home;