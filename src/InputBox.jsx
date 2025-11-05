import { useEffect, useState } from "react";
import styles from "./InputBox.module.css";

function InputBox() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    const filtered = cities.filter((c) => c.startsWith(value));

    if (value && filtered.length > 0) {
      const first = filtered[0];
      setSuggestion(first);
    } else {
      setSuggestion("");
    }

    setFilteredCities(filtered);
  };

  const handleSelect = (name) => {
    setCity(name);
    setFilteredCities([]);
  };

  useEffect(() => {
    const getCity = async () => {
      const res = await fetch("/cities.json");
      const json = await res.json();
      setCities(json);
    };
    getCity();
  }, []);

  return (
   
      <div className={styles.container}>
        <h1>Developer Mehdi Chekav</h1>
        <div className={styles.inputWrapper}>
          <input
            type="search"
            value={city}
            onChange={handleChange}
            placeholder="Type city name..."
          />
          {suggestion && (
            <span className={styles.suggestion}>{suggestion}</span>
          )}
        </div>

        {city && filteredCities.length > 0 && (
          <ul className={styles.list}>
            {filteredCities.map((name) => (
              <li key={name} onClick={() => handleSelect(name)}>
                <span style={{ fontWeight: "bold", color: "#3874ff" }}>
                  {name.slice(0, city.length)}
                </span>
                {name.slice(city.length)}
              </li>
            ))}
          </ul>
        )}
      </div>
   
  );
}

export default InputBox;
