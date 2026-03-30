// Chat
function sendMessage() {
  const input = document.getElementById("msg");
  const msg = input.value;

  if (msg === "") return;

  const messages = document.getElementById("messages");

  messages.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  messages.innerHTML += `<p><b>AI:</b> Interesting answer!</p>`;

  input.value = "";
}

// Mic toggle
function toggleMic() {
  alert("Mic toggled");
}

// Video toggle
function toggleVideo() {
  alert("Camera toggled");
}

// Radar Chart
const ctx = document.getElementById('radarChart');

new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Communication', 'Leadership', 'Creativity', 'Professionalism'],
    datasets: [{
      label: 'Skill Score',
      data: [80, 70, 85, 75],
    }]
  },
});
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  document.querySelector(".video-box").innerHTML = "";
  const video = document.createElement("video");
  video.srcObject = stream;
  video.autoplay = true;
  document.querySelector(".video-box").appendChild(video);
});