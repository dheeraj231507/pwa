import styled from "styled-components";

const Wrapper = styled.section`
    background-color: ${(props) => (props.theme === "light" ? "#fff" : "#0B2239")};
    color: ${(props) => (props.theme === "light" ? "#0B2239" : "#fff")};

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
            color: ${(props) => (props.theme === "light" ? "#000000aa" : "#ddd")};
            text-decoration: none;

            &:hover {
                color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
            }
        }
    }
    .card-holder {
        padding: 10px;
        .exam-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            /* background-color: ${(props) => (props.theme === "light" ? "#fff" : "#778da9")}; */
            border-radius: 5px;
            box-shadow: ${(props) => (props.theme === "light" ? "0px 4px 4px 0px #00000040" : "none")};
            margin-bottom: 20px;
            padding: 8px 16px;
            /* color: ${(props) => (props.theme === "light" ? "#000" : "#fff")}; */
            color: white;
            text-decoration: none !important;

            svg {
                color: white !important;
            }

            .time,
            .creator {
                font-size: 12px;
                margin: 0 !important;
                opacity: 0.7;
                transform: translateY(-3px);
            }

            p {
                margin: 6px 0 !important;
            }

            .title {
                font-size: 18px;
                margin: 0 !important;
            }
            .last-date {
                font-size: 10px;
                line-height: 2;
                align-self: baseline;
            }
        }
    }
`;

export default Wrapper;
