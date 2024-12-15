import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode.jsx";
import { FaCaretDown } from "react-icons/fa";
import PropTypes from 'prop-types';
import Logo from "../../assets/logo.png";
import { FaUser } from "react-icons/fa"; 
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [Menu, setMenu] = useState([]);
  const [DropdownLinks, setDropdownLinks] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:3001/danhmuc');
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    const fetchDropdownLinks = async () => {
      try {
        const response = await fetch('http://localhost:3001/danhmuc');
        const data = await response.json();
        setDropdownLinks(data);
      } catch (error) {
        console.error('Error fetching dropdown links:', error);
      }
    };

    fetchMenu();
    fetchDropdownLinks();
  }, []);

  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
        <div className="container py-3 md:py-0">
          <div className="flex justify-between items-center">
            <div>
              <a href="#" className="text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10 uppercase" />
                <span className="font-bold">TheBOYs</span>
              </a>
            </div>
            <div className="flex justify-between items-center gap-2 lg:gap-8">
              
                
          
              <ul className="hidden md:flex items-center gap-4">
                {Menu.slice(0,2).map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
                {/* Simple Dropdown and Links */}
                <li className="group relative cursor-pointer">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Quick Links{" "}
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <button
                  className="hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:scale-105 duration-200 py-1 px-4 rounded-full"
                >
                  <FaCartShopping className="text-xl text-black dark:text-white drop-shadow-sm cursor-pointer" />
                </button>
                <button
                  className="hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:scale-105 duration-200 py-1 px-4 rounded-full"
                >
                  <FaUser className="text-xl text-black dark:text-white drop-shadow-sm cursor-pointer" />
                </button>
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired
};

export default Navbar;
