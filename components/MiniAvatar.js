import React, { useState, useEffect } from "react";
import { getAvatar } from "../http/profileService";

export function MiniAvatar({ url }) {
  return (
    <React.Fragment>
      <img src={url} className="miniAvatar" alt="Avatar usuario" />
    </React.Fragment>
  );
}
