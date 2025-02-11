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
    .card-container {
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background-image: ${(props) => (props.theme === "light" ? "linear-gradient(270deg, transparent, #ffffff)" : "linear-gradient(270deg, transparent, #0B2239)")};
            pointer-events: none;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 5px;
            height: 100%;
            background-image: ${(props) => (props.theme === "light" ? "linear-gradient(90deg, transparent, #ffffff)" : "linear-gradient(90deg, transparent, #0B2239)")};
            pointer-events: none;
        }
    }
    .card-holder {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
        padding: 10px;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }
        .course-card {
            display: inline;
            user-select: none;
            border-radius: 5px;
            box-shadow: ${(props) => (props.theme === "light" ? "0px 4px 4px 0px #00000040" : "none")};
            width: 20vw;
            min-width: 300px;
            color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
            text-decoration: none;

            img {
                width: 100%;
                border-radius: 5px;
                aspect-ratio: 16 / 9;
                height: auto;
                object-fit: cover;
            }
            .text {
                padding-bottom: 10px;
                p {
                    margin: 0;
                }

                .title {
                    font-size: 16px;
                    white-space: normal;
                    margin-bottom: 4px;
                    line-height: 1.2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .creator {
                    font-size: 9px;
                    transform: translateY(-4px);
                    /* color: #000000aa; */
                    opacity: 0.7;
                    margin-bottom: 2px;
                }
                .time,
                .dificulty {
                    font-size: 12px;
                }
                .cost {
                    background-color: #def9c4;
                    background-color: ${(props) => (props.theme === "light" ? "#def9c4" : "#bbff785c")};
                    font-size: 12px;
                    padding: 2px 10px;
                    border-radius: 5px;
                }
            }
        }
    }
`;

export default Wrapper;
