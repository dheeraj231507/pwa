import styled from "styled-components";

const Wrapper = styled.div`
    background-color: ${(props) => (props.theme === "light" ? "#fff" : "#0B2239")};
    input {
        padding: 8px 20px;
        border: 1px solid;
        border-radius: 50px;
        margin-right: 0.5rem;
        width: 100%;
    }
`;

export default Wrapper;
