import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PrayerList from "./components/PrayerList";
import AddPrayerForm from "./components/AddPrayerForm";
import "./styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prayersList, setPrayersList] = useState([
    {
      id: 1,
      text: "Thank You Lord for a new day and Your blessings.",
      category: "Thanksgiving",
    },
    {
      id: 2,
      text: "Please bring healing to my friend who is sick.",
      category: "Healing",
    },
    {
      id: 3,
      text: "Guide me in my work decisions this week.",
      category: "Requests",
    },
    {
      id: 4,
      text: "Help me grow in faith and trust in You.",
      category: "General",
    },
  ]);
  const categories = [
    { name: "General", color: "#3b82f6" },
    { name: "Thanksgiving", color: "#eab308" },
    { name: "Requests", color: "#ef4444" },
    { name: "Healing", color: "#16a34a" },
  ];

  return (
    <>
      <div id="root">
        <Header
          isLoggedIn={isLoggedIn}
          showForm={showForm}
          setShowForm={setShowForm}
        />
        {showForm ? (
          <AddPrayerForm categories={categories} setShowForm={setShowForm} />
        ) : null}
        <main className="main">
          <Sidebar categories={categories} />{" "}
          {isLoading ? (
            <Loader />
          ) : (
            <PrayerList
              prayersList={prayersList}
              setPrayersList={setPrayersList}
              categories={categories}
            />
          )}
        </main>
      </div>
    </>
  );
}

function Loader() {
  return <p className="message">loading...</p>;
}

export default App;
