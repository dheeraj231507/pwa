import styled from "styled-components";

const Wrapper = styled.div`
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
    background-color: ${({ theme }) => (theme === "dark" ? "#0b2239" : "#ffffff")};

    .shadow {
        box-shadow: 0 4px 4px #000;
        padding: 8px 24px;
        margin: 16px 0;
    }

    svg {
        cursor: pointer;
    }
`;

export default Wrapper;
