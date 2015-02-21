var submitTries = 0;
var postDataStatusDiv = '#postdata_status';
var postDataMaxTries = 5;
var postDataValue = null;
var postDataKey = null;
var postDataTarget = null;
var postDataTimeout = 10000;
var postDataTimer = null;

function _postDataResultHandler(result) {
  $.print("result: "+result);
  if (result.status == 'success') {
    goToStudyState(postDataTarget);
  } else {
    $(postDataStatusDiv).html("Error submitting: "+result.description);
    if (submitTries < postDataMaxTries) {
      $(postDataStatusDiv).append(' [Retrying...]');
      setTimeout(function() { _postDataAndRedirect(); }, 2000);
    } else {
      clearTimeout(postDataTimer);
      $(postDataStatusDiv).html('Max tries exceeded. Please return the HIT and contact the study coordinator at <a href="mailto:gwg@cs.tufts.edu">gwg@cs.tufts.edu</a>.');
    }
  }
}

function _postDataAndRedirect() {
  $(postDataStatusDiv).html('Submitting...');
  submitTries++;
  var urlvars = $.getUrlVars();
  var postvars = {};
  postvars['hitId'] = urlvars['hitId'];
  postvars['assignmentId'] = urlvars['assignmentId'];
  postvars[postDataKey] = postDataValue;
  $.post('postdata.php', postvars, _postDataResultHandler, "json");
}

function postDataAndRedirect(key, value, target) {
  postDataKey = key;
  postDataValue = value;
  postDataTarget = target;
  _postDataAndRedirect();
  postDataTimer = setTimeout(function() {
    $(postDataStatusDiv).html('This is taking longer than expected.<br> <a href="javascript:_postDataAndRedirect();return false;">Try again</a> or contact the study coordinator at <a href="mailto:gwg@cs.tufts.edu">gwg@cs.tufts.edu</a>.');
  }, postDataTimeout);
}

