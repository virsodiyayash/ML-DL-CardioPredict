import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <header className="header">
                <div className="container nav">
                    <div className="logo">
                        <Heart size={32} strokeWidth={2.5} className="text-primary" />
                        CardioPredict
                    </div>

                    {/* Desktop Links - Hidden on Mobile via CSS */}
                    <div className="nav-links">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
                        <NavLink to="/predict" className={({ isActive }) => isActive ? 'active-link' : ''}>Prediction</NavLink>
                        <NavLink to="/prevention" className={({ isActive }) => isActive ? 'active-link' : ''}>Prevention Tips</NavLink>
                    </div>

                    {/* Hamburger Button */}
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <Menu size={28} />
                    </button>
                </div>
            </header>

            {/* Drawer Overlay */}
            <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>

            {/* Side Drawer */}
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <button className="menu-toggle" onClick={closeMenu} style={{ display: 'block', color: 'var(--text-main)' }}>
                        <X size={28} />
                    </button>
                </div>
                <div className="drawer-links">
                    <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
                    <NavLink to="/predict" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Prediction</NavLink>
                    <NavLink to="/prevention" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Prevention Tips</NavLink>
                </div>
            </div>
        </>
    );
};

export default Navbar;
