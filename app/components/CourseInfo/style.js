import styled from "styled-components";

const Wrapper = styled.div`
    background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#ffffff")};
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};

    h2 {
        margin-top: 25px;
    }
`;

export default Wrapper;
