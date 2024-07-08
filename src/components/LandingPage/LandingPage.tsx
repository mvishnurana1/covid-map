import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./LandingPage.scss";

interface landingPageProps {
  setLandingPage: Dispatch<SetStateAction<boolean>>;
  landingPage: boolean;
}

const LandingPage: React.FC<landingPageProps> = ({
  setLandingPage,
  landingPage,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json", // replace with your style URL
        center: [0, 0], // initial map center in [lon, lat]
        zoom: 2, // initial map zoom level
      });

      map.current.on("load", () => {});
    }
  }, []);

  return (
    <div className="container" style={{ width: "100vw", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }}></div>
      <div className="overlay" style={{ width: "100vw", height: "100vh" }}>
        <div
          style={{
            alignItems: "center",
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            height: "100vh",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div>
              <img
                width={"100px"}
                src={"../../../public/coronavirus.png"}
                alt=""
              />
            </div>
            <div
              style={{
                fontWeight: "600",
                fontFamily: "sans-serif",
                lineHeight: "1.7rem",
                fontSize: "2rem",
              }}
            >
              Covid Mapper
            </div>
            <span
              style={{
                fontWeight: "400",
                fontFamily: "sans-serif",
                lineHeight: "1.7rem",
                fontSize: "1.2rem",
              }}
            >
              Global Insights at Your Fingertips
            </span>
            <div>Click to Reveal COVID-19 Stats for Any Country</div>
          </div>

          <div>
            <button
              onClick={() => {
                setLandingPage(!landingPage);
                localStorage.setItem("started", "true");
              }}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
