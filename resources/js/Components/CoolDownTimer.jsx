import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button } from "./Button";

const CoolDownTimer = ({
    processing,
    coolDownDuration,
    onCoolDownComplete,
}) => {
    const [coolDownEndTime, setCoolDownEndTime] = useState();
    const [timeLeft, setTimeLeft] = useState(coolDownDuration);

    useEffect(() => {
        if (!coolDownEndTime) {
            return;
        }

        const interval = setInterval(() => {
            const now = dayjs();
            const diff = coolDownEndTime.diff(now, "second");

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                onCoolDownComplete();
            } else {
                setTimeLeft(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [coolDownEndTime, onCoolDownComplete]);

    useEffect(() => {
        if (!coolDownDuration) return;
        const endTime = dayjs().add(coolDownDuration, "second");
        setCoolDownEndTime(endTime);
    }, [coolDownDuration]);

    return (
        <Button className="w-full" disabled={processing || timeLeft}>
            {timeLeft > 0
                ? `Resend after ${timeLeft}s`
                : "Email Password Reset Link"}
        </Button>
    );
};

export default CoolDownTimer;
