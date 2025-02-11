import styled from "styled-components";

const Wrapper = styled.div`
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};

    .modal-header,
    .modal-body,
    .modal-footer {
        background-color: ${({ theme }) => (theme === "dark" ? "#0b2239 !important" : "#ffffff")};
    }
`;

export default Wrapper;
