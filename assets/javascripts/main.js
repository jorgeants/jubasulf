$(document).ready(function() {
  
  function getText(element) {
    var ret = '';
    var length = element.childNodes.length;
    for (var i = 0; i < length; i++) {
      var node = element.childNodes[i];
      if (node.nodeType != 8) {
        ret += node.nodeType != 1 ? node.nodeValue : getText(node);
      }
    }
    return ret;
  }

});
