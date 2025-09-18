function Sidebar({ categories, setCurrentCategory }) {
  return (
    <aside>
      <p className="message">Filter By Category</p>
      <div className="sidebar">
        <button
          className="btn btn-category"
          onClick={() => setCurrentCategory("all prayers")}
        >
          All Prayers
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="btn btn-category"
            onClick={() => setCurrentCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
