let isRecording = false;

function initializeCaptureSystem() {
  let captureBtn = document.getElementById("capture-btn");
  let stopBtn = document.getElementById("stop-btn");
  let formatSelect = document.getElementById("format-select");
  let qualitySelect = document.getElementById("quality-select");
  updateCaptureOptions();
  captureBtn.addEventListener("click", () => toggleCapture(true));
  stopBtn.addEventListener("click", () => toggleCapture(false));
  [formatSelect, qualitySelect].forEach((select) => {
    select.addEventListener("change", updateCaptureOptions);
  });

  function updateCaptureOptions() {
    P5Capture.setDefaultOptions({
      format: formatSelect.value,
      framerate: frameRate() || 60,
      quality: parseInt(qualitySelect.value),
      width:
        document.querySelector("#canvas-container > canvas").offsetWidth * 1,
    });
  }
}

let recordingStartTime = null;
let recordingInterval = null;

function toggleCapture(start = true) {
  let captureBtn = document.getElementById("capture-btn");
  let stopBtn = document.getElementById("stop-btn");
  let recordTimeSpan = document.getElementById("record-time");
  let formatSelect = document.getElementById("format-select");
  let qualitySelect = document.getElementById("quality-select");
  let capture = P5Capture.getInstance();
  if (start && capture.state === "idle") {
    capture.start({
      format: formatSelect.value,
      framerate: frameRate() || 60,
      quality: parseInt(qualitySelect.value),
    });
    isRecording = true;
    recordingStartTime = Date.now();
    recordTimeSpan.style.display = "inline";
    recordingInterval = setInterval(updateRecordingTime, 10);
  } else if (!start) {
    capture.stop();
    isRecording = false;
    clearInterval(recordingInterval);
    recordTimeSpan.style.display = "none";
    recordTimeSpan.textContent = "00:00:00";
  }
  captureBtn.style.display = isRecording ? "none" : "inline-flex";
  stopBtn.style.display = isRecording ? "inline-flex" : "none";
}

function updateRecordingTime() {
  if (recordingStartTime) {
    let elapsed = Date.now() - recordingStartTime;
    let minutes = Math.floor(elapsed / 60000);
    let seconds = Math.floor((elapsed % 60000) / 1000);
    let hundredths = Math.floor((elapsed % 1000) / 10);

    let recordTimeSpan = document.getElementById("record-time");
    recordTimeSpan.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${hundredths
      .toString()
      .padStart(2, "0")}`;
  }
}
