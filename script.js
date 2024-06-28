document.addEventListener("DOMContentLoaded", function () {
  var d = new Date();
  document.getElementById('tdate').valueAsDate = d;
  var t = pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2);
  document.getElementById('time').value = t;
  updateMessageContent();
});

function myfun() {
  var time = document.getElementById('time').value;
  var date = document.getElementById('tdate').value;
  var datetime = `${date} ${time}`;
  var timeobj = new Date(datetime);
  var unixTimestamp = Math.floor(timeobj.getTime() / 1000);
  var type = document.getElementById('type').value;

  let timestamp = `<t:${unixTimestamp}:${type}>`;
  if (!time || !date) timestamp = "Please specify Date and Time!";
  document.getElementById('result').value = timestamp;

  updateMessageContent();
}

function copy() {
  var copyText = document.getElementById("result");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  document.execCommand("copy");
  alert("Copied: " + copyText.value);
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function updateMessageContent() {
  var time = document.getElementById('time').value;
  var date = document.getElementById('tdate').value;
  var type = document.getElementById('type').value;

  if (time && date) {
      var datetime = `${date} ${time}`;
      var timeobj = new Date(datetime);
      var unixTimestamp = Math.floor(timeobj.getTime() / 1000);
      let formattedTimestamp = formatDiscordTimestamp(unixTimestamp, type);

      document.getElementById('timestamp-output').innerText = formattedTimestamp;
      document.getElementById('result').value = `<t:${unixTimestamp}:${type}>`;
  } else {
      document.getElementById('timestamp-output').innerText = "Please specify Date and Time!";
      document.getElementById('result').value = "Please specify Date and Time!";
  }
}

function formatDiscordTimestamp(unixTimestamp, type) {
  let dateObj = new Date(unixTimestamp * 1000);

  switch (type) {
      case 'd':
          return dateObj.toLocaleDateString();
      case 'D':
          return dateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' });
      case 't':
          return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'T':
          return dateObj.toLocaleTimeString();
      case 'R':
          return getRelativeTime(unixTimestamp);
      case 'f':
          return dateObj.toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      case 'F':
          return dateObj.toLocaleString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      default:
          return dateObj.toLocaleString();
  }
}

function getRelativeTime(unixTimestamp) {
  let now = Math.floor(Date.now() / 1000);
  let diff = unixTimestamp - now;

  if (diff > 0) {
      let minutes = Math.floor(diff / 60);
      let seconds = diff % 60;
      return `in ${minutes > 0 ? `${minutes} minutes` : ''} ${seconds > 0 ? `${seconds} seconds` : ''}`.trim();
  } else {
      diff = -diff;
      let minutes = Math.floor(diff / 60);
      let seconds = diff % 60;
      return `${minutes > 0 ? `${minutes} minutes` : ''} ${seconds > 0 ? `${seconds} seconds` : ''} ago`.trim();
  }
}
