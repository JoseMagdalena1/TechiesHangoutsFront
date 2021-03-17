import React, { useState } from "react";

export function Filter({ data, label, handleChange }) {
  return (
    <React.Fragment>
      <label>{label}</label>
      <select onChange={handleChange}>
        <option value="nada">----------------------</option>
        {data.map(d => {
          return (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
}
