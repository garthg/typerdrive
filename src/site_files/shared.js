function goToStudyState(state) {
  var urlvars = $.getUrlVars();
  outputvars = {};
  if (!urlvars['studystate']) urlvars.push('studystate');
  urlvars['studystate'] = state;
  var param_string = $.map(
    urlvars, function(k) { return k+'='+urlvars[k]; }).join('&');
  var url = window.location.href.replace(/\?.*/, '?'+param_string);
  $.print(url);
  window.location.href = url;
}
