"use client";

import Image from "next/image";
import Wrapper, { StyledOffCanvas } from "./style";
import { Nav, NavDropdown, Offcanvas } from "react-bootstrap";
import defaultProfile from "../../../public/images/default profile.jpg";
import { signIn, signOut, useSession } from "next-auth/react"; // Import NextAuth
import { CodeupButton } from "../utils";

const CreatorHeader = ({ theme = "light", setTheme }) => {
    // const [theme, setTheme] = useState(initialTheme);

    // const [showOffcanvas, setShowOffcanvas] = useState(false);
    // const handleToggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
    // const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const links = [
        { name: "Profile", link: "/profile" },
        { name: "Settings", link: "/settings" },
        { name: "Logout", link: "/logout" },
    ];

    const changeTheme = (e) => {
        e.stopPropagation();
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Handle session state
    const { data: session } = useSession();

    return (
        <Wrapper theme={theme}>
            <div className="container">
                <h1>
                    Hello
                    <br />
                    {session ? session.user.name.split(" ")[0] : "Guest"}
                </h1>
                {/* <Button variant="light" className="nav-toggle-btn d-lg-none p-1" aria-controls="offcanvas-navbar" onClick={handleToggleOffcanvas}>
                        <span className="navbar-toggler-icon"></span>
                    </Button> */}
                {/* <Image src={profilePicture} alt="profile" width={100} height={100} aria-controls="offcanvas-navbar" onClick={handleToggleOffcanvas} /> */}

                {session ? (
                    <NavDropdown title={<Image src={session.user.image} className="rounded-circle object-fit-cover ms-1" alt="Profile" height="40" width="40" />} id="profile-dropdown" align="end">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="d-flex" onClick={(e) => changeTheme(e)}>
                            <span>Dark mode</span>
                            <div className="form-check form-switch ms-2">
                                <input className="form-check-input" type="checkbox" checked={theme === "dark"} onChange={() => null} style={{ pointerEvents: "none" }} />
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={signOut}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <CodeupButton onClick={() => signIn("google")}>Sign in</CodeupButton>
                )}
            </div>

            {/* Offcanvas for links and dropdowns (used on small screens) */}
            {/* <Offcanvas
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                placement="end"
                style={{
                    backgroundColor: theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important",
                    width: 200,
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
                                    <NavDropdown title={link.name} id={`offcanvas-nav-dropdown-${index}`} key={index}>
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
            </Offcanvas> */}
        </Wrapper>
    );
};

export default CreatorHeader;
