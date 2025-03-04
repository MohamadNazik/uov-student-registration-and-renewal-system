import React from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

function RegisteredStudents() {
    return (
        <div>
            <Header title="Registered Students Dashboard" />
            <div className="flex flex-col items-center gap-5 sm:gap-8 mt-8 sm:mt-12">
                <Link to="/first-year">
                    <TextCard  text="For First Year  " />
                </Link>
                <Link to="/second-year">
                    <TextCard text="For Second Year" />
                </Link>
                <Link to="/third-year">
                    <TextCard text="For Third Year" />
                </Link>
                <Link to="/fourth-year">
                    <TextCard text="For Fourth Year" />
                </Link>
                <Link to="/fourth-year">
                    <PrimaryButton text="Go To Dashboard" />
                </Link>
            </div>
        </div>
    );
}

export default RegisteredStudents;