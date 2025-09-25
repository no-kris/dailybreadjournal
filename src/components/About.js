import { useState } from "react";
import SignupModal from "./SignupForm";
import LoginModal from "./LoginForm";

function About({ username, setUsername }) {
  const [modalType, setModalType] = useState(null);

  const handleCloseModal = () => setModalType(null);

  return (
    <div className="about-message">
      <h1>Welcome to Daily Bread Journal</h1>
      <p>
        A space to record your prayers, reflect on your journey, and celebrate
        what God has given you.
      </p>
      <p>
        You must log in or sign up in order to access all features of the app
        and save your prayers.
      </p>
      <div className="auth-buttons">
        <button className="btn" onClick={() => setModalType("login")}>
          Log In
        </button>
        <button className="btn" onClick={() => setModalType("signup")}>
          Sign Up
        </button>
        {modalType === "login" && (
          <LoginModal
            isOpen={true}
            onClose={handleCloseModal}
            setUsername={setUsername}
          />
        )}
        {modalType === "signup" && (
          <SignupModal
            isOpen={true}
            username={username}
            setUsername={setUsername}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default About;
