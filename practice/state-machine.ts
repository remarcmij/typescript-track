type DownloadState =
  | { kind: "idle" }
  | {
      kind: "downloading";
      progress: number;
      bytesLoaded: number;
      bytesTotal: number;
    }
  | { kind: "done"; filePath: string }
  | { kind: "failed"; error: string };

function assertNever(value: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(value)}`);
}

function describeState(state: DownloadState): string {
  switch (state.kind) {
    case "idle":
      return "Waiting to start.";
    case "downloading":
      return `Downloading… ${state.progress}% (${state.bytesLoaded} / ${state.bytesTotal} bytes)`;
    case "done":
      return `Download complete: ${state.filePath}`;
    case "failed":
      return `Download failed: ${state.error}`;
    default:
      return assertNever(state);
  }
}

function isDownloading(
  state: DownloadState,
): state is Extract<DownloadState, { kind: "downloading" }> {
  return state.kind === "downloading";
}

const idle: DownloadState = { kind: "idle" };
const downloading: DownloadState = {
  kind: "downloading",
  progress: 42,
  bytesLoaded: 4200,
  bytesTotal: 10000,
};
const done: DownloadState = { kind: "done", filePath: "/tmp/file.zip" };
const failed: DownloadState = { kind: "failed", error: "Network timeout" };

const states: DownloadState[] = [idle, downloading, done, failed];

for (const state of states) {
  console.log(describeState(state));
  if (isDownloading(state)) {
    console.log(`  Progress: ${state.progress}%`);
  }
}
