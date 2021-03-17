import React, { useState, useEffect } from "react";
import { Rating } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { createRating, getCreatedRatings } from "../http/ratingsService";
import { useAuth } from "../context/auth-context";
import { isThisRatingMade } from "../http/usefulFunctions";

export function StarsForRating({ hangoutId, user_id }) {
  const [value, setValue] = useState(undefined);
  const [madeRatings, setMadeRatings] = useState([]);
  const [props, setProps] = useState(undefined);

  const { currentUser } = useAuth();
  const wasLoaded = value !== undefined;
  const rating = value >= 0 ? value : 0;

  useEffect(() => {
    getCreatedRatings(currentUser.userId, hangoutId)
      .then(response => setMadeRatings(response.data))
      .catch(error => console.error(error));
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
    const ratingData = {
      id_rated: user_id,
      rating: parseInt(e.target.value)
    };

    createRating(hangoutId, ratingData)
      .then(response => {
        window.location.reload();
      })
      .catch(err => console.error(err));
  }

  if (!wasLoaded && madeRatings.length > 0) {
    const votacionYaRealizada = isThisRatingMade(madeRatings, user_id);
    if (!!votacionYaRealizada) {
      console.log(votacionYaRealizada.rating);
      setValue(votacionYaRealizada.rating);
      setProps("disabled");
    } else {
      setValue(-1);
    }
    console.log({ votacionYaRealizada });
  }

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name={`simple-controlled-${hangoutId}-${user_id}`}
          value={rating}
          size="large"
          onChange={handleChange}
          disabled={props !== undefined ? true : false}
        />
        {props !== undefined && (
          <span className="block">Ya has votado a este usuario</span>
        )}
      </Box>
    </div>
  );
}
