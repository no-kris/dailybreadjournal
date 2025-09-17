function Header({ isLoggedIn, showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="images/logo.png" alt="Stylized logo" className="logo-img" />
        <h1>Daily Bread Journal</h1>
      </div>
      {isLoggedIn ? (
        <button
          className="btn btn-large btn-share"
          onClick={() => setShowForm((showForm) => !showForm)}
        >
          {showForm ? "Close" : "Add New Prayer"}
        </button>
      ) : (
        <div className="auth-buttons">
          <button className="btn btn-large">Log In</button>
          <button className="btn btn-large">Sign Up</button>
        </div>
      )}
    </header>
  );
}

export default Header;
