"use client";

import Image from "next/image";
import Wrapper from "./style";

const Cover = ({ theme = "light" }) => {
    const data = {};

    return (
        <Wrapper theme={theme}>
            <div className="container">
                <div className="col-md-6">{/* <Image src="/images/cover.png" width={500} height={500} alt="cover" /> */}</div>
                <div className="col-md-6"></div>
            </div>
        </Wrapper>
    );
};

export default Cover;
