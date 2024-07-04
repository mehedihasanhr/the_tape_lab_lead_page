import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import { Logo } from "@/Components/Logo";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing } = useForm({
        email: "rony@artrony.com",
        password: "password",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    React.useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Login" />
            <div className="w-screen h-screen">
                <div className="container h-full flex items-center justify-center">
                    <div className="w-full max-w-[300px] flex flex-col gap-8">
                        <Logo />

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2"
                        >
                            {status && (
                                <div className="font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}
                            <Input
                                placeholder="Full name"
                                value={data.email}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button
                                className="w-full h-11"
                                disabled={processing}
                            >
                                {processing ? "Processing..." : "Login"}
                            </Button>
                        </form>
                        <Link
                            href={route("password.request")}
                            className="text-center text-[#969696] hover:text-primary hover:underline"
                        >
                            Forgot Password
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
