import React from "react";
import { MiniAvatar } from "../components/MiniAvatar";

import { StarsForRating } from "./StarsForRating";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function MiniCardHangoutRating({ user, eventId }) {
  const { user_id } = user;
  const history = useHistory();

  const { currentUser } = useAuth();

  const visible = currentUser.userId === user_id ? false : true;

  return (
    <div className="miniCard">
      <ul
        onClick={() => history.push(`/profile/${user.user_id}`)}
        id="miniCard-info"
      >
        <li>
          <MiniAvatar url={user.avatar_url} />
        </li>
        <li>{user.userName}</li>
        <li>{user.position}</li>
      </ul>
      {visible && (
        <div id="miniStars">
          <StarsForRating hangoutId={eventId} user_id={user_id} />
        </div>
      )}
    </div>
  );
}
