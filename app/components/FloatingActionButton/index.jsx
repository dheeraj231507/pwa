import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FiPlus } from "react-icons/fi";

const FabContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 10;
`;

const FabButton = styled.button`
    background-color: ${(props) => (props.theme === "dark" ? "#333" : "#fff")};
    color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
    border: none;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: ${(props) => (props.theme === "dark" ? "#444" : "#eee")};
    }
`;

const LinksContainer = styled.div`
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 10px;
    transition: opacity 0.3s ease, transform 0.3s ease;
`;

const LinkItem = styled.a`
    background-color: ${(props) => (props.theme === "dark" ? "#444" : "#fff")};
    color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
    text-decoration: none;
    padding: 8px 12px;
    margin: 5px 0;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: 0.3s;

    &:hover {
        background-color: ${(props) => (props.theme === "dark" ? "#555" : "#ddd")};
    }
`;

const FloatingActionButton = ({ links, theme = "light" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FabContainer>
            <LinksContainer $isOpen={isOpen}>
                {links.map((link, index) => (
                    <LinkItem key={index} href={link.link} theme={theme}>
                        {link.text}
                    </LinkItem>
                ))}
            </LinksContainer>
            <FabButton theme={theme} onClick={() => setIsOpen(!isOpen)}>
                <FiPlus size={24} />
            </FabButton>
        </FabContainer>
    );
};

export default FloatingActionButton;
