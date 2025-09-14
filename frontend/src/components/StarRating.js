import React from "react";
import "./StarRating.css";

export default function StarRating({ value, onChange }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= value ? "star filled" : "star"}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
