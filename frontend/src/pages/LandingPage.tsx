import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import "bootstrap/dist/css/bootstrap.min.css";
function LandingPage() {
  const [text] = useTypewriter({
    words: ["Discover the world!"],
    loop: 0,
  });
  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center px-5">
          <h1
            className="text-center fw-bold mb-2"
            style={{ color: "white", fontSize: "70px" }}
          >
            {text}
          </h1>
          <p className="mb-4" style={{ color: "white", fontSize: "30px" }}>
            Please log in or register to continue.
          </p>
          <Link to="/login">
            <button
              style={{
                border: "none",
                fontSize: "20px",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <span className="button-line me-2 w-40"></span>
              Start your journey &gt;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
