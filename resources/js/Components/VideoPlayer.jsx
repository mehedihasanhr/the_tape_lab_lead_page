import ReactPlayer from "react-player";

export default function VideoPlayer({ url, isPlay, ...props }) {
    return (
        <ReactPlayer
            playing={isPlay}
            url={url}
            width="100%"
            height="100%"
            className="rounded-lg aspect-video"
            {...props}
        />
    );
}
