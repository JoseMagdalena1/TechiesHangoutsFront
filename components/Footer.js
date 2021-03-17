import React from "react";
import logoLinkedin from "../img/linkedin.svg";
import logoFacebook from "../img/facebook.svg";
import logoTwitter from "../img/twitter.svg";
import logoInstagram from "../img/instagram.svg";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="hack">(c) 2020 Hack a Boss</p>
      </div>
      <div className="nombres">
        <h2 className="name">
          <p>Alejandro Castro Alarcón</p>
          <p>Jose Manuel Magdalena Perez</p>
        </h2>
      </div>
      <div className="logos">
        <h4>siguenos en nuestras redes sociales</h4>
        <ul id="ulfooter">
          <li>
            <a href="https://www.linkedin.com/">
              <img src={logoLinkedin} alt="logo linkedin" />
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

          <li>
            {" "}
            <a href="https://www.instagram.com/">
              <img src={logoInstagram} alt="logo insta" />
            </a>
          </li>
        </ul>
      </div>

      <ul className="email">
        <li>josemagdalenap@gmail.com</li>
        <li>jandroportonovo@hotmail.com</li>
      </ul>
    </footer>
  );
}
