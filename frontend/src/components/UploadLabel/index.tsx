import { FormEvent } from "react";
import "./styles.module.css";

interface UploadLabel {
  filename?: string;
  handleFileChange(e: FormEvent<HTMLInputElement>): void;
}
export default function UploadLabel({
  handleFileChange,
  filename,
}: UploadLabel) {
  return (
    <label className="upload-label">
      <input
        key={filename}
        type="file"
        accept="text/csv"
        onChange={handleFileChange}
      />
      Upload
    </label>
  );
}
