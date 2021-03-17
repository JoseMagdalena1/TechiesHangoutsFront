import React, { useState, useEffect } from "react";
import { Stars } from "./Stars";
import { getProfile } from "../http/profileService";
import { StarsOnlyRead } from "./StarsOnlyRead";
import { useHistory } from "react-router-dom";

export function AvatarContainer({ id }) {
  const [profile, setProfile] = useState({});
  const history = useHistory();
  useEffect(() => {
    getProfile(id).then(response => setProfile(response.data[0]));
  }, []);

  const hasProfile = Object.keys(profile).length > 0;
  if (!hasProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div
      onClick={() => history.push(`/profile/${id}`)}
      className="AvatarContainer"
    >
      <div id="avatar">
        {<img alt="Foto de avatar" src={profile.avatar_url} /> || "Loading..."}
      </div>
      <span className="span">
        <StarsOnlyRead tamaño={"large"} id={profile.user_id} />
      </span>
      <div id="name">
        <h1>{profile.name}</h1>
      </div>
    </div>
  );
}
