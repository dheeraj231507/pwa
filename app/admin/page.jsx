"use client";

import Image from "next/image";
// import Codeup from "../components/admin/Codeup";
import icon from "../../public/images/icon.png";
import Link from "next/link";

const Admin = ({}) => {
    return (
        <div className="container">
            <h1 className="mb-4">Admin</h1>
            <h2>Users</h2>
            <div className="row mb-4">
                <div className="col-lg-3">
                    <a href="/admin/user" className="card d-flex flex-row p-3 align-items-center gap-3 text-decoration-none">
                        <Image src={icon} alt="icon" width={70} height={70} />
                        <div>User permission</div>
                    </a>
                </div>
                <div className="col-lg-3">
                    <a href="/admin/support" className="card d-flex flex-row p-3 align-items-center gap-3 text-decoration-none">
                        <Image src={icon} alt="icon" width={70} height={70} />
                        <div>Support</div>
                    </a>
                </div>
            </div>
            <h2>Layout</h2>
            <div className="row">
                <div className="col-lg-3">
                    <a href="/admin/layout/codeup" className="card d-flex flex-row p-3 align-items-center gap-3 text-decoration-none">
                        <Image src={icon} alt="icon" width={70} height={70} />
                        <div>Codeup</div>
                    </a>
                </div>
                <div className="col-lg-3">
                    <a href="/admin/layout/oneup" className="card d-flex flex-row p-3 align-items-center gap-3 text-decoration-none">
                        <Image src={icon} alt="icon" width={70} height={70} />
                        <div>Oneup</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Admin;
