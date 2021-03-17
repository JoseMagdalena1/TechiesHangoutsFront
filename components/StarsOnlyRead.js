import React, { useState, useEffect } from "react";
import { Rating } from "@material-ui/lab";
import { getUserRatings } from "../http/ratingsService";
import { mediaRatings } from "../http/usefulFunctions";

export function StarsOnlyRead({ id, tamaño }) {
  const [ratings, setValue] = useState([]);
  const media = mediaRatings(ratings);

  //const aleatorio = Math.round(Math.random() * 5);

  useEffect(() => {
    getUserRatings(id)
      .then(response => setValue(response.data))
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Rating
        name="read-only"
        value={isNaN(media) ? 0 : media}
        readOnly={true}
        precision={0.5}
        size={tamaño}
      />
      {ratings.length === 1 ? (
        <span className="block">{`${ratings.length} voto`}</span>
      ) : (
        <span className="block">{`${ratings.length} votos`}</span>
      )}
    </React.Fragment>
  );
}
