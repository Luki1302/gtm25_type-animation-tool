// export
// Aufnahmetaste und Stopptaste (am besten PlayButton, der sich in || verändert)
// Download sobald Stopptaste gedrückt möglich

let font = "includes/fonts/UniversLTPro-55Roman.otf";

P5Capture.setDefaultOptions({
  format: "gif",
  framerate: 10,
  quality: 0.5,
  width: 320,
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  canvasRatio();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(150, 255, 200);
  circle(mouseX, mouseY, 50);

  // Spirale
  textSize(15);
  let textInput = "hello";
  let amount = 50;
  let amplitude = 100;
  let frequencyX = 10;
  let frequencyY = 0.02;
  let phaseShift = 3;
  for (let i = 0; i < amount; i++) {
    let offset = i - amount / 2;
    let x = width / 2 + offset * frequencyX;
    let y =
      height / 2 + sin(frameCount * frequencyY + i * phaseShift) * amplitude;
    text(textInput, x, y);
  }
}

function canvasRatio() {
  let ratios = [
    {
      label: "1:1",
      ratio: 1,
    },
    {
      label: "3:2",
      ratio: 1.5,
    },
    {
      label: "4:3",
      ratio: 1.333333,
    },
    {
      label: "16x9",
      ratio: 1.77777,
    },
    {
      label: "9x16",
      ratio: 0.5625,
    },
  ];
  let w = 800;
  let cvn = createCanvas(w * ratios[0].ratio, w); // die Zahl in ratios [] ist das default ratio

  // center canvas
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cvn.position(x, y);

  // build dropdown from array of data
  myDropdown = createSelect();
  for (let r of ratios) {
    myDropdown.option(r.label, r.ratio); // label, value
  }

  // do something when a new ratio is selected
  myDropdown.changed(() => {
    let newRatio = myDropdown.value();
    resizeCanvas(w * newRatio, w);

    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cvn.position(x, y);
  });
}

function keyPressed() {
  const capture = P5Capture.getInstance();
  if (key === "c") {
    if (capture.state === "idle") {
      capture.start({
        format: "gif",
        duration: 100, // oder beliebig viele frames
      });
    } else {
      capture.stop();
    }
  }
}
