import styles from "./CountryItem.module.css";
import { DataType } from "./model";
import { flagEmojiToPNG } from "./util";

type CountryItemProps = {
  country: DataType;
};

const CountryItem = ({ country }: CountryItemProps) => {
  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;
