import { useState } from "react";

function AddPrayerForm({ categories, setShowForm }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;
  const MAX_LENGTH = 200;

  function handleTextChange(ev) {
    const newText = ev.target.value;
    if (newText.length <= MAX_LENGTH) {
      setText(newText);
    }
  }

  return (
    <form className="prayer-form">
      <input
        type="text"
        placeholder="Add new prayer..."
        value={text}
        onChange={handleTextChange}
      />
      <span>{MAX_LENGTH - textLength}</span>
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        disabled={isUploading}
      >
        <option value="" selected>
          Choose a category
        </option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="btn" disabled={isUploading}>
        Add Prayer
      </button>
    </form>
  );
}

export default AddPrayerForm;
