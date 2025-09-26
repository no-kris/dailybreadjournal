import { useState } from "react";
import UpdateAccountModal from "./UpdateAccountModal";

function AccountSettings() {
  const [isClicked, setIsClicked] = useState(false);

  const handleCloseModal = () => setIsClicked(false);

  return (
    <section className="account-settings">
      <h3>Account Settings</h3>
      <button className="btn btn-update" onClick={() => setIsClicked(true)}>
        My Account
      </button>
      {isClicked ? (
        <UpdateAccountModal isOpen={true} onClose={handleCloseModal} />
      ) : null}
    </section>
  );
}

export default AccountSettings;
