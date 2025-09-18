import { useState } from "react";
import supabase from "../supabaseClient";

function SignupModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { _, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✨ Check your email to confirm your account.");
    }
  };

  if (!isOpen) return null; // Don't render modal if it's closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <form className="auth-form" onSubmit={handleSignUp}>
          <h2 className="form-title">Create an Account</h2>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-large">
            Start Praying
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
