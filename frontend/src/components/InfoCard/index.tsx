import {
  faBasketball,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVRow } from "@shared/types";
import "./styles.module.css";

export default function InfoCard({
  name,
  city,
  country,
  favorite_sport,
}: CSVRow) {
  return (
    <div className="info-card" data-testid="info-card">
      <div className="info-item">
        <FontAwesomeIcon icon={faUser} />
        <h1 className="info-item">{name}</h1>
      </div>
      <div className="info-item">
        <FontAwesomeIcon icon={faHome} />
        <p className="info-item">
          {city}, {country}
        </p>
      </div>
      <div className="info-item">
        <FontAwesomeIcon icon={faBasketball} />
        <p className="info-item"> {favorite_sport} </p>
      </div>
    </div>
  );
}
