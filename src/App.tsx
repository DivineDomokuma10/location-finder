import { useEffect, useState } from "react";

function App() {
  const [coords, setCoords] = useState<[number, number] | []>([]);
  const [location, setLocation] = useState<object | null>(null);

  const getCoords = () => {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords([latitude, longitude]);
        },

        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
      console.log("can get location..");
    } else {
      console.log("cannot get location..");
    }
  };

  const getLocation = async () => {
    try {
      const locationResp = await fetch(
        `https://geocode.maps.co/reverse?lat=${coords[0]}&lon=${coords[1]}&api_key=67a5a8b248ed5320045324oen673720`
      );

      const result = await locationResp.json();

      setLocation(result);

      console.log(location);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getCoords(), []);
  return (
    <div>
      <h1>Location App</h1>
      {JSON.stringify(location)}
      <button onClick={getLocation}>get location</button>
    </div>
  );
}

export default App;

// https://geocode.maps.co/reverse?lat=latitude&lon=longitude&api_key=67a5a8b248ed5320045324oen673720

//key- 67a5a8b248ed5320045324oen673720
