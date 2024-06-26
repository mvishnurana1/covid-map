import Map from "./components/Map/Map";
import "./App.scss";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const hasStarted: boolean =
    JSON.parse(localStorage.getItem("started")!) ?? true;

  const [landingPage, setLandingPage] = useState(hasStarted);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("started");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  return (
    <div>
      {landingPage && (
        <LandingPage
          setLandingPage={setLandingPage}
          landingPage={landingPage}
        />
      )}
      <Map />
    </div>
  );
}

export default App;
