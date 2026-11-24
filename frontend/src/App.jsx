
import { useState } from "react";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Holidays from "./pages/Holidays";
import Student from "./components/Student";

import "./App.css";


function App() {

    const [activePage, setActivePage] =
        useState("Dashboard");


    const renderPage = () => {

        switch (activePage) {

            case "Employees":
                return <Employees />;

            case "Payroll":
                return <Payroll />;

            case "Reports":
                return <Reports />;

            case "Holidays":
                return <Holidays />;

            // Student Pages
            case "Student":
                return <Student />;

            default:
                return <Dashboard />;
        }
    };


    return (
        <div className="app">

            <Navbar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="main-content">

                {renderPage()}

            </main>

        </div>
    );
}

export default App;
