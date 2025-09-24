import supabase from "../supabaseClient";

function DeleteAccountModal({ isOpen, onClose }) {
  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    // Get the current user's session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("No user is currently logged in.");
      return;
    }

    try {
      const response = await fetch(
        "https://dgkalleieqflxwkaeyrm.supabase.co/functions/v1/delete-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send the user ID in the request body
          body: JSON.stringify({ userId: user.id }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Account deleted successfully");
        // sign the user out after deletion
        await supabase.auth.signOut();
      } else {
        alert("Error deleting account:");
        console.log(result);
      }
    } catch (error) {
      alert("Failed to call the Edge Function");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <p className="message" style={{ marginBottom: 40 }}>
          Once you delete your account all your data will be lost.
        </p>
        <div
          className="auth-buttons"
          style={{ justifyContent: "space-between" }}
        >
          <button className="btn btn-delete" onClick={handleDeleteAccount}>
            Yes, delete
          </button>
          <button
            className="btn"
            style={{ fontSize: 14, padding: 5 }}
            onClick={onClose}
          >
            Never mind
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
