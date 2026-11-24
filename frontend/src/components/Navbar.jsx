
function Navbar({ activePage, setActivePage }) {

    const menuItems = [
        { name: "Dashboard", icon: "📊" },
        { name: "Employees", icon: "👥" },
        { name: "Payroll", icon: "💰" },
        { name: "Reports", icon: "📋" },
        { name: "Holidays", icon: "🗓️" },
        { name: "Staff", icon: "👥" },
        { name: "Student", icon: "🎓" }
    ];

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="navbar-brand">
                <div className="brand-icon">💰</div>

                <div className="brand-text">
                    <strong>Smart Payroll</strong>
                    <span>School Management</span>
                </div>

                <span className="school-badge">
                    School Management
                </span>
            </div>

            {/* Navigation */}
            <div className="navbar-menu">

                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        className={`nav-item ${
                            activePage === item.name ? "active" : ""
                        }`}
                        onClick={() => setActivePage(item.name)}
                    >
                        <span>{item.icon}</span>
                        {item.name}
                    </button>
                ))}

                {/* Login Button */}
                <button
                    className="login-button"
                    onClick={() => setActivePage("Login")}
                >
                    🔒 Login <span>→</span>
                </button>

            </div>
        </nav>
    );
}

export default Navbar;
