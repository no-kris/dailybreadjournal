import supabase from "../supabaseClient";

function Header({ isLoggedIn, showForm, setShowForm }) {
  async function handleLogout() {
    await supabase.auth.signOut();
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
      ) : null}
    </header>
  );
}

export default Header;
