import styles from "./Input.module.css";

/* eslint-disable react/prop-types */
const Input = ({ handleChange, hint, value }) => {
  return (
    <div className={styles.input}>
      <label htmlFor="input">
        {hint}
      </label>
      <input
        type="text"
        id="input"
        value={value}
        onChange={handleChange}
        placeholder={hint}
      />
    </div>
  );
};

export default Input;
