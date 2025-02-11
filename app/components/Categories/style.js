import styled from "styled-components";

const Wrapper = styled.section`
    background-color: ${(props) => (props.theme === "light" ? "#fff" : "#0B2239")};
    text-align: center;

    h2 {
        /* text-align: left; */
        color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
    }
    .category-button {
        border-radius: 100px;
        box-shadow: 0 4px 4px #00000030;
        font-size: 14px;
        margin-bottom: 16px;
        color: white !important;
        border: none;
        transition: 0.1s;

        &:hover {
            transform: translateY(2px);
            box-shadow: 0 2px 4px #00000030;
        }
    }
`;

export default Wrapper;
