import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import nav from './Navbar.module.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={nav.navbar}>
          <Link to="#" className={nav.menuBars}>
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? `${nav.navMenu} ${nav.active}` : nav.navMenu}>
          <ul className={nav.navMenuItems} onClick={showSidebar}>
            <li className={nav.navbarToggle}>
              <Link to="#" className={nav.menuBars}>
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
