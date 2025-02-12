"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  FormControl,
} from "react-bootstrap";
import { FaHeadset } from "react-icons/fa";
import { GoSearch, GoBell } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
// import defaultProfile from "../../../public/images/default profile.jpg";
import { CodeupButton } from "../utils";
import Wrapper, { StyledOffCanvas } from "./style";
import { signIn, signOut, useSession } from "next-auth/react"; // Import NextAuth
import { requestNotificationPermission } from "../../../public/helper/pushNotification";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../../public/helper/firebase";
import NotificationsComponent from "../NotificationComponent";
import logoL from "../../../public/images/oneup-black.png";
import logoD from "../../../public/images/oneup-white.png";
import { addNotification } from "../../../public/helper/indexDB/db.js";

const linkData = [
  { isDropDown: false, name: "Home", link: "/" },
  { isDropDown: false, name: "Support", link: "/support" },
  {
    isDropDown: true,
    name: "About",
    dropDown: [
      { name: "About Us", link: "/aboutus" },
      { name: "Contact Us", link: "/contactus" },
    ],
  },
  { isDropDown: false, name: "Become a creator", link: "/creator" },
];

const Header = ({
  logoLight = logoL,
  logoDark = logoD,
  showLogo = true,
  links = linkData,
  showSupport = false,
  showSearch = false,
  showNotification = false,
  showProfile = false,
  theme = "light",
  setTheme,
}) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const notificationRef = useRef(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleToggleSearch = () => {
    setShowSearchBar((prevState) => {
      if (!prevState) {
        setTimeout(() => searchInputRef.current?.focus(), 50); // Focus the input when the bar is shown
      }
      return !prevState;
    });
  };
  const searchInputRef = useRef(null); // Ref to access the search input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationDropdown(false);
      }
    };

    if (showNotificationDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotificationDropdown]);

  const isSafari = () => {
    return (
      typeof window !== "undefined" &&
      /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
    );
  };

  // useEffect(() => {
  //   onMessage(messaging, (payload) => {
  //     console.log("Received foreground message:", payload);
  //     const { title, body } = payload.notification;

  //     console.log("Notification Title:", title);
  //     console.log("Notification Body:", body);
  //     //console.log("Notification Icon:", icon);

  //     // alert(`notification ${title} ${body}`);

  //     new Notification(title, {
  //       body: body || "Foreground Notification Body",
  //     });
  //     //console.log("forground", notification);

  //     // Show notification
  //   });
  // }, []);

  const shNotification = async (title, body) => {
    // Check for Notification permission
    await requestNotificationPermission();

    // Use the Notification constructor in the main thread
    new Notification(title, {
      body: body || "Foreground Notification Body",
      icon: "/images/oneup-black.png",
    });
  };

  useEffect(() => {
    const handleMessage = async (payload) => {
      console.log("Received foreground message:", payload);
      const { title, body } = payload.notification;

      // Store the notification in IndexedDB
      const notification = {
        title,
        body,
        timestamp: new Date().getTime(),
      };

      // Store the notification in IndexedDB
      await addNotification(notification);

      // Show the notification
      await shNotification(title, body);

      // Refresh the notifications list
      // fetchNotifications();
    };

    // Subscribe to the message listener
    const unsubscribe = onMessage(messaging, handleMessage);

    // Cleanup function to unsubscribe from the message listener
    return () => {
      unsubscribe();
    };
  }, []);

  const changeTheme = (e) => {
    e.stopPropagation();
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleRemoveText = () => {
    setSearchInput("");
    searchInputRef.current?.focus();
  };

  // Handle session state
  const { data: session } = useSession();

  return (
    <Wrapper theme={theme}>
      <Navbar
        bg={theme === "dark" ? "dark" : "light"}
        className={`shadow-sm navbar-${theme === "dark" ? "dark" : "light"}`}
        expand="lg"
      >
        <Container>
          {/* Navbar toggle for offcanvas (visible only on small screens) */}
          <Button
            variant="light"
            className="nav-toggle-btn d-lg-none p-1"
            aria-controls="offcanvas-navbar"
            onClick={handleToggleOffcanvas}
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          {/* Logo */}
          {showLogo && (
            <Navbar.Brand
              href="/"
              className="mr-auto d-lg-block d-none"
              style={{ marginRight: "auto", marginLeft: 8, lineHeight: 0 }}
            >
              <Image
                src={theme === "light" ? logoLight : logoDark}
                alt="Logo"
                height="30"
                width="auto"
              />
            </Navbar.Brand>
          )}

          {/* Inline nav links and dropdowns (visible on large screens) */}
          <Navbar.Collapse className="d-none d-lg-flex">
            <Nav className="ms-4">
              {links.map((link, index) =>
                link.isDropDown ? (
                  <NavDropdown
                    title={link.name}
                    id={`nav-dropdown-${index}`}
                    key={index}
                  >
                    {link.dropDown.map((item, idx) => (
                      <NavDropdown.Item href={item.link} key={idx}>
                        {item.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={link.link} key={index}>
                    {link.name}
                  </Nav.Link>
                )
              )}
            </Nav>
          </Navbar.Collapse>

          {/* Search Bar / Search Icon */}
          <div className="d-flex align-items-center position-relative">
            {showSearch && (
              <>
                {/* Search Bar */}
                <form
                  className={`search-bar-container ${
                    showSearchBar ? "d-flex" : "d-none"
                  } d-md-flex search-bar me-sm-3 me-2`} // Prevent form submission
                >
                  <Button
                    variant="link"
                    className={`${
                      showSearchBar ? "d-flex" : "d-none"
                    } d-md-none`}
                    title="close"
                    onClick={() => setShowSearchBar(false)}
                  >
                    <IoIosArrowBack
                      color={theme === "dark" ? "white" : "black"}
                      size={20}
                      strokeWidth={0.5}
                    />
                  </Button>
                  <FormControl
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    aria-label="Search"
                    style={{ width: "300px" }}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Button
                    variant="link"
                    className="search-icon-btn m-0"
                    title="Search"
                  >
                    <CgClose
                      onClick={handleRemoveText}
                      color={theme === "dark" ? "#919ba6" : "#575a5e"}
                      size={18}
                      strokeWidth={0.5}
                    />
                  </Button>
                </form>

                {/* Search Toggle Button (Visible on small screens) */}
                <Button
                  variant="link"
                  className={`search-icon-btn ${
                    showSearchBar ? "d-none" : "d-flex"
                  } d-md-none me-1`}
                  title="Search toggle"
                  onClick={handleToggleSearch}
                >
                  <GoSearch
                    color={theme === "dark" ? "#919ba6" : "#575a5e"}
                    size={18}
                    strokeWidth={0.5}
                  />
                </Button>
              </>
            )}

            {showNotification && (
              <>
                <Button
                  ref={notificationRef}
                  variant="link"
                  className="p-0 me-sm-3 me-2"
                  title="Notification"
                  onClick={async () => {
                    // Check if the token exists in localStorage
                    const storedToken = localStorage.getItem("fcmToken");

                    if (!storedToken) {
                      const value = await requestNotificationPermission();
                      if (value) {
                        setShowNotificationDropdown(!showNotificationDropdown);
                      }
                    } else {
                      setShowNotificationDropdown(!showNotificationDropdown);
                    }
                  }}
                >
                  <GoBell
                    color={theme === "dark" ? "#919ba6" : "#575a5e"}
                    size={18}
                    strokeWidth={0.5}
                  />
                </Button>
                {showNotificationDropdown && (
                  <div ref={notificationRef}>
                    <NotificationsComponent
                      theme={theme}
                      showNotificationDropdown={showNotificationDropdown}
                      setShowNotificationDropdown={setShowNotificationDropdown}
                    />
                  </div>
                )}
              </>
            )}
            {showSupport && (
              <a href="/support">
                <Button
                  variant="link"
                  className="p-0 me-sm-3 me-2"
                  title="Support"
                >
                  <FaHeadset
                    color={theme === "dark" ? "#919ba6" : "#575a5e"}
                    size={18}
                  />
                </Button>
              </a>
            )}

            {showProfile &&
              (session ? (
                <NavDropdown
                  title={
                    <Image
                      src={session.user.image}
                      className="rounded-circle object-fit-cover ms-1"
                      alt="Profile"
                      height="40"
                      width="40"
                    />
                  }
                  id="profile-dropdown"
                  align="end"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="d-flex"
                    onClick={(e) => changeTheme(e)}
                  >
                    <span>Dark mode</span>
                    <div className="form-check form-switch ms-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={() => null}
                        style={{ pointerEvents: "none" }}
                      />
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={signOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <CodeupButton onClick={() => signIn("google")}>
                  Sign in
                </CodeupButton>
              ))}
          </div>

          {/* Offcanvas for links and dropdowns (used on small screens) */}
          <Offcanvas
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
            placement="start"
            style={{
              backgroundColor:
                theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important",
              width: 300,
            }}
          >
            <StyledOffCanvas theme={theme}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  {links.map((link, index) =>
                    link.isDropDown ? (
                      <NavDropdown
                        title={link.name}
                        id={`offcanvas-nav-dropdown-${index}`}
                        key={index}
                      >
                        {link.dropDown.map((item, idx) => (
                          <NavDropdown.Item href={item.link} key={idx}>
                            {item.name}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ) : (
                      <Nav.Link href={link.link} key={index}>
                        {link.name}
                      </Nav.Link>
                    )
                  )}
                </Nav>
              </Offcanvas.Body>
            </StyledOffCanvas>
          </Offcanvas>
        </Container>
      </Navbar>
    </Wrapper>
  );
};

export default Header;
