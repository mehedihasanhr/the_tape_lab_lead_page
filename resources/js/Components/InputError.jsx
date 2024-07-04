export function InputError({ message }) {
    if (!message) return;
    return <div className="text-sm text-primary">{message}</div>;
}
