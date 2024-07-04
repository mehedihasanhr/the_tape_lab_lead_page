import { Button } from "@/Components/Button";
import { SearchBox } from "@/Components/Searchbox";
import { Separator } from "@/Components/Separator";
import { RegisteredList } from "@/Components/table/RegisteredList";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { IconDownload, IconRefresh } from "@tabler/icons-react";
import { toast } from "sonner";

export default function Dashboard({ auth, contacts, filters }) {
    // search
    const handleSearch = (text) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (text) {
            searchParams.set("q", text);
        } else if (!text && filters.search) {
            searchParams.delete("q");
        }

        const paramsObject = Object.fromEntries(searchParams.entries());
        const newUrl = route("dashboard", paramsObject);
        router.get(newUrl);
    };

    // sync with hubSpot
    const handleSync = () => {
        router.post(route("contacts.sync"), {
            onSuccess: (res) => {
                toast.success("Successfully Sync.");
            },
        });
    };

    return (
        <Authenticated user={auth.user} header="Dashboard">
            <Head title="Dashboard" />
            <div className="border overflow-hidden rounded-lg">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 py-[18px] px-5">
                    <div className="flex items-center gap-4">
                        <h4>Registered List</h4>
                        <Separator orientation="vertical" className="h-10" />
                        <div className="flex items-center gap-2.5">
                            <SearchBox
                                defaultValue={filters.search}
                                handleSearch={handleSearch}
                                placeholder="Search..."
                                className="text-sm"
                            />
                            {filters.search ? (
                                <Button
                                    variant="outline"
                                    onClick={() => handleSearch("")}
                                >
                                    Clear
                                </Button>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={handleSync}>
                            <IconRefresh size={19} opacity={0.8} />
                            <span> Sync</span>
                        </Button>

                        <a href={route("export.contact")} target="__blank">
                            <Button>
                                <IconDownload size={19} />
                                <span className="line-clamp-1">
                                    Export .CSV File
                                </span>
                            </Button>
                        </a>
                    </div>
                </div>

                <RegisteredList
                    contacts={contacts}
                    filters={filters}
                    auth={auth}
                />
            </div>
        </Authenticated>
    );
}
