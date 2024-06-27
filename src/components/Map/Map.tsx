import { useEffect, useRef, useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinimize, faMaximize } from "@fortawesome/free-solid-svg-icons";
import maplibregl from "maplibre-gl";
import CountryCovidInfo from "../CountryCovidInfo/CountryCovidInfo";
import { IBookMark, ICovidResponse } from "../../models/models";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.scss";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const storedBookMarks = localStorage.getItem("bookmarks");

  const [locationInfo, setLocationInfo] = useState<string>("");
  const [covidData, setCovidData] = useState<ICovidResponse>();
  const [bookmarks, setBookmarks] = useState<IBookMark[]>(
    JSON.parse(storedBookMarks!) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(true);

  useEffect(() => {
    if (!map.current && map) return;
    bookmarks.forEach((bookmark) => {
      new maplibregl.Marker()
        .setLngLat([parseFloat(bookmark.lng), parseFloat(bookmark.lat)])
        .addTo(map.current as maplibregl.Map);
    });
  }, [bookmarks]);

  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: [
                "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [
            {
              id: "osm-tiles",
              type: "raster",
              source: "osm",
              minzoom: 0,
              maxzoom: 19,
            },
          ],
          center: [0, 0],
          zoom: 2,
        },
      });

      map.current.on("load", () => {});

      map.current.on("click", async (e) => {
        const { lng, lat } = e.lngLat;

        const newBookmark: IBookMark = {
          lng: lng.toString(),
          lat: lat.toString(),
        };

        setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);

        localStorage.setItem(
          "bookmarks",
          JSON.stringify([...bookmarks, newBookmark])
        );

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const country = data.address.country || "Unknown location";
        setLocationInfo(data.address.country || "Unknown location");

        if (country && country !== "Unknown location") {
          setLoading(true);

          try {
            const response = await fetch(
              `https://disease.sh/v3/covid-19/countries/${country}`
            );

            const responseJson = await response.json();

            setCovidData(responseJson);
            setLoading(false);
          } catch (err) {
            console.log("ERRRRRR");
            console.log("oh shit! ", err);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    ) as IBookMark[];
    setBookmarks(savedBookmarks);
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }}>
        Load Map
      </div>

      {locationInfo && (
        <div className="info-box">
          <div>
            <FontAwesomeIcon
              className="red"
              title={!displayInfo ? "Maximise" : "Minimise"}
              icon={!displayInfo ? faMaximize : faMinimize}
              onClick={() => setDisplayInfo(!displayInfo)}
            />
          </div>
          {displayInfo && (
            <div>
              {!loading && (
                <div className="centre">
                  <h1 className="country-title">{locationInfo}</h1>
                </div>
              )}
              {covidData && !loading && (
                <CountryCovidInfo covidData={covidData} />
              )}
              {loading && (
                <ClipLoader
                  color="#ffffff"
                  loading={loading}
                  cssOverride={override}
                  size={150}
                  aria-label="Loading Spinner"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Map;
