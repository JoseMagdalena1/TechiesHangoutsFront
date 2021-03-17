import React from "react";

import { MiniAvatarForPrincipal } from "./MiniAvatarForPrincipal";
import { StarsOnlyRead } from "./StarsOnlyRead";

export function AsistenteQuedada({ event }) {
  return (
    <div className="asistente">
      <ul>
        <li>
          <MiniAvatarForPrincipal event={event} />
        </li>
        <li>
          {event.userName} , {event.position}
        </li>
        <li>
          <StarsOnlyRead talla="" id={event.user_id} />
        </li>
      </ul>
    </div>
  );
}
