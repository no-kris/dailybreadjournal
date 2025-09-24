import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

function DeleteAccount() {
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleCloseModal = () => setDeleteClicked(false);

  return (
    <section className="delete-account-section">
      <p>Want to delete account?</p>
      <button className="btn btn-delete" onClick={() => setDeleteClicked(true)}>
        Delete My Account
      </button>
      {deleteClicked ? (
        <DeleteAccountModal isOpen={true} onClose={handleCloseModal} />
      ) : null}
    </section>
  );
}

export default DeleteAccount;
