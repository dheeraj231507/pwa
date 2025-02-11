import styled from "styled-components";

const Wrapper = styled.div`
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
    background-color: ${({ theme }) => (theme === "dark" ? "#0b2239" : "#ffffff")};
    padding-bottom: 0.1px;

    .shadow {
        box-shadow: 0 4px 4px #000;
        padding: 8px 24px;
        margin: 16px 0;
    }

    .objective-input {
        position: relative;

        button {
            position: absolute;
            right: -7px;
            top: -7px;
            font-size: 10px;
            background-color: #fff;
            border-radius: 100%;
        }
    }

    .select__input {
        outline: none !important;
    }

    .info {
        font-size: 12px;
        opacity: 0.6;
        margin-bottom: 4px;
    }
`;

export default Wrapper;
