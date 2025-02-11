import styled from "styled-components";

const Wrapper = styled.div`
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
    background-color: ${({ theme }) => (theme === "dark" ? "#0b2239" : "#ffffff")};
`;

export default Wrapper;
