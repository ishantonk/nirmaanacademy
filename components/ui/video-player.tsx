"use client";

import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

interface VideoPlayerProps {
    videoUrl: string;
    autoPlay?: boolean;
    controls?: boolean;
}

export default function VideoPlayer({
    videoUrl,
    autoPlay = false,
    controls = true,
}: VideoPlayerProps) {
    // Using a ref to control the ReactPlayer instance
    const playerRef = useRef<ReactPlayer>(null);
    const [isReady, setIsReady] = useState(false);
    // const [playing, setPlaying] = useState(false);

    // const handleEnded = () => {
    //     setPlaying(false);
    //     // Optionally seek back to start
    //     if (playerRef.current) {
    //         playerRef.current.seekTo(0);
    //     }
    // };

    return (
        <div className="relative w-full h-full">
            {!isReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        Loading video...
                    </p>
                </div>
            )}
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                // playing={playing}
                controls={controls} // Hide default YouTube controls
                autoPlay={autoPlay}
                width="100%"
                height="100%"
                onReady={() => setIsReady(true)}
                // onEnded={handleEnded}
                config={{
                    playerVars: {
                        showinfo: 0, // Hide video title and uploader info
                        modestbranding: 1, // Hide YouTube logo
                        rel: 0, // Disable related videos at the end
                        iv_load_policy: 3, // Disable autoplay of the next video
                    },
                    embedOptions: {
                        host: 'https://www.youtube-nocookie.com' // Use privacy-enhanced mode
                    }
                }}
            />
        </div>
    );
}
