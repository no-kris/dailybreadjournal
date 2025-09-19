import { useState } from "react";
import SignupModal from "./SignupForm";
import LoginModal from "./LoginForm";
import supabase from "../supabaseClient";

function Header({ isLoggedIn, showForm, setShowForm, username, setUsername }) {
  const [modalType, setModalType] = useState(null);

  const handleCloseModal = () => setModalType(null);

  async function handleLogout() {
    await supabase.auth.signOut();
    setModalType(null);
    setShowForm(false);
  }

  return (
    <header className="header">
      <div className="logo">
        <img src="images/logo.png" alt="Stylized logo" className="logo-img" />
        <h1>Daily Bread Journal</h1>
      </div>
      {isLoggedIn ? (
        <div className="auth-buttons">
          <button
            className="btn"
            onClick={() => setShowForm((showForm) => !showForm)}
          >
            {showForm ? "Close" : "Add New Prayer"}
          </button>
          <button className="btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="btn"
            onClick={() => setModalType("login")}
            setUsername={setUsername}
          >
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
      )}
    </header>
  );
}

export default Header;
