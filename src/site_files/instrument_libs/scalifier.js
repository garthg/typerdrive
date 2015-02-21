Scalifier_pitchClasses = [0,1,2,3,4,5,6,7,8,9,10,11,12];  // Defines notes of the scale.
Scalifier_pitchOffset = 0;  // Defines the key of the scale.
Scalifier_scaleOffset = 0;
Scalifier_scaleLength = 128;
Scalifier_scaleNotes = null;

function Scalifier_computeScaleNotes() {
  Scalifier_scaleNotes = [];
  for (var i=0; i<Scalifier_scaleLength; i++) {
    Scalifier_scaleNotes.push(Scalifier_noteAtStep(i));
  }
}

function Scalifier_init(pitch_classes, pitch_offset) {
  Scalifier_pitchClasses = pitch_classes;
  Scalifier_pitchOffset = pitch_offset;
  Scalifier_computeScaleNotes();
}

/*
 * Returns the note for the given scale step without regard to
 * specified scale minimum or scale length.
 * The note is based on the pitch classes and pitch offset values.
 */
function Scalifier_noteAtStepAbsolute(step) {
  var octave = Math.floor(step / Scalifier_pitchClasses.length);
  var offset = Math.floor(step % Scalifier_pitchClasses.length);
  var note = octave*12 + Scalifier_pitchClasses[offset] + Scalifier_pitchOffset;
  return note;
}

/*
 * Returns the scale step for the given note without regard to
 * specified scale minimum or scale length.
 * The step is based on the pitch classes and pitch offset values.
 * If the note is not in the scale, if 'approximate' is true the
 * closest step will be returned, and if 'approximate' is false 
 * null will be returned.
 */
function Scalifier_stepForNoteAbsolute(note, approximate) {
  var octave = Math.floor(note / 12);
  var curr_step = Scalifier_pitchClasses.length * octave;
  var curr_pitch = Scalifier_noteAtStepAbsolute(curr_step);
  while (curr_pitch < note) {
    curr_step++;
    curr_pitch = Scalifier_noteAtStepAbsolute(curr_step);
  }
  if (curr_pitch == note) {
    return curr_step;
  } else {
    if (approximate) {
      var prev_pitch = Scalifier_noteAtStepAbsolute(curr_step - 1);
      var ratio = (note - prev_pitch) / (curr_pitch - prev_pitch);
      return (ratio<.5)?curr_step-1:curr_step;
    } else {
      return null;
    }
  }
}

/*
 * Returns the note at the given step offset by the minimum,
 * or null if the step is outside the range.
 */
function Scalifier_noteAtStep(step) {
  $.print("step: "+step);
  if (step == null) return null;
  if (step < 0 || step >= Scalifier_scaleLength) return null;
  return Scalifier_noteAtStepAbsolute(step + Scalifier_scaleOffset);
}

/*
 * Sets the scalifier notes to start at scale_min and limits
 * the number of notes to scale_length.
 */
function Scalifier_setRangeByStep(scale_min, scale_length) {
  Scalifier_scaleOffset = scale_min;
  Scalifier_scaleLength = scale_length;
  $.print("scale length: "+Scalifier_scaleLength);
  Scalifier_computeScaleNotes();
}

/*
 * Sets the scalifier notes such that there is no note
 * below pitch_min and no note above pitch_max.
 */
function Scalifier_setRangeByPitch(pitch_min, pitch_max) {
  var scale_max = Math.ceil(pitch_max*Scalifier_pitchClasses.length/12 + Scalifier_pitchClasses.length + 1);
  while (Scalifier_noteAtStepAbsolute(scale_max) > pitch_max) scale_max--;
  var scale_min = Math.floor(pitch_min*Scalifier_pitchClasses.length/12 - Scalifier_pitchClasses.length - 1);
  while (Scalifier_noteAtStepAbsolute(scale_min) < pitch_min) scale_min++;
  Scalifier_setRangeByStep(scale_min, scale_max);
}

function Scalifier_getMinPitch() {
  return Scalifier_noteAtStep(0);
}

function Scalifier_getMaxPitch() {
  return Scalifier_noteAtStep(Scalifier_scaleLength-1);
}

function Scalifier_getScaleNotes() {
  return Scalifier_scaleNotes;
}
