import { Button } from "@/Components/Button";
import { Logo } from "@/Components/Logo";
import { Separator } from "@/Components/Separator";
import { Head, useForm } from "@inertiajs/react";
import { IconDownload, IconPlayerPlay, IconX } from "@tabler/icons-react";
import * as React from "react";

import { LeftContentAnimation } from "@/Components/Animation/LeftContentAnimation";
import { SidebarAnimation } from "@/Components/Animation/SidebarAnimation";
import { Input } from "@/Components/Input";
import VideoPlayer from "@/Components/VideoPlayer";
import { VisitWebsiteButton } from "@/Components/VisitWebsiteButton";

export default function Welcome({ auth }) {
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
    const [isPlay, setIsPlay] = React.useState(false);

    const { data, setData, post, processing, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact.store"));
    };

    return (
        <>
            <Head title="Welcome" />

            <div
                className="container flex gap-2.5 lg:gap-8 py-8 min-h-screen px-6 lg:px-8 overflow-x-hidden"
                style={{ overflowY: isSidebarVisible ? "hidden" : "auto" }}
            >
                <div className="flex w-full gap-8 flex-1">
                    <div className="relative flex-1 flex items-center flex-col transition-all duration-300 ease-linear">
                        <LeftContentAnimation
                            isSidebarVisitable={isSidebarVisible}
                        >
                            <div className="relative h-full w-full sm:w-[576px] md:w-[820px] flex flex-col justify-between gap-5">
                                <>
                                    {/* heading */}
                                    <div className="flex items-center w-full">
                                        <Logo />
                                    </div>

                                    {isPlay ? (
                                        <div className="relative w-full max-h-[500px] px-5 xl:px-16">
                                            <div className="absolute top-0 right-0 -translate-y-20">
                                                {/* video cross button */}
                                                <Button
                                                    onClick={() =>
                                                        setIsPlay(false)
                                                    }
                                                    variant="outline"
                                                    size="icon-sm"
                                                    className=" flex items-center justify-center rounded-full "
                                                >
                                                    <IconX
                                                        stroke={1.5}
                                                        size={17}
                                                        className="text-primary-active"
                                                    />
                                                </Button>
                                            </div>
                                            <div className="overflow-hidden w-full rounded-lg aspect-video">
                                                <VideoPlayer
                                                    url="https://youtu.be/gSN1M8bogwc?si=qmyUQBmGZB_7CEPn"
                                                    isPlay={true}
                                                    muted={true}
                                                    controls={true}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <div className="flex items-center flex-col md:flex-row gap-16 py-16">
                                                {/* content */}
                                                <div className="flex-1">
                                                    <div className="flex flex-col gap-6">
                                                        <h1 className="text-[30px] sm:text-[40px] sm:leading-[44px] font-bold">
                                                            The Engineer's
                                                            Blueprint for
                                                            <span className="text-primary">
                                                                {" Skin-Safe "}
                                                            </span>
                                                            Adhesive Devices
                                                        </h1>

                                                        <Separator />

                                                        <p className="text-body-text-secondary">
                                                            Unlock the future of
                                                            healthcare with this
                                                            cutting-edge webinar
                                                            exploring the
                                                            integration of
                                                            advanced adhesives
                                                            in medical devices,
                                                            designed to empower
                                                            innovators and
                                                            engineers in the
                                                            wearable tech space
                                                        </p>

                                                        <Button variant="secondary">
                                                            <div className="flex gap-1.5">
                                                                Download PDF
                                                                <IconDownload
                                                                    size="21"
                                                                    stroke={1.5}
                                                                />
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div
                                                    onClick={() =>
                                                        setIsPlay(true)
                                                    }
                                                    className="relative w-full md:w-[300px] md:h-[200px] bg-primary overflow-hidden rounded-[14px]"
                                                >
                                                    <img
                                                        src="/storage/thumbnail/Video.png"
                                                        width={300}
                                                        className="w-full h-full object-fill"
                                                    />

                                                    <div className="flex absolute top-0 left-0 inset-0 items-center justify-center bg-body-text/10 hover:bg-body-text/40 group transition-all duration-300 ease-linear pointer-events-none">
                                                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-md group-hover:scale-125 transition-all duration-300 ease-linear pointer-events-none">
                                                            <IconPlayerPlay className="text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator />
                                            <div className="flex items-center flex-col text-center sm:text-left sm:flex-row sm:justify-between gap-6 py-6 px-7 sm:px-0">
                                                <p className="text-body-text-secondary">
                                                    Hosted by
                                                    <span className="text-body-text px-1.5 font-medium">
                                                        Jason Zajac
                                                    </span>
                                                    with <br /> The Tape Lab,
                                                    President & Founder
                                                </p>

                                                <Button
                                                    data-active={
                                                        isSidebarVisible
                                                    }
                                                    onClick={() =>
                                                        setIsSidebarVisible(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                    className="ring-[1px] w-full sm:w-fit ring-primary ring-offset-2"
                                                >
                                                    Reserve My Spot
                                                </Button>
                                            </div>
                                            <Separator />
                                        </div>
                                    )}

                                    <div className="flex justify-end">
                                        <VisitWebsiteButton />
                                    </div>
                                </>
                            </div>
                        </LeftContentAnimation>
                    </div>

                    {/* Sidebar  */}

                    <SidebarAnimation isOpen={isSidebarVisible}>
                        <div className="h-full flex w-full min-w-[300px] sm:min-w-[450px] bg-white">
                            <Separator orientation="vertical" />
                            <div className="relative flex items-center h-full px-4 sm:pl-16">
                                <Button
                                    onClick={() => setIsSidebarVisible(false)}
                                    variant="outline"
                                    size="icon-sm"
                                    className="absolute top-32 -left-4 flex items-center justify-center rounded-full"
                                >
                                    <IconX
                                        stroke={1.5}
                                        size={17}
                                        className="text-primary-active"
                                    />
                                </Button>
                                <div>
                                    <div className="mb-8">
                                        <h1>
                                            <span className="text-primary">
                                                {"Reserve "}
                                            </span>
                                            My Spot
                                        </h1>
                                        <p className="text-lg text-body-text-secondary">
                                            Space is limited. Reserve your spot
                                            now.
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-2"
                                    >
                                        <Input
                                            placeholder="First name"
                                            value={data.name}
                                            type="text"
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    firstName: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            placeholder="Last name"
                                            value={data.lastName}
                                            type="text"
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    lastName: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            placeholder="Email address"
                                            value={data.email}
                                            type="email"
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    email: e.target.value,
                                                });
                                            }}
                                        />

                                        <Button
                                            type="submit"
                                            className="w-full h-11"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Processing..."
                                                : "Reserve My Spot"}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </SidebarAnimation>
                </div>
            </div>
        </>
    );
}
