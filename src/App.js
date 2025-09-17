import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import PrayerList from "./components/PrayerList";
// import AddPrayerForm from "./components/AddPrayerForm";
import "./styles.css";
import AddPrayerForm from "./components/AddPrayerForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
          <section>{/* <PrayerList /> */}</section>
        </main>
      </div>
    </>
  );
}

export default App;
