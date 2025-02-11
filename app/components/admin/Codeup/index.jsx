import React, { useState } from "react";
import Wrapper from "./style";
import Header from "../../Header";
import { Form } from "react-bootstrap";

const Codeup = ({ initialData, onUpdate }) => {
    const [data, setData] = useState(initialData);

    const handleInputChange = (section, field, value, index = null, subIndex = null) => {
        const updatedData = { ...data };
        if (section === "footer" && index !== null) {
            updatedData[section][index][subIndex][field] = value;
        } else if (index !== null) {
            if (subIndex !== null) {
                updatedData[section][index].dropDown[subIndex][field] = value;
            } else {
                updatedData[section][index][field] = value;
            }
        } else {
            updatedData[section][field] = value;
        }
        setData(updatedData);
    };

    const handleArrayChange = (section, newItem, key = null) => {
        const updatedData = { ...data };

        if (key) {
            if (!updatedData[section][key]) {
                updatedData[section][key] = [];
            }
            updatedData[section][key].push(newItem);
        } else {
            updatedData[section].push(newItem);
        }

        setData(updatedData);
    };

    const handleArrayRemove = (section, index, subIndex = null) => {
        const updatedData = { ...data };
        if (section === "footer" && index !== null) {
            updatedData.footer[index].splice(subIndex, 1);
        } else if (subIndex !== null) {
            updatedData[section][index].dropDown.splice(subIndex, 1);
        } else {
            updatedData[section].splice(index, 1);
        }
        setData(updatedData);
    };

    const handleUpdate = () => {
        onUpdate(data);
    };

    const handleImage = (elem) => {
        if (elem.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                handleInputChange("headerOptions", "logo", event.target.result);
            };
            reader.readAsDataURL(elem.files[0]); // Read the file as a data URL
        }
    };

    return (
        <Wrapper className="container">
            <h1 className="mb-4">Codeup admin layout</h1>
            {/* Header Section */}
            <section className="mb-5">
                <Header logo={data.headerOptions.logo} links={data.header} showSearch={data.headerOptions.showSearch} showProfile={data.headerOptions.showProfile} showNotification={data.headerOptions.showNotification} isLoggedIn={data.headerOptions.isLoggedIn} theme={data.headerOptions.theme} />

                <h3 className="mb-4">Header Links</h3>
                <Form>
                    <div className="mb-3">
                        <Form.Control className="w-auto d-inline me-1" type="file" accept=".jpg,.png" onChange={(e) => handleImage(e.target)} />
                        <span className="me-3">Logo</span>
                        <Form.Check inline label="Show Search" checked={data.headerOptions.showSearch} onChange={(e) => handleInputChange("headerOptions", "showSearch", e.target.checked)} />
                        <Form.Check inline label="Show Profile" checked={data.headerOptions.showProfile} onChange={(e) => handleInputChange("headerOptions", "showProfile", e.target.checked)} />
                        <Form.Check inline label="Show Notification" checked={data.headerOptions.showNotification} onChange={(e) => handleInputChange("headerOptions", "showNotification", e.target.checked)} />
                        <Form.Check inline label="Is logged in" checked={data.headerOptions.isLoggedIn} onChange={(e) => handleInputChange("headerOptions", "isLoggedIn", e.target.checked)} />
                        <Form.Check inline label="Dark Theme" checked={data.headerOptions.theme == "dark"} onChange={(e) => handleInputChange("headerOptions", "theme", e.target.checked ? "dark" : "light")} />
                    </div>
                </Form>
                <div className="row">
                    {data.header.map((link, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="border p-3 rounded bg-light">
                                <div className="mb-3">
                                    <label className="form-label">Link Name</label>
                                    <input type="text" className="form-control" value={link.name} placeholder="Enter Link Name" onChange={(e) => handleInputChange("header", "name", e.target.value, index)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Link URL</label>
                                    <input type="text" className="form-control" value={link.link} placeholder="Enter Link URL" onChange={(e) => handleInputChange("header", "link", e.target.value, index)} disabled={link.isDropDown} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Type</label>
                                    <select className="form-select" value={link.isDropDown ? "dropdown" : "link"} onChange={(e) => handleInputChange("header", "isDropDown", e.target.value === "dropdown", index)}>
                                        <option value="link">Link</option>
                                        <option value="dropdown">Dropdown</option>
                                    </select>
                                </div>
                                {link.isDropDown && (
                                    <div className="ms-2">
                                        <h6 className="mb-2">Dropdown Items</h6>
                                        {link.dropDown.map((dropItem, subIndex) => (
                                            <div key={subIndex} className="border p-2 rounded mb-2">
                                                <div className="mb-2">
                                                    <label className="form-label">Dropdown Name</label>
                                                    <input type="text" className="form-control" value={dropItem.name} placeholder="Enter Dropdown Name" onChange={(e) => handleInputChange("header", "name", e.target.value, index, subIndex)} />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Dropdown Link</label>
                                                    <input type="text" className="form-control" value={dropItem.link} placeholder="Enter Dropdown Link" onChange={(e) => handleInputChange("header", "link", e.target.value, index, subIndex)} />
                                                </div>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleArrayRemove("header", index, subIndex)}>
                                                    Remove Dropdown Item
                                                </button>
                                            </div>
                                        ))}
                                        <button className="btn btn-primary btn-sm" onClick={() => handleInputChange("header", "dropDown", [...link.dropDown, { name: "", link: "" }], index)}>
                                            Add Dropdown Item
                                        </button>
                                    </div>
                                )}
                                <button className="btn btn-danger mt-3 w-100" onClick={() => handleArrayRemove("header", index)}>
                                    Remove Link
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-primary mt-3"
                    onClick={() =>
                        handleArrayChange("header", {
                            name: "",
                            link: "",
                            isDropDown: false,
                            dropDown: [],
                        })
                    }
                >
                    Add Link
                </button>
            </section>

            {/* Cover Section */}
            <section className="mb-5">
                <h3 className="mb-4">Cover</h3>
                <div className="border p-4 rounded bg-light">
                    <div className="mb-3">
                        <label className="form-label">Cover Text</label>
                        <input type="text" className="form-control" value={data.cover.text} placeholder="Enter Cover Text" onChange={(e) => handleInputChange("cover", "text", e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cover Image URL</label>
                        <input type="text" className="form-control" value={data.cover.image} placeholder="Enter Cover Image URL" onChange={(e) => handleInputChange("cover", "image", e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Button Text</label>
                        <input type="text" className="form-control" value={data.cover.button.name} placeholder="Enter Button Text" onChange={(e) => handleInputChange("cover", "name", e.target.value, "button")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Button Type</label>
                        <select className="form-select" value={data.cover.button.isModal ? "modal" : "link"} onChange={(e) => handleInputChange("cover", "isModal", e.target.value === "modal", "button")}>
                            <option value="link">Link</option>
                            <option value="modal">Modal</option>
                        </select>
                    </div>
                    {!data.cover.button.isModal ? (
                        <div className="mb-3">
                            <label className="form-label">Button Link</label>
                            <input type="text" className="form-control" value={data.cover.button.link} placeholder="Enter Button Link" onChange={(e) => handleInputChange("cover", "link", e.target.value, "button")} />
                        </div>
                    ) : (
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Modal Title</label>
                                <input type="text" className="form-control" value={data.cover.button.modalData?.title || ""} placeholder="Enter Modal Title" onChange={(e) => handleInputChange("cover", "modalData", { ...data.cover.button.modalData, title: e.target.value }, "button")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Modal Body</label>
                                <textarea className="form-control" rows="3" value={data.cover.button.modalData?.body || ""} placeholder="Enter Modal Body" onChange={(e) => handleInputChange("cover", "modalData", { ...data.cover.button.modalData, body: e.target.value }, "button")} />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Projects Section */}
            <section className="mb-5">
                <h3 className="mb-4">Projects</h3>
                <div className="row g-4">
                    {data.projects.map((project, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4">
                            <div className="border p-4 rounded bg-light h-100">
                                <div className="mb-3">
                                    <label className="form-label">Project Name</label>
                                    <input type="text" className="form-control" value={project.name} placeholder="Enter Project Name" onChange={(e) => handleInputChange("projects", "name", e.target.value, index)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Project Description</label>
                                    <input type="text" className="form-control" value={project.description} placeholder="Enter Project Description" onChange={(e) => handleInputChange("projects", "description", e.target.value, index)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Project Link</label>
                                    <input type="text" className="form-control" value={project.link} placeholder="Enter Project Link" onChange={(e) => handleInputChange("projects", "link", e.target.value, index)} />
                                </div>
                                <button className="btn btn-danger w-100" onClick={() => handleArrayRemove("projects", index)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            handleArrayChange("projects", {
                                name: "",
                                description: "",
                                link: "",
                            })
                        }
                    >
                        Add Project
                    </button>
                </div>
            </section>

            {/* Footer Section */}
            <section className="mb-5">
                <h3 className="mb-4">Footer Links</h3>
                {Object.entries(data.footer).map(([rowName, rowLinks], rowIndex) => (
                    <div key={rowIndex} className={rowIndex != Object.entries(data.footer).length - 1 ? "mb-5" : ""}>
                        <h4 className="mb-3">{rowName}</h4>
                        <div className="row g-4">
                            {rowLinks.map((link, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4">
                                    <div className="border p-3 rounded bg-light h-100">
                                        <div className="mb-3">
                                            <label className="form-label">Link Name</label>
                                            <input type="text" className="form-control" value={link.name} placeholder="Enter Link Name" onChange={(e) => handleInputChange("footer", "name", e.target.value, rowName, index)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Type</label>
                                            <select className="form-select" value={link.isModal ? "modal" : "link"} onChange={(e) => handleInputChange("footer", "isModal", e.target.value === "modal", rowName, index)}>
                                                <option value="link">Link</option>
                                                <option value="modal">Modal</option>
                                            </select>
                                        </div>
                                        {!link.isModal ? (
                                            <div className="mb-3">
                                                <label className="form-label">Link URL</label>
                                                <input type="text" className="form-control" value={link.link} placeholder="Enter Link URL" onChange={(e) => handleInputChange("footer", "link", e.target.value, rowName, index)} />
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="mb-3">
                                                    <label className="form-label">Modal Title</label>
                                                    <input type="text" className="form-control" value={link.modalData?.title || ""} placeholder="Enter Modal Title" onChange={(e) => handleInputChange("footer", "modalData", { ...link.modalData, title: e.target.value }, rowName, index)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Modal Body</label>
                                                    <textarea className="form-control" rows="3" value={link.modalData?.body || ""} placeholder="Enter Modal Body" onChange={(e) => handleInputChange("footer", "modalData", { ...link.modalData, body: e.target.value }, rowName, index)} />
                                                </div>
                                            </div>
                                        )}
                                        <button className="btn btn-danger w-100" onClick={() => handleArrayRemove("footer", rowName, index)}>
                                            Remove Link
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    handleArrayChange(
                                        "footer",
                                        {
                                            name: "",
                                            link: "",
                                            isModal: false,
                                            modalData: { title: "", body: "" },
                                        },
                                        rowName
                                    )
                                }
                            >
                                Add Link
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <button className="btn btn-success mb-3" onClick={handleUpdate}>
                Save Changes
            </button>
        </Wrapper>
    );
};

export default Codeup;
