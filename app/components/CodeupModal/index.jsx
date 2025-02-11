"use client";

import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CodeupButton } from "../utils";
import Wrapper from "./style";

const CodeupModal = ({ theme, button = "Open Modal", head = "Header", body = "Body" }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <span onClick={handleShow}>{button}</span>

            <Modal data-bs-theme={theme} size="xl" show={show} onHide={handleClose}>
                <Wrapper theme={theme}>
                    <Modal.Header closeButton>
                        <Modal.Title>{head}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Wrapper>
            </Modal>
        </>
    );
};

export default CodeupModal;
