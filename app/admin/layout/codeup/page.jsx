"use client";

import Codeup from "../../../components/admin/Codeup";

const CodeupLayout = ({}) => {
    const initialData = {
        header: [
            { name: "Home", link: "/", isDropDown: false, dropDown: [] },
            {
                name: "About",
                link: "#",
                isDropDown: true,
                dropDown: [
                    { name: "About Us", link: "/about-us" },
                    { name: "Contact Us", link: "/contact-us" },
                ],
            },
        ],
        headerOptions: {
            logo: undefined,
            showSearch: true,
            showProfile: true,
            showNotification: true,
            isLoggedIn: true,
            theme: "light",
        },
        cover: {
            text: "Welcome to our site!",
            image: "https://example.com/cover.jpg",
            button: { name: "Learn More", link: "/learn-more", isModal: true, modalData: { title: "More Info", body: "Here is more information about the site." } },
        },
        projects: [
            {
                name: "Project One",
                description: "Description of project one.",
                link: "/project-one",
            },
            {
                name: "Project Two",
                description: "Description of project two.",
                link: "/project-two",
            },
        ],
        footer: {
            rowOne: [
                { name: "Privacy Policy", link: "/privacy-policy", isModal: false },
                { name: "Terms of Service", link: "/terms-of-service", isModal: true, modalData: { title: "Contact Us", body: "This is the contact modal content." } },
            ],
            rowTwo: [
                { name: "Support", link: "/support", isModal: false },
                { name: "Contact", link: "/contact", isModal: false },
            ],
        },
    };

    const handleUpdate = (updatedData) => {
        console.log("Updated data:", updatedData);
        // Send updatedData to API or update state
    };

    return (
        <div>
            <Codeup initialData={initialData} onUpdate={handleUpdate} />
        </div>
    );
};

export default CodeupLayout;
