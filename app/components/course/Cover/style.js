import styled from "styled-components";

const Wrapper = styled.section`
    background-color: ${(props) => (props.theme === "light" ? "#fff" : "#0B2239")};
    color: ${(props) => (props.theme === "light" ? "#0B2239" : "#fff")};
`;

export default Wrapper;
