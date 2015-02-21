Glowboard_minPitch = 0;
Glowboard_maxPitch = 128;
Glowboard_enabled = {};

// Maps a midi pitch with some state information to a color.
function Glowboard_keyColorByParams(pitch, enabled, active) {
  var h,s,v;
  h = 130*((Glowboard_maxPitch-pitch)/(Glowboard_maxPitch-Glowboard_minPitch))+170;
  if (enabled) {
    v = 60;
    s = 70;
    if (active) {
      v = 100;
      s = 100;
    }
  } else {
    v = 20;
    s = 100;
  }
  var rgb = HSV2RGB(h,s,v);
  return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
}

function Glowboard_keyColor(pitch, active) {
  var enabled = false;
  if (Glowboard_enabled[pitch]) enabled = true;
  return Glowboard_keyColorByParams(pitch, enabled, active);
}

// Function to specify the enabled keys.
function Glowboard_setEnabled(note_ids) {
  Glowboard_enabled = {}
  for (var i=0; i<note_ids.length; i++) Glowboard_enabled[note_ids[i]] = true;
  $(".glowboard_key").css('background-color', function(i) { return Glowboard_keyColor(i+Glowboard_minPitch); });
}

// Create the glowboard UI.
function Glowboard_init(parent_element, pitch_min, pitch_max) {
  // Create and insert the table for the keys.
  var html_string = '<table id="glowboard_table" width="100%" height="100%" border="1px" cellpadding="0" cellspacing="0"><tr">';
  for (var i=pitch_min; i<=pitch_max; i++) {
    html_string += '<td id="glowboard_key_'+i+'" class="glowboard_key" style="height:100%;background-color:#f00"></td>';
  }
  html_string += '</tr></table>';
  parent_element.html(html_string);
  // Color the keys according to the scheme.
  Glowboard_minPitch = pitch_min;
  Glowboard_maxPitch = pitch_max;
  Glowboard_setEnabled([]);
}

function Glowboard_noteOn(note) {
  $('#glowboard_key_'+note).css('background-color', Glowboard_keyColor(note, true));
}

function Glowboard_noteOff(note) {
  $('#glowboard_key_'+note).css('background-color', Glowboard_keyColor(note));
}

