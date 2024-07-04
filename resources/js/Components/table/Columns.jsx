import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";

const columnHelper = createColumnHelper();

export const Columns = [
    columnHelper.accessor("hubSpotId", {
        header: "HubSpot Id",
        id: "hubspot_id",
        cell: (info) => <span className="block">{info.getValue()}</span>,
    }),

    columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: (info) => {
            const contact = info.row.original;
            return (
                <span className="block min-w-[100px]">
                    {contact?.getFullName()}
                </span>
            );
        },
    }),

    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("updatedAt", {
        header: "Last Modified Date",
        cell: (info) => (
            <span className="block min-w-[80px]">
                {dayjs(info.getValue()).format("MMM DD, YYYY")}
            </span>
        ),
    }),
];
