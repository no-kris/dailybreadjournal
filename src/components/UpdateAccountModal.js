import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

function UpdateAccountModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) return;

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("username, email")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      setUsername(profile.username || "");
      setEmail(profile.email || "");
    } catch (err) {
      console.error("Error fetching user info:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update account
  const updateAccount = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const { error: profileError } = await supabase
        .from("user_profiles")
        .update({ username })
        .eq("id", user.id);

      if (profileError) throw profileError;

      alert("Account updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update failed:", err.message);
      alert("Error updating account: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account?"
      )
    )
      return;

    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in");

      const response = await fetch(
        "https://dgkalleieqflxwkaeyrm.supabase.co/functions/v1/delete-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        throw new Error("Error deleting account");
      }

      alert("Account deleted successfully");
      await supabase.auth.signOut();
    } catch (err) {
      alert(err.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchUserProfile();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="form-title">Account Settings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateAccount();
              }}
              className="auth-form"
            >
              <label>Username:</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label>Email:</label>
              <p>{email}</p>

              <div className="auth-buttons" style={{ marginTop: 20 }}>
                <button
                  type="submit"
                  className="btn btn-update"
                  disabled={loading}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>

            <hr style={{ margin: "1.5rem 0" }} />

            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteAccount}
              disabled={loading}
            >
              Delete Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateAccountModal;
