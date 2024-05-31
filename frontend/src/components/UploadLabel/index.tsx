import { FormEvent } from "react";
import "./styles.css";

interface UploadLabel {
  filename?: string;
  handleFileChange(e: FormEvent<HTMLInputElement>): void;
}
export default function UploadLabel({
  handleFileChange,
  filename,
}: UploadLabel) {
  return (
    <label htmlFor="file-input" className="upload-label">
      <input
        name="file-input"
        id="file-input"
        key={filename}
        type="file"
        accept="text/csv"
        onChange={handleFileChange}
      />
      Upload
    </label>
  );
}
