import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import { InputError } from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="w-screen h-screen">
                <div className="container h-full flex items-center justify-center">
                    <div className="w-full max-w-[300px] flex flex-col gap-8 text-center">
                        <div>
                            <h2>Confirm Password</h2>
                            <p className="text-sm text-gray-600 mt-[2px]">
                                This is a secure area of the application. Please
                                confirm your password before continuing.
                            </p>
                        </div>

                        <form onSubmit={submit} className="flex flex-col gap-2">
                            <label htmlFor="password" value="Password" />

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />

                            <Button className="w-full" disabled={processing}>
                                Confirm
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
