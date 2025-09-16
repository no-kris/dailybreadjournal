import { useState } from "react";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import PrayerList from "./components/PrayerList";
// import AddPrayerForm from "./components/AddPrayerForm";
import "./styles.css";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useState(false);

  return (
    <>
      <div id="root">
        <Header isLoggedIn={isLoggedIn} />
        <main className="main">
          {/* <Sidebar />
        <section>
          <AddPrayerForm />
          <PrayerList />
        </section> */}
        </main>
      </div>
    </>
  );
}

export default App;
