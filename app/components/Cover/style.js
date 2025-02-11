import styled from "styled-components";

const Wrapper = styled.section`
    background-color: ${(props) => (props.theme === "light" ? "#fff" : "#0B2239")};
    text-align: center;

    h1 {
        color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
        max-width: 700px;
        margin: 0 auto;
        .codeup-green {
            color: #4bf48f;
        }
    }
    input {
        border: 1px solid;
        border-radius: 100px;
        padding: 10px 20px;
        margin-top: 10px;
        width: 95%;
        max-width: 500px;
        background-color: #f1f1f1;
        color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
    }
`;

export default Wrapper;
