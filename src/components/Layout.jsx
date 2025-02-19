import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useUser } from "../context/UserContext";
import { updateUserSettings } from "../services/userService";
import { useNavigate } from "react-router-dom";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Container } from "postcss";

const userNavigation = [
    { name: 'Settings', href: '/settings' },
    { name: 'Sign out', href: '/logout' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => setCurrentPath(window.location.pathname);
        window.addEventListener("popstate", handleLocationChange);
        return () => window.removeEventListener("popstate", handleLocationChange);
    }, []);

    const navigation = isAuthenticated
        ? [
            { name: "Home", href: "/", current: currentPath === "/" },
            { name: "Movies", href: "/movies", current: currentPath === "/movies" },
            { name: "Settings", href: "/settings", current: currentPath === "/settings" },
        ]
        : [
            { name: "Home", href: "/", current: currentPath === "/" },
            { name: "Movies", href: "/movies", current: currentPath === "/movies" },
            { name: "Login", href: "/login", current: currentPath === "/login" },
            { name: "Register", href: "/register", current: currentPath === "/register" },
        ];

    const { setUser } = useUser(); // Ensure you can update user state

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        setUser(null); // Update context state to reflect logout
        navigate("/", { replace: true }); // Redirect to login page
    };

    const { user } = useUser(); // Access user from context
    const [name, setName] = useState(user?.username || 'Guest');
    const [email, setEmail] = useState(user?.email || 'guest@example.com');
    const imageUrl = user?.imageUrl || 'https://example.com/default-avatar.jpg';

    return (
        <div className="min-h-full flex flex-col">
            {/* Navbar */}
            <Disclosure as="nav" className="navbar shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="size-8"
                                />
                            </div>
                            <div className="navbar-text hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'navbar-link rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                                            <img alt="" src={imageUrl} className="size-8 rounded-full" />
                                        </MenuButton>
                                    </div>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none">
                                        {userNavigation.map((item) => (
                                            item.name !== "Sign out" ? (
                                                <MenuItem key={item.name}>
                                                    <a href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ) : null
                                        ))}
                                        <MenuItem>
                                            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                Sign out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">

                        </div>
                    </div>
                </div>

                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pt-4 pb-3">
                        <div className="flex items-center px-5">
                            <div className="shrink-0">
                                <img alt="" src={imageUrl} className="size-10 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base/5 font-medium text-white">{name}</div>
                                <div className="text-sm font-medium text-gray-400">{email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>

            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7x1 px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dash
                    </h1>
                </div>
            </header>

            {/* Page Content */}
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-grow">
                <Outlet />  {/* Dynamic page content */}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} Netflix Clone. All rights reserved.</p>
            </footer>
        </div>
    );
}
