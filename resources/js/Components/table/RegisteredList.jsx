import { usePageLoading } from "@/Hooks/usePageLoading";
import { Contact } from "@/Utils/contact";
import { cn } from "@/Utils/lib";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";
import { router } from "@inertiajs/react";
import { IconChevronDown } from "@tabler/icons-react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Loader } from "../Loader";
import { Columns } from "./Columns";
import { Paginate } from "./Paginate";

export const RegisteredList = ({ contacts, filters, auth }) => {
    const isLoading = usePageLoading();
    const [data, setData] = React.useState([]);
    const [paginate] = React.useState({
        pageIndex: Number(filters.page) - 1 || 0,
        pageCount: Number(filters.count) || 0,
    });

    React.useEffect(() => {
        const _contacts = contacts?.data?.map((data) => new Contact(data));
        setData(_contacts);
    }, [contacts.data]);

    const table = useReactTable({
        data,
        columns: Columns,
        state: {
            paginate,
        },
        getCoreRowModel: getCoreRowModel(),
    });

    // Pagination
    const handlePagination = ({ selected }) => {
        if (selected === paginate.pageIndex) return;

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", selected + 1);

        const paramsObject = Object.fromEntries(searchParams.entries());
        const newUrl = route("dashboard", paramsObject);
        router.get(newUrl);
    };

    // Pagination
    const handlePageCount = (count) => {
        if (count === paginate.pageCount) return;

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("count", count);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());
        const newUrl = route("dashboard", paramsObject);
        router.get(newUrl);
    };

    return (
        <div>
            {isLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg border px-3 py-2.5 bg-white rounded-lg">
                    <Loader title="Processing..." />
                </div>
            ) : null}
            <div className="w-full overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-[#F8F8F8]">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{
                                            maxWidth: header.getSize()
                                                ? `${header.getSize()}px`
                                                : "100%",
                                        }}
                                        className="text-left py-3 px-2.5 text-xs text-[#888888] first:pl-5 last:pr-5 border-y"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-muted/10">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="py-3 px-2.5 text-sm text-[#333333] first:pl-5 last:pr-5 font-medium border-b peer-last:border-b-0 border-border"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center flex-wrap justify-between gap-4 py-3 px-5">
                {/* page selection */}
                <div className="flex items-center flex-nowrap space-x-2.5 text-sm text-body-text">
                    <span className="whitespace-nowrap">Rows per page</span>
                    <Listbox
                        value={paginate.pageCount}
                        onChange={handlePageCount}
                    >
                        <ListboxButton
                            className={cn(
                                "relative block w-16 rounded-lg border py-1 pr-8 pl-3 text-left text-sm/6 text-body-text",
                                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                            )}
                        >
                            {paginate.pageCount}
                            <IconChevronDown
                                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                                aria-hidden="true"
                            />
                        </ListboxButton>

                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className={cn(
                                "min-w-[var(--button-width)] rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 text-sm"
                            )}
                        >
                            {[10, 20, 30, 50, 100].map((item) => (
                                <ListboxOption
                                    key={item}
                                    value={item}
                                    className="group flex cursor-default items-center gap-2 rounded-lg py-1 px-2.5 select-none data-[focus]:bg-black/5 data-[selected]:bg-black/5"
                                >
                                    <div className="text-sm  ">{item}</div>
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>

                {/* paginate */}
                <Paginate
                    pageCount={contacts?.last_page ?? 1}
                    currentPage={paginate.pageIndex}
                    handlePageClick={handlePagination}
                />
            </div>
        </div>
    );
};
