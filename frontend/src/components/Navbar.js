import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    X, Menu, ChevronDown, MapPin, Building2,
    Home as HomeIcon, Waves, Mountain, Palmtree,
    Construction, Landmark, Gem, Trees
} from "lucide-react";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState(null); // 'buy', 'properties', 'services'

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMegaMenu = () => setActiveMegaMenu(null);

    const locations = [
        { name: "Kyrenia", icon: <Waves size={15} className="text-caria-turquoise/60" />, slug: "kyrenia" },
        { name: "Esentepe", icon: <Mountain size={15} className="text-caria-turquoise/60" />, slug: "esentepe" },
        { name: "İskele", icon: <Palmtree size={15} className="text-caria-turquoise/60" />, slug: "iskele" },
        { name: "Famagusta", icon: <Landmark size={15} className="text-caria-turquoise/60" />, slug: "famagusta" },
    ];

    const categories = [
        { name: "Luxury Villas", icon: <Gem size={18} className="text-gray-400" /> },
        { name: "Sea View Apartments", icon: <Building2 size={18} className="text-gray-400" /> },
        { name: "New Developments", icon: <Construction size={18} className="text-gray-400" /> },
        { name: "Investment Land", icon: <Trees size={18} className="text-gray-400" /> },
    ];

    const services = [
        { name: "Property Management", link: "/services#management" },
        { name: "Legal Consulting", link: "/services#legal" },
        { name: "Decoration Packages", link: "/services#decoration" },
        { name: "Transfer Services", link: "/services#transfer" },
        { name: "After Sales", link: "/services#after-sales" },
        { name: "Interior Design", link: "/services#interior" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${isScrolled || activeMegaMenu
                    ? "bg-white/95 backdrop-blur-md shadow-sm text-caria-slate"
                    : "bg-transparent text-white"
                    }`}
                onMouseLeave={closeMegaMenu}
            >
                <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-6">
                    <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">

                        {/* Left Navigation */}
                        <nav className="hidden lg:flex items-center space-x-12 justify-start">
                            {["SELL", "BUY", "RENT"].map((item) => (
                                <div
                                    key={item}
                                    className="relative group py-2"
                                    onMouseEnter={() => item === "BUY" ? setActiveMegaMenu("buy") : closeMegaMenu()}
                                >
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className={`text-[11px] tracking-[0.25em] font-light transition-all duration-300 hover:text-caria-turquoise flex items-center gap-1 ${isScrolled || activeMegaMenu ? "text-caria-slate" : "text-white opacity-90"
                                            }`}
                                    >
                                        {item}
                                        {item === "BUY" && <ChevronDown size={12} className={`transition-transform duration-300 ${activeMegaMenu === 'buy' ? 'rotate-180' : ''}`} />}
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        {/* Center Logo */}
                        <div className="flex items-center justify-center">
                            <Link to="/" className="flex items-center" onClick={closeMegaMenu}>
                                <img
                                    src="/logo.png"
                                    alt="Caria Estates"
                                    className="h-12 w-auto transition-all duration-500"
                                    style={{ filter: (isScrolled || activeMegaMenu) ? 'none' : 'brightness(0) invert(1)' }}
                                />
                            </Link>
                        </div>

                        {/* Right Navigation */}
                        <nav className="hidden lg:flex items-center space-x-12 justify-end">
                            {["PROPERTIES", "SERVICES", "ABOUT", "CONTACT"].map((item) => (
                                <div
                                    key={item}
                                    className="relative group py-2"
                                    onMouseEnter={() => {
                                        if (item === "PROPERTIES") setActiveMegaMenu("properties");
                                        else if (item === "SERVICES") setActiveMegaMenu("services");
                                        else closeMegaMenu();
                                    }}
                                >
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className={`text-[11px] tracking-[0.25em] font-light transition-all duration-300 hover:text-caria-turquoise flex items-center gap-1 ${isScrolled || activeMegaMenu ? "text-caria-slate" : "text-white opacity-90"
                                            }`}
                                    >
                                        {item}
                                        {(item === "PROPERTIES" || item === "SERVICES") && (
                                            <ChevronDown size={12} className={`transition-transform duration-300 ${(activeMegaMenu === 'properties' || activeMegaMenu === 'services') && activeMegaMenu === item.toLowerCase() ? 'rotate-180' : ''}`} />
                                        )}
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden z-[110] ${isScrolled || activeMegaMenu ? 'text-caria-slate' : 'text-white'}`}
                        >
                            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mega Menu / Dropdown Panels */}
                <div
                    className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl overflow-hidden transition-all duration-300 ease-out sm-mega-menu ${activeMegaMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                    style={{ maxHeight: activeMegaMenu ? '600px' : '0px' }}
                >
                    {/* BUY & PROPERTIES MEGA MENU */}
                    {(activeMegaMenu === 'buy' || activeMegaMenu === 'properties') && (
                        <div className="max-w-[1200px] mx-auto px-12 py-16 grid grid-cols-2 gap-24">
                            {/* Regions Column */}
                            <div>
                                <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-8 flex items-center gap-2">
                                    <span className="w-4 h-[1px] bg-gray-200"></span>
                                    LOCATIONS
                                </h4>
                                <div className="grid grid-cols-1 gap-6">
                                    {locations.map((loc) => (
                                        <Link
                                            key={loc.name}
                                            to={`/properties?region=${loc.slug}`}
                                            className="group flex items-center gap-4 text-caria-slate hover:text-caria-turquoise transition-all duration-300"
                                            onClick={closeMegaMenu}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-caria-mint transition-colors">
                                                {loc.icon}
                                            </div>
                                            <span className="text-base font-light tracking-wide">{loc.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Categories Column */}
                            <div>
                                <h4 className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold mb-8 flex items-center gap-2">
                                    <span className="w-4 h-[1px] bg-gray-200"></span>
                                    CATEGORIES
                                </h4>
                                <div className="grid grid-cols-1 gap-6">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            to="/properties"
                                            className="group flex items-center gap-4 text-caria-slate hover:text-caria-turquoise transition-all duration-300"
                                            onClick={closeMegaMenu}
                                        >
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                {cat.icon}
                                            </div>
                                            <span className="text-base font-light tracking-wide">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SERVICES DROPDOWN */}
                    {activeMegaMenu === 'services' && (
                        <div className="max-w-[1000px] mx-auto py-16 px-12">
                            <h4 className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold mb-12 text-center">OUR SERVICES</h4>
                            <div className="grid grid-cols-3 gap-x-16 gap-y-10">
                                {services.map((service) => (
                                    <Link
                                        key={service.name}
                                        to={service.link}
                                        className="text-[13px] font-extralight tracking-widest text-caria-slate hover:text-caria-turquoise transition-all duration-300 py-3 border-b border-gray-50 hover:border-caria-mint flex items-center justify-between group"
                                        onClick={closeMegaMenu}
                                    >
                                        <span className="opacity-80 group-hover:opacity-100">{service.name}</span>
                                        <ChevronDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all text-caria-mint" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Background Blur Overlay */}
            <div
                className={`fixed inset-0 bg-black/5 z-[90] transition-opacity duration-500 backdrop-blur-[2px] ${activeMegaMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMegaMenu}
            />
        </>
    );
};

export default Navbar;
