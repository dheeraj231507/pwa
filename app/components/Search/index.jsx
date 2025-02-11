import Wrapper from "./style";

const Search = ({ theme = "light" }) => {
    return (
        <Wrapper theme={theme}>
            <div className="container py-3">
                <form>
                    <input type="text" placeholder="Search" />
                </form>
            </div>
        </Wrapper>
    );
};

export default Search;
