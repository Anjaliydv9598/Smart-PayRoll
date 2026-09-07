function Navbar({ activePage, setActivePage }) {
    const menuItems = [
        "Dashboard",
        "Employees",
        "Payroll",
        "Reports",
    ];

    return (
        <nav className="navbar">

            <div className="brand">
                <div className="brand-icon">🎓</div>

                <div>
                    <h2>Smart Payroll</h2>
                    <span>School Management</span>
                </div>
            </div>

            <div className="nav-links">
                {menuItems.map((item) => (
                    <button
                        key={item}
                        className={`nav-link ${
                            activePage === item ? "active" : ""
                        }`}
                        onClick={() => setActivePage(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="admin-profile">
                <div className="admin-avatar">A</div>

                <div>
                    <strong>Admin</strong>
                    <span>Administrator</span>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;