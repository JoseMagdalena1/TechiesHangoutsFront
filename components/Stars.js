import React, { useState, useEffect } from "react";
import { Rating } from "@material-ui/lab";
import { getUserRatings } from "../http/ratingsService";

export function Stars({ id, talla, ...others }) {
  const [ratings, setValue] = useState([]);

  const mediaRatings = array => {
    const numberOfRatings = array.length;
    let counter;
    array.map(data => {
      counter += data.rating;
    });

    const media = counter / numberOfRatings;
    return media;
  };

  useEffect(() => {
    getUserRatings(id)
      .then(response => setValue(response.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Rating
      name="puntuacion"
      value={id !== undefined ? mediaRatings(ratings) : 0}
      size={talla}
      {...others}
    />
  );
}
