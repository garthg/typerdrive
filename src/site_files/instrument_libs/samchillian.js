
// SamChillian state.
var SAM_CHILLIAN_STEP = null;

// Initialize SamChillian.
function SamChillianInit(pitch_min, pitch_max) {
  // Initialize Sam Chillian counter to middle of range.
  SAM_CHILLIAN_STEP = Math.round(SCALIFIER_SCALE_LENGTH / 2);
}

function samChillianUpdate(step) {
  var curr = SAM_CHILLIAN_STEP + step;
  curr = Math.min(curr, SCALIFIER_SCALE_LENGTH-1);
  curr = Math.max(curr, 0);
  SAM_CHILLIAN_STEP = curr;
  $.print("Current SC: "+curr);
  var note = scalifierNoteAtStep(curr);
  return note;
}

function samChillianSendInput(key) {
  return samChillianUpdate(samChillianKeyMap(key));
}
