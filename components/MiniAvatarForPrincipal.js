import React from "react";

export function MiniAvatarForPrincipal({ event }) {
  return (
    <React.Fragment>
      <img src={event.avatar_url} className="miniAvatar" alt="Avatar usuario" />
    </React.Fragment>
  );
}
