"use client";

import Wrapper from "../../components/Courses/style";
import Header from "../../components/Header";
import logo from "../../../public/images/full-logo-black.dc3e624a01f5dc34c84d.png";
import logoDark from "../../../public/images/full-logo-white.a0d780b267862c65f814.png";
import { useState } from "react";

const Course = ({}) => {
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

    const [theme, setTheme] = useState("light");
    return (
        <Wrapper>
            <Header logoLight={logo} logoDark={logoDark} links={linkData} showLogo={false} showSearch={false} showProfile={true} showNotification={true} theme={theme} setTheme={setTheme} />
        </Wrapper>
    );
};

export default Course;
