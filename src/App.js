import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PrayerList from "./components/PrayerList";
import AddPrayerForm from "./components/AddPrayerForm";
import About from "./components/About";
import supabase from "./supabaseClient";
import "./styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prayersList, setPrayersList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all prayers");
  const categories = [
    { name: "General", color: "#3b82f6" },
    { name: "Thanksgiving", color: "#eab308" },
    { name: "Requests", color: "#ef4444" },
    { name: "Healing", color: "#16a34a" },
  ];

  useEffect(
    function () {
      async function getPrayers() {
        setIsLoading(true);
        let query = supabase.from("prayers").select("*");
        if (currentCategory !== "all prayers") {
          query = query.eq("category", currentCategory);
        }
        const { data: prayers, error } = await query;
        if (!error) setPrayersList(prayers);
        else alert("An error ocurred fetching data.");
        setIsLoading(false);
      }
      getPrayers();
    },
    [currentCategory]
  );

  return (
    <div id="root">
      <Header
        isLoggedIn={isLoggedIn}
        showForm={showForm}
        setShowForm={setShowForm}
      />

      {/* Show About only when not logged in */}
      {!isLoggedIn && <About />}

      {/* Show main app content only when logged in or user wants to test */}
      {isLoggedIn && (
        <>
          {/* Optional form */}
          {showForm && (
            <AddPrayerForm
              categories={categories}
              setShowForm={setShowForm}
              setPrayersList={setPrayersList}
            />
          )}

          {/* Main content */}
          <main className="main">
            <Sidebar
              categories={categories}
              setCurrentCategory={setCurrentCategory}
            />
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
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="message">loading...</p>;
}

export default App;
