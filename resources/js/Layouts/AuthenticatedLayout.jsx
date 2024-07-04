import { Button } from "@/Components/Button";
import { Logo } from "@/Components/Logo";
import { Separator } from "@/Components/Separator";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Authenticated({ user, header, backLink, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="container px-4 sm:px-8 flex flex-col gap-6">
            <div>
                <div className="flex items-center justify-between py-3.5">
                    <Link href={route("dashboard")}>
                        <Logo />
                    </Link>

                    <div className="flex items-center">
                        <div className="relative">
                            <Menu>
                                <MenuButton as="div">
                                    <Button
                                        variant="ghost"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        <span className="inline-flex rounded-md">
                                            {user.name}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </Button>
                                </MenuButton>
                                <MenuItems
                                    anchor="bottom end"
                                    transition={true}
                                    className="bg-white z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in"
                                >
                                    <MenuItem>
                                        <Link
                                            className="block data-[focus]:bg-slate-100 text-base px-3.5 h-7 rounded-sm"
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full text-left px-3.5 block text-base rounded-sm h-7 data-[focus]:bg-slate-100"
                                        >
                                            Logout
                                        </Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
                <Separator />
            </div>
            {header && (
                <div className="flex items-center justify-between">
                    <h3>{header}</h3>
                    {backLink ? (
                        <Button size="sm" onClick={() => router.get(backLink)}>
                            Back
                        </Button>
                    ) : null}
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
