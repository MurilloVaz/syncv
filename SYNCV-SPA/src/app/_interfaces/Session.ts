export interface SessionLogin {
    Id?: string;
}

export interface VideoSync {
    paused: boolean;
    currentTime: number;
    videoId: string;
}
