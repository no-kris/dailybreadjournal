import { useState } from "react";
import supabase from "../supabaseClient";

function AddPrayerForm({ categories, setShowForm, setPrayersList }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;
  const MAX_LENGTH = 700;

  function handleTextChange(ev) {
    const newText = ev.target.value;
    if (newText.length <= MAX_LENGTH) {
      setText(newText);
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (text && category) {
      setIsUploading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to add a prayer.");
        setIsUploading(false);
        return;
      }
      const { data: newPrayer, error } = await supabase
        .from("prayers")
        .insert([{ text, category, user_id: user.id }])
        .select();
      setIsUploading(false);
      if (!error) setPrayersList((prev) => [newPrayer[0], ...prev]);
      else alert("An error occurred inserting data.");
      setText("");
      setShowForm(false);
    }
  }

  return (
    <form className="prayer-form" onSubmit={handleSubmit}>
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
