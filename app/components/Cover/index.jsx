import Wrapper from "./style";

const Cover = ({ theme = "light" }) => {
    return (
        <Wrapper theme={theme}>
            <div className="contianer py-4">
                <h1 className="mb-3">
                    Challenge Limits, Take Mentorship & One<span className="codeup-green">up</span> Your Potential
                </h1>
                <form action="">
                    <input type="search" placeholder="Search" />
                </form>
            </div>
        </Wrapper>
    );
};

export default Cover;
