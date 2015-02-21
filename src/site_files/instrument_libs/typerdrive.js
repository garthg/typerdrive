var Typerdrive_jplayerSwfPath = 'libs/jplayer/';
var Typerdrive_htmlPrefix = 'jquery_jplayer';

/*
 * Create the JPlayer instances for the given note_ids.
 */
function Typerdrive_initJPlayers(note_ids, audio_file_prefix, parent_element, onReady) {
  if (onReady == null) onReady = function() { ; };
  Typerdrive_activeNotes = {};
  // Create the html for the players.
  var html_string = '';
  for (var i=0; i<note_ids.length; i++) {
    var x = note_ids[i];
    html_string += '<div id="'+Typerdrive_htmlPrefix+'_'+x+'" class="jp-jplayer"></div><div id="jp_container_'+x+'" class="jp-audio">';
    html_string += '</div>';
  }
  parent_element.append(html_string);
  // Create the JPlayer instances.
  for (var i=0; i<note_ids.length; i++) {
    var x = note_ids[i];
    $("#"+Typerdrive_htmlPrefix+'_'+x).jPlayer({
      ready: function () {
        var curr_id = this.id.substr(this.id.lastIndexOf('_')+1);
        $(this).jPlayer("setMedia", {
          mp3: audio_file_prefix+curr_id+".mp3",
          m4a: audio_file_prefix+curr_id+".m4a",
          oga: audio_file_prefix+curr_id+".ogg"
        });
        onReady(curr_id);
      },
      swfPath: Typerdrive_jplayerSwfPath,
      cssSelectorAncestor: "#jp_container_"+x,
      supplied: "mp3, m4a, oga",
      preload: "auto",
      volume: 1.0,
      wmode: "window"
    });
  }
}

function Typerdrive_playerForNote(note) {
  if (note == null) return null;
  return $('#'+Typerdrive_htmlPrefix+'_'+note);
}

function Typerdrive_noteOn(note) {
  var player = Typerdrive_playerForNote(note);
  if (player) player.jPlayer("play",0);
}

function Typerdrive_noteOff(note) {
  var player = Typerdrive_playerForNote(note);
  if (player) player.jPlayer("stop");
}

/*
function Typerdrive_noteOffFade(note) {
  var player = playerForNote(note_id);
  if (player) {
    var volume = player.jPlayer('volume');
    player.css("opacity", volume);
    player.animate({opacity: 0}, {
      duration: 600,
      easing: 'swing',
      complete: function() {
        $(this).jPlayer("stop");
        $(this).jPlayer("volume", 1);
        $(this).css("opacity", 1);
      },
      step: function() {
        var val = player.css("opacity");
        val = Math.max(0, val);
        val = Math.min(1, val);
        $(this).jPlayer("volume", val);
      }
    });
  }

}
*/

