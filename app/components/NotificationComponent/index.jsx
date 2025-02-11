// NotificationsComponent.js
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { deleteNotification, getNotifications } from "../../../public/helper/indexDB/db";

const NotificationsComponent = ({ theme, showNotificationDropdown, setShowNotificationDropdown }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (showNotificationDropdown) {
            fetchNotifications();
        }
    }, [showNotificationDropdown]);

    const fetchNotifications = async () => {
        const notifications = await getNotifications();
        setNotifications(notifications);
    };

    const handleDeleteNotification = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();

        await deleteNotification(id);
        fetchNotifications();
    };

    return (
        <>
            {showNotificationDropdown && (
                <div className="notification-container position-absolute bg-light shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6>Notifications</h6>
                        <Button
                            variant={theme === "dark" ? "dark" : "light"}
                            className="notif-close"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowNotificationDropdown(false);
                            }}
                        >
                            <CgClose size={18} strokeWidth={0.5} />
                        </Button>
                    </div>
                    <ul className="list-group">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <div>
                                    <strong>{notification.title}</strong>
                                    <p>{notification.body}</p>
                                </div>
                                <Button
                                    variant="link"
                                    className="text-danger"
                                    onClick={(e) => {
                                        handleDeleteNotification(notification.id, e);
                                    }}
                                >
                                    <CgClose size={18} strokeWidth={0.5} />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default NotificationsComponent;
