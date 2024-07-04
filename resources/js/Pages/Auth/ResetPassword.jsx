import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import { InputError } from "@/Components/InputError";
import { Logo } from "@/Components/Logo";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onSuccess: () => {
                toast.success("");
            },
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            <div className="w-screen h-screen">
                <div className="container h-screen flex items-center justify-center">
                    <div className="w-full max-w-[300px]">
                        <form
                            onSubmit={submit}
                            className="w-full flex flex-col items-center"
                        >
                            <Logo className="mb-4" />
                            <p className="text-sm text-center text-body-text-secondary">
                                Please set new password. Ensure your password is
                                enough strong.
                            </p>

                            <div className=" w-full mt-4">
                                <label htmlFor="password" value="Password" />

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="New Password"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full mt-2">
                                <label
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <Input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-full mt-2">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Reset Password"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
