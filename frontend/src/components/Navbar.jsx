function Navbar({ activePage, setActivePage }) {

    const menuItems = [
        "Dashboard",
        "Employees",
        "Payroll",
        "Reports",
        "Holidays"
    ];


    return (

        <nav className="navbar">

            <div className="navbar-brand">

                <div className="brand-icon">
                    💰
                </div>

                <div>

                    <strong>
                        Smart Payroll
                    </strong>

                    <span>
                        School Management
                    </span>

                </div>

            </div>


            <div className="navbar-menu">

                {menuItems.map((item) => (

                    <button
                        key={item}
                        className={
                            activePage === item
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            setActivePage(item)
                        }
                    >

                        {item === "Dashboard" && "📊"}

                        {item === "Employees" && "👥"}

                        {item === "Payroll" && "💰"}

                        {item === "Reports" && "📋"}

                        {item === "Holidays" && "📅"}

                        <span>
                            {item}
                        </span>

                    </button>

                ))}

            </div>

        </nav>
    );
}


export default Navbar;