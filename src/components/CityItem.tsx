import { DataType } from "./model";
import styles from "./CityItem.module.css";
import { flagEmojiToPNG, formatDate } from "./util";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

type CityItemProps = {
  city: DataType;
};

const CityItem = ({ city }: CityItemProps) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteCity(city.id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => handleDelete(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
