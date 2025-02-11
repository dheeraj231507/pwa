import { useState } from "react";
import Wrapper from "./style";

const Categories = ({ theme = "light" }) => {
    const [selected, setSelected] = useState(null);

    const categories = [
        { name: "Coding", color: "#118AB2" },
        { name: "Development", color: "#06D6A0" },
        { name: "AI/ML", color: "#FFD166" },
        { name: "Free Courses", color: "#F07167" },
        { name: "Certifications", color: "#E9D8A6" },
    ];

    return (
        <Wrapper theme={theme}>
            <div className="container py-4">
                <h2 className="mb-3 ">Categories</h2>
                {categories.map((category, index) => (
                    <button key={index} className={`category-button btn mx-2 ${selected === index ? "selected" : ""}`} style={{ backgroundColor: category.color }} onClick={() => setSelected(index)}>
                        {category.name}
                    </button>
                ))}
            </div>
        </Wrapper>
    );
};

export default Categories;
