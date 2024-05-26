// NavBar.tsx
import * as React from 'react'
import { useState } from 'react';
import './NavBar.css';

const NavBar: React.FC = () => {
    const [openMenu, setOpenMenu] = useState('');

    const DropdownMenu = ({ isOpen, children }) => (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            {children}
        </div>
    );

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">Logo</div>
                <div className="navbar-menu">
                    <div className="navbar-menu-item" onClick={() => setOpenMenu(openMenu === 'about' ? '' : 'about')}>
                        About
                        <DropdownMenu isOpen={openMenu === 'about'}>
                            <div className="dropdown-menu-item">About 1
                                <div className="dropdown-menu-item-description">Description for About 1</div>
                            </div>
                            <div className="dropdown-menu-item">About 2
                                <div className="dropdown-menu-item-description">Description for About 2</div>
                            </div>
                        </DropdownMenu>
                    </div>
                    <div className="navbar-menu-item" onClick={() => setOpenMenu(openMenu === 'news' ? '' : 'news')}>
                        News
                        <DropdownMenu isOpen={openMenu === 'news'}>
                            <div className="dropdown-menu-item">News 1
                                <div className="dropdown-menu-item-description">Description for News 1</div>
                            </div>
                            <div className="dropdown-menu-item">News 2
                                <div className="dropdown-menu-item-description">Description for News 2</div>
                            </div>
                        </DropdownMenu>
                    </div>
                    <div className="navbar-menu-item" onClick={() => setOpenMenu(openMenu === 'support' ? '' : 'support')}>
                        Support
                        <DropdownMenu isOpen={openMenu === 'support'}>
                            <div className="dropdown-menu-item"> OUR STORY
                                <div className="dropdown-menu-item-description">Description for Our Story</div>
                            </div>
                            <div className="dropdown-menu-item">DISCOVER THE TEAM
                                <div className="dropdown-menu-item-description">Description for Discover the team</div>
                            </div>
                            <div className="dropdown-menu-item">CONTACT US
                                <div className="dropdown-menu-item-description">Description for Contact Us</div>
                            </div>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;