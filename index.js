const X_OFFSET = 420;

function note(name, y, ledger = null) {
  return { name, y, ledger };
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
const TREBLE_NOTES = [
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
];
const BASS_NOTES = [
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

const QUERY = window.location.search.substr(1).split("&")

function query_notes() {
  if (QUERY.indexOf("treble") != -1) {
    return TREBLE_NOTES;
  }
  if (QUERY.indexOf("bass") != -1) {
    return BASS_NOTES;
  }
  return [...BASS_NOTES, ...TREBLE_NOTES];
}

const NOTES = query_notes();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawNote(note, x) {
  const NOTE_RADIUS = 16;
  const LEDGER_WIDTH = 48;
  const LEDGER_HEIGHT = 8;
  ctx.beginPath();
  ctx.arc(x, note.y, NOTE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  if (note.ledger !== null) {
    for (let i = 0; i < note.ledger.count; i++) {
      const y = note.y + (note.ledger.offset * GAP_WIDTH) + (2 * i * GAP_WIDTH * note.ledger.direction) - (LEDGER_HEIGHT / 2);
      ctx.fillRect(x - LEDGER_WIDTH / 2, y, LEDGER_WIDTH, LEDGER_HEIGHT);
    }
  }
}

function query_count() {
  const param = QUERY.filter(p => p.startsWith("count="))[0];
  if (param !== undefined) {
    const paramValue = param.split("count=")[1];
    return parseInt(paramValue);
  } else {
    return 1;
  }
}

const NOTE_RANGE = 12;

function drawRandomNotes() {
  clear();
  const baseIndex = parseInt(Math.random() * NOTES.length);
  const seen = new Set();
  for (let i = 0; i < query_count(); i++) {
    let index;
    while (true) {
      const candidate = baseIndex + parseInt(Math.random() * (NOTE_RANGE + 1) - (NOTE_RANGE / 2));
      if (candidate >= 0 && candidate < NOTES.length && !seen.has(candidate)) {
        seen.add(candidate);
        index = candidate;
        break;
      }
    }
    drawNote(NOTES[index], X_OFFSET + (i * 100));
  }
}

document.onkeydown = (e) => {
  drawRandomNotes();
}

document.onmousedown = (e) => {
  drawRandomNotes();
}

drawRandomNotes();

function query_time() {
  const param = QUERY.filter(p => p.startsWith("time="))[0];
  if (param !== undefined) {
    const paramValue = param.split("time=")[1];
    return parseInt(paramValue);
  } else {
    return null;
  }
}

const periodMs = query_time();
if (periodMs) {
  setInterval(drawRandomNotes, periodMs);
}
