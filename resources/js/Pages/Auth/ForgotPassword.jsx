import CoolDownTimer from "@/Components/CoolDownTimer";
import { Input } from "@/Components/Input";
import { InputError } from "@/Components/InputError";
import { Logo } from "@/Components/Logo";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ForgotPassword({ status, cooldown }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    return (
        <>
            <Head title="Forgot Password" />

            <div className="w-screen h-screen">
                <div className="container h-screen flex items-center justify-center">
                    <div className="w-full max-w-sm flex flex-col items-center">
                        <div className="mb-4">
                            <Logo />
                        </div>
                        <div className="mb-4 text-sm text-body-text-secondary text-center">
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </div>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600 text-center">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="w-full">
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                placeholder="Email address"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />

                            <div className="flex items-center justify-end mt-4">
                                <CoolDownTimer
                                    processing={processing}
                                    coolDownDuration={cooldown}
                                    onCoolDownComplete={() => null}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
