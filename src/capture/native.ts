// Copyright © 2026 Christopher Snow
// Native terminal examples, never submitted to the browser processing adapter.
const encoding =
  '-t 5 -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p';
export const captureCommands = {
  session: `printf '%s\\n' "$XDG_SESSION_TYPE"`,
  devices: "ffmpeg -devices",
  encoders: "ffmpeg -encoders",
  windows: `ffmpeg -f gdigrab -framerate 15 -i desktop ${encoding} screen-windows.mp4`,
  macDevices: 'ffmpeg -f avfoundation -list_devices true -i ""',
  macos: `ffmpeg -f avfoundation -framerate 15 -capture_cursor 1 -i "SCREEN_INDEX:none" ${encoding} screen-macos.mp4`,
  linux: `ffmpeg -f x11grab -framerate 15 -video_size 1280x720 -i "${"${DISPLAY}"}+0,0" ${encoding} screen-linux.mp4`,
} as const;
