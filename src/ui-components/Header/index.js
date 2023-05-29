import { useRef } from "react";
import {
  IoNotificationsOutline,
} from "react-icons/io5";
import DropdownMenu from "../DropdownMenu";
import IconWrapper from "../IconWrapper";
import UserIcon from "../UserIcon";
import styles from "./Header.module.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Link from "next/link";
import { headerLoginMenuList, menuList } from "../../data";

/*

Dropdown Menu Guideline and Instructions
Dropdown Menu props are
    label: string
    CustomMenu: React Component
    dropdownContainerStyle: style object
    children: React Component

    Note: label or CustomMenu only one can be used at a time
    CustomMenu has higher priority if CustomMenu has passed as
    props then label wont work but if CustomMenu has not given
    then label will be visible


*/

const Header = ({ toggleSidebarMenu }) => {
  return (
    <section className={styles.container}>
      <div className={styles["left-items"]}>
        <ul>
          <li>
            <button
              className={styles["close-sidemenu"]}
              onClick={toggleSidebarMenu}
            >
              <HiOutlineMenuAlt1 />
            </button>
          </li>
          <li>
            <Link href={'/'}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              Users
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Header;
