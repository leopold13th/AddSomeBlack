// Based on https://stackoverflow.com/questions/2399797/javascript-let-user-select-an-html-element-like-firebug

var mouseover = function(e) {
  e.stopPropagation();
  e.target.addEventListener("mouseout", function (e) {
    e.target.classList.remove("highlight-9b9b5123-c7e7-42b1-865e-7435843ead70");
  });
  e.target.classList.add("highlight-9b9b5123-c7e7-42b1-865e-7435843ead70");
}

function click(e) {
  e.stopPropagation();
  // console.log("Clicked " + e.target.tagName)
  delListeners();

  chrome.storage.sync.get({
    darkColor: '#000000',
  }, function(items) {
    blackify(e, items.darkColor);
    // console.log("newcolor1 > " + newcolor);
  });
  // console.log("newcolor2 > " + newcolor);
}

function blackify(e, newcolor) {

  // 1. Blackify element
  e.target.style.color = newcolor

  // 2. Blackify all same elements with same relative(depth = 1) css path
  // e.target.tagName or e.target.nodeName
  var node_name = e.target.nodeName.toLowerCase(),
      el = e.target,
      path = [];
  while (
    (el.nodeName.toLowerCase() != 'html') && 
    (el = el.parentNode) &&
    path.unshift(el.nodeName.toLowerCase() + 
      (el.id ? '#' + el.id : '') + 
      (el.className ? '.' + el.className.replace(/\s+/g, ".") : ''))
  );
  // console.log(path.join(" > "));
  var allSameElements = document.querySelectorAll(path[path.length-1] + " " + node_name);
  for (var i=0; i < allSameElements.length; i++) {
    allSameElements[i].style.color = newcolor;
    // console.log(allSameElements[i]);
  }

  // 3. Blackify all children of current element
  // TODO: make recursive to apply to all nested elements ???
  var elementChildrens = e.target.children;
  for (var i=0, child; child=elementChildrens[i]; i++) {
    child.style.color = newcolor;
    // console.log(child.style.color);
  }
  
  // 4. Blackify all other elements with same css styles
  // <p class="bb aa">3</p>
  // <p class="bb cc aa">4</p>
  // var list = document.getElementsByClassName("aa bb")

  // 5. Blackify all other elements with same css styles and type of element
  // <p class="bb aa">3</p>
  // <p class="bb cc aa">4</p>
  // var list = document.querySelectorAll("p.bb")
}

/*
  <div class="a">
    <div class="bb">			<-- clicked
      <p class="bb aa">3</p>		3,4
      <p class="bb cc aa">4</p>		3,4
    </div>
    <div class="bb">			2,5
      <p class="bb aa">3</p>		4
      <p class="bb cc aa">4</p>		4
    </div>
    <div class="cc">			2
      ...
    </div>
    <p class="bb aa">5</p>		4
  </div>
*/

function delListeners() {
    document.body.removeEventListener("mouseover", mouseover);
    document.body.removeEventListener("click", click);
    document.body.removeEventListener("keyup", cancelOnEscape);
}

function cancelOnEscape(e) {
    var keyCodes = {
        BACKSPACE: 8,
        ESC: 27,
        DELETE: 46
    }

    if (e.keyCode === keyCodes.ESC || e.keyCode === keyCodes.BACKSPACE ) {
	delListeners();
    }

    return false;
}


document.body.addEventListener("mouseover", mouseover);
document.body.addEventListener("click", click);
document.body.addEventListener("keyup", cancelOnEscape);
