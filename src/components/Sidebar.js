function Sidebar({ categories }) {
  return (
    <aside>
      <p className="message">Filter By Category</p>
      <div className="sidebar">
        <button className="btn btn-category">All Prayers</button>
        {categories.map((cat) => (
          <button key={cat.name} className="btn btn-category">
            {cat.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
