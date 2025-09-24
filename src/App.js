import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PrayerList from "./components/PrayerList";
import AddPrayerForm from "./components/AddPrayerForm";
import About from "./components/About";
import supabase from "./supabaseClient";
import "./styles.css";
import DeleteAccount from "./components/DeleteAccount";

function App() {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState("");
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

  /* Persist data using supabase session */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* Fetch prayers list for current user from Prayers table in supabase. */
  useEffect(
    function () {
      async function getPrayers() {
        if (!session) return;
        setIsLoading(true);
        let query = supabase
          .from("prayers")
          .select("*")
          .eq("user_id", session.user.id);
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
    [currentCategory, session]
  );

  /* Fetch the username from user_profiles table in supabase. */
  useEffect(() => {
    if (!session) return;

    async function getUsername() {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();

      if (!error) setUsername(profile.username);
      else console.error("Failed to fetch username:", error.message);
    }

    getUsername();
  }, [session]);

  return (
    <div id="root">
      <Header
        isLoggedIn={!!session}
        showForm={showForm}
        setShowForm={setShowForm}
        username={username}
        setUsername={setUsername}
      />

      {/* Show About only when not logged in */}
      {!session && <About />}

      {/* Show main app content only when logged in or user wants to test */}
      {session && (
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
                username={username}
              />
            )}
            <DeleteAccount />
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
