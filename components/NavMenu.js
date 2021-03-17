import React from "react";

export function NavMenu() {
  return (
    <nav className="navMenu">
      <ul>
        <li>
          <a href="/principal">
            <label>
              Dashboard
              <img
                alt="Home-figure"
                src="https://image.flaticon.com/icons/svg/846/846551.svg"
              />
            </label>
          </a>
        </li>
        <li>
          <a href="/myhangouts">
            <label>Your Hangouts</label>
            <img
              alt="Event-figure"
              src="https://image.flaticon.com/icons/svg/566/566245.svg"
            />
          </a>
        </li>
        <li>
          <a href="/notifications">
            <label>Notifications</label>
            <img
              alt="Notification-figure"
              src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
            />
          </a>
        </li>
        <li>
          <a href="/options">
            <label>Options</label>
            <img
              alt="Settings-figure"
              src="https://image.flaticon.com/icons/svg/2099/2099174.svg"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
}
