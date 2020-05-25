import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder, faChartPie, faCodeBranch, faFire,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <nav id="navBar" className="menu">
      <input defaultChecked={0} className="menu-toggler" id="menu-toggler" type="checkbox" />
      <label style={{ color: 'transparent' }} htmlFor="menu-toggler">Menu</label>
      <ul>
        <li className="menu-item">
          <a
            href="#filesystem"
            className="item"
            aria-label="File System"
            onClick={() => {
              document.getElementById('renderFilesystem').click();
              document.getElementById('menu-toggler').click();
            }}
          >
            <FontAwesomeIcon icon={faFolder} />
          </a>
        </li>
        <li className="menu-item">
          <a
            href="#dashboard"
            className="item"
            aria-label="Dashboard"
            onClick={() => {
              document.getElementById('renderDashboard').click();
              document.getElementById('menu-toggler').click();
            }}
          >
            <FontAwesomeIcon icon={faChartPie} />
          </a>
        </li>
        <li className="menu-item">
          <a
            href="https://github.com/ivan-drr/SpotSlot"
            className="item"
            target="_blank"
            aria-label="Github"
            rel="noopener noreferrer"
            onClick={() => document.getElementById('menu-toggler').click()}
          >
            <FontAwesomeIcon icon={faCodeBranch} />
          </a>
        </li>
        <li className="menu-item">
          <a
            href="https://firebase.google.com/"
            className="item"
            target="_blank"
            aria-label="Firebase"
            rel="noopener noreferrer"
            onClick={() => document.getElementById('menu-toggler').click()}
          >
            <FontAwesomeIcon icon={faFire} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
