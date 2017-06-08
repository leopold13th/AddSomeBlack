function save_options() {
  const color = document.getElementById("darkcolorinput").value;
  document.getElementById("darkcolor").value = color;

  chrome.storage.sync.set({
    darkColor: color
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 3000);
  });
}


function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    darkColor: '#000000'
  }, function(items) {
    document.getElementById('darkcolor').value = items.darkColor;
    document.getElementById('darkcolorinput').value = items.darkColor;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
