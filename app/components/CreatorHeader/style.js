import styled from "styled-components";

const Wrapper = styled.header`
    background-color: ${(props) => (props.theme === "light" ? "rgb(248, 249, 250)" : "#0B2239")};
    color: ${(props) => (props.theme === "light" ? "#0B2239" : "#fff")};
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;

        .dropdown-menu {
            background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#f8f9fa !important")};

            a {
                color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
            }

            .dropdown-item:hover {
                background-color: ${({ theme }) => (theme === "dark" ? "#ffffff20 !important" : "#eee !important")};
            }
            .dropdown-item:focus {
                background-color: unset;
            }
        }

        #profile-dropdown:after {
            content: none !important;
        }

        img {
            border-radius: 100%;
            object-fit: cover;
            background-color: #ccc;
            height: 50px;
            width: 50px;
        }
    }
`;

export default Wrapper;

export const StyledOffCanvas = styled.div`
    background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#ffffff")};
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
    height: 100%;

    a {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff !important" : "#000000 !important")};
    }

    button {
        filter: ${({ theme }) => (theme === "dark" ? "invert(1)" : "invert(0)")};
        box-shadow: none !important;
    }

    .dropdown-menu {
        background-color: ${({ theme }) => (theme === "dark" ? "#ffffff10 !important" : "#f8f9fa !important")};

        .dropdown-item {
            color: ${({ theme }) => (theme === "dark" ? "#fff !important" : "#000 !important")};
        }

        .dropdown-item:hover {
            background-color: ${({ theme }) => (theme === "dark" ? "#ffffff20 !important" : "#eee !important")};
        }
    }
`;
