import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder, faChartPie, faCodeBranch, faFire,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <nav id="navBar" className="menu">
      <label style={{ color: 'transparent' }}>
        Menu
        <input defaultChecked={0} className="menu-toggler" type="checkbox" />
      </label>
      <ul>
        <li className="menu-item">
          <a
            href="#filesystem"
            aria-label="File System"
            onClick={() => document.getElementById('renderFilesystem').click()}
          >
            <FontAwesomeIcon icon={faFolder} />
          </a>
        </li>
        <li className="menu-item">
          <a
            href="#dashboard"
            aria-label="Dashboard"
            onClick={() => document.getElementById('renderDashboard').click()}
          >
            <FontAwesomeIcon icon={faChartPie} />
          </a>
        </li>
        <li className="menu-item">
          <a
            href="https://github.com/ivan-drr/SpotSlot"
            target="_blank"
            aria-label="Github"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faCodeBranch} />
          </a>
        </li>
        <li className="menu-item">
          <a
            href="https://firebase.google.com/"
            target="_blank"
            aria-label="Firebase"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFire} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
