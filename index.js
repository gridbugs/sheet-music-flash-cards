const X_OFFSET = 420;

function note(name, y, ledger = null) {
  return { name, x: X_OFFSET, y, ledger };
}

const TREBLE_MIDDLE_C_Y = 349;
const BASS_MIDDLE_C_Y = 475;
const GAP_WIDTH = 20.6;
function treble_y(i) {
  return TREBLE_MIDDLE_C_Y - GAP_WIDTH * i;
}
function bass_y(i) {
  return BASS_MIDDLE_C_Y + GAP_WIDTH * i;
}
const NOTES = [
  // treble
  note("B", treble_y(-1), { count: 1, offset: -1, direction: -1 }),
  note("C", treble_y(0), { count: 1, offset: 0, direction: -1 }),
  note("D", treble_y(1)),
  note("E", treble_y(2)),
  note("F", treble_y(3)),
  note("G", treble_y(4)),
  note("A", treble_y(5)),
  note("B", treble_y(6)),
  note("C", treble_y(7)),
  note("D", treble_y(8)),
  note("E", treble_y(9)),
  note("F", treble_y(10)),
  note("G", treble_y(11)),
  note("A", treble_y(12), { count: 1, offset: 0, direction: 1 }),
  note("B", treble_y(13), { count: 1, offset: 1, direction: 1 }),
  note("C", treble_y(14), { count: 2, offset: 0, direction: 1 }),
  note("D", treble_y(15), { count: 2, offset: 1, direction: 1 }),
  note("E", treble_y(16), { count: 3, offset: 0, direction: 1 }),
  // bass
  note("A", bass_y(16), { count: 3, offset: 0, direction: -1 }),
  note("B", bass_y(15), { count: 2, offset: -1, direction: -1 }),
  note("C", bass_y(14), { count: 2, offset: 0, direction: -1 }),
  note("D", bass_y(13), { count: 1, offset: -1, direction: -1 }),
  note("E", bass_y(12), { count: 1, offset: 0, direction: -1 }),
  note("F", bass_y(11)),
  note("G", bass_y(10)),
  note("A", bass_y(9)),
  note("B", bass_y(8)),
  note("C", bass_y(7)),
  note("D", bass_y(6)),
  note("E", bass_y(5)),
  note("F", bass_y(4)),
  note("G", bass_y(3)),
  note("A", bass_y(2)),
  note("B", bass_y(1)),
  note("C", bass_y(0), { count: 1, offset: 0, direction: 1 }),
  note("D", bass_y(-1), { count: 1, offset: 1, direction: 1 }),
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";

function drawNote(note) {
  const NOTE_RADIUS = 16;
  const LEDGER_WIDTH = 48;
  const LEDGER_HEIGHT = 8;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(note.x, note.y, NOTE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  if (note.ledger !== null) {
    for (let i = 0; i < note.ledger.count; i++) {
      const y = note.y + (note.ledger.offset * GAP_WIDTH) + (2 * i * GAP_WIDTH * note.ledger.direction) - (LEDGER_HEIGHT / 2);
      ctx.fillRect(note.x - LEDGER_WIDTH / 2, y, LEDGER_WIDTH, LEDGER_HEIGHT);
    }
  }
}

function drawRandomNote() {
  const index = parseInt(Math.random() * NOTES.length);
  drawNote(NOTES[index]);
}

document.onkeydown = (e) => {
  drawRandomNote();
}

document.onmousedown = (e) => {
  drawRandomNote();
}

drawRandomNote();

const periodMs = parseInt(window.location.hash.slice(1));
if (periodMs) {
  setInterval(drawRandomNote, periodMs);
}
