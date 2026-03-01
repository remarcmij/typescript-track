let title: string = "Bohemian Rhapsody";
let artist: string = "Queen";
let year: number = 1975;

interface Song {
  title: string;
  artist: string;
  duration: number;
}

const currentSong: Song = {
  title: "Bohemian Rhapsody",
  artist: "Queen",
  duration: 354,
};

const playlist: Song[] = [
  { title: "Bohemian Rhapsody", artist: "Queen", duration: 354 },
  { title: "Hotel California", artist: "Eagles", duration: 391 },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: 482 },
];

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
}

function getInfo(input: string | Song): string {
  if (typeof input === "string") {
    return input;
  }
  return `${input.title} by ${input.artist}`;
}

console.log(formatDuration(214)); // "3:34"
console.log(getInfo("My playlist")); // "My playlist"
console.log(getInfo(currentSong)); // "Bohemian Rhapsody by Queen"

playlist.forEach((song) =>
  console.log(`${getInfo(song)} (${formatDuration(song.duration)})`),
);
