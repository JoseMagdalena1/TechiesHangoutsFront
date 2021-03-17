import React from "react";
import { MiniAvatar } from "../components/MiniAvatar";
import { StarsOnlyRead } from "./StarsOnlyRead";
import { useHistory } from "react-router-dom";

export function MiniCardHangout({ user }) {
  const history = useHistory();

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

      <div id="miniStars">
        <StarsOnlyRead talla="small" id={user.user_id} />
      </div>
    </div>
  );
}
