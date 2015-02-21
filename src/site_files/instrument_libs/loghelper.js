
function LogHelper_parse(input) {
  var output = [];
  if (input.length == 0) return output;
  var logged_events = input.split(',');
  for (i in logged_events) {
    var event_string = logged_events[i];
    var parts = event_string.split(':');
    if (parts.length < 2) {
      $.print("Malformed log entry: "+event_string);
      continue;
    }
    var out = {};
    out.time = parseFloat(parts[0]);
    //var value = parts[1].substring(1, parts[1].length-1); // Wut
    var value = parts[1];
    var value_parts = value.split('_');
    out.action = value_parts[0];
    if (value_parts.length == 2) out.data = value_parts[1];
    else out.data = null;
    output.push(out);
  }
  return output;

}
