import { useEffect, useState } from "react";
import styles from "./InputBox.module.css";

function InputBox() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    const filtered = cities.filter((c) => c.startsWith(value));
    setFilteredCities(filtered);

    if (value && filtered.length > 0) {
      setSuggestion(filtered[0]);
    } else {
      setSuggestion("");
    }

  
    const exactMatch = cities.find((c) => c === value);
    if (exactMatch) {
      setSuccess(`✅ You selected: ${exactMatch}`);
      setFilteredCities([]);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setSuccess("");
    }
  };

  const handleSelect = (name) => {
    setCity(name);
    setFilteredCities([]);
    setSuccess(`✅ You selected: ${name}`);
    setTimeout(() => setSuccess(""), 3000);
  };

  useEffect(() => {
    const getCity = async () => {
      try {
        const res = await fetch("/cities.json");
        if (!res.ok) throw new Error("Failed to load cities");
        const json = await res.json();
        setCities(json);
      } catch (err) {
        setError("❌ Failed to load city list");
        setTimeout(() => setError(""), 4000);
      }
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
        {suggestion && <span className={styles.suggestion}>{suggestion}</span>}
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

   
      {!success && city && filteredCities.length === 0 && (
        <div className={styles.toast}>No city found 😕</div>
      )}

      {error && <div className={styles.errorToast}>{error}</div>}

      {success && <div className={styles.successToast}>{success}</div>}
    </div>
  );
}

export default InputBox;
