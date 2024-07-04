import { Button } from "@/Components/Button";
import { Head, Link } from "@inertiajs/react";

export default function ResetPasswordStatus() {
    return (
        <>
            <Head title="Reset Password" />
            <div className="container h-screen flex items-center justify-center">
                <div className="flex flex-col items-center text-center w-full max-w-sm">
                    <img
                        src="/storage/thumbnail/password-updated.svg"
                        alt=""
                        className="mb-8"
                    />
                    <h2>Password Updated!</h2>
                    <p className="text-body-text-secondary">
                        Your password has been updated. Now you can login your
                        account with new password.
                    </p>
                    <Link href={route("dashboard")} className="mt-8 block">
                        <Button size="sm">Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
