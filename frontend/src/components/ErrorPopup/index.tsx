import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.module.css";

interface ErrorProps {
  message: string;
  close(): void;
}
export default function ErrorPopup({ message, close }: ErrorProps) {
  return (
    <div id="error">
      <p>{message}</p>
      <button type="button" title="Remove error warning">
        <FontAwesomeIcon icon={faXmark} onClick={close} />
      </button>
    </div>
  );
}
