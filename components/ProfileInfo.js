import React, { useState, useEffect } from "react";
import logoFacebook from "../img/facebook.svg";
import logoTwitter from "../img/twitter.svg";
import logoInstagram from "../img/instagram.svg";
import { getProfile } from "../http/profileService";

export function ProfileInfo({ id }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile(id).then(response => setProfile(response.data[0]));
  }, [id]);

  const hasProfile = Object.keys(profile).length > 0;
  if (!hasProfile) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <div className="infoperfil">
        <ul>
          <label>Nombre</label>
          <li>{profile.name}</li>
          <label>Edad</label>
          <li>{profile.age}</li>
          <label>Cargo que desempeña</label>
          <li>{profile.position}</li>
          <label>Categoría Profesional </label>
          <li>{profile.category}</li>
          <label>Universidad</label>
          <li>{profile.university_id}</li>
          <label>Linkedin</label>
          <li>{profile.link_url}</li>
          <label>Descripción</label>
          <li>{profile.aboutMe}</li>
        </ul>
      </div>
      <h3 className="enlaces">enlaces a tus redes sociales</h3>
      <div id="enlacesRRSS">
        <li>
          <a href="https://www.instagram.com/">
            <img src={logoInstagram} alt="logo insta" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/">
            <img src={logoFacebook} alt="logo facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com/">
            <img src={logoTwitter} alt="logo twitter" />
          </a>
        </li>
      </div>
    </React.Fragment>
  );
}
