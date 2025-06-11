function drawAnimatedText() {
  let lineCount = getLineCount();
  let lineSpacing = getLineSpacing();
  let totalHeight = lineCount * lineSpacing;
  let startY = height / 2 - totalHeight / 2 + lineSpacing / 2;
  if (settings.mode === "Dancing Lines") {
    drawDancingLines(startY);
  } else if (settings.mode === "Typo Drift") {
    drawTypoDrift(startY);
  }
}

function drawDancingLines(startY) {
  let lineCount = getLineCount();
  let spacing = getSpacing();
  let baseSize = getBaseSize();
  let waveHeight = getWaveHeight();
  let lineSpacing = getLineSpacing();
  let speed = getSpeed();
  let xAmplitude = getXAmplitude();
  let actualSpacing = map(spacing, 20, 100, width * 0.02, width * 0.1);
  let startX = width / 2 - ((settings.msg.length - 1) * actualSpacing) / 2;
  let actualXAmplitude = map(xAmplitude, 0, 100, 0, width * 0.1);
  for (let j = 0; j < lineCount; j++) {
    let offset = j - (lineCount - 1) / 2;
    let y = height / 2 + offset * lineSpacing;
    for (let i = 0; i < settings.msg.length; i++) {
      let c = settings.msg.charAt(i);
      let indexOffset = i - settings.msg.length / 2;
      let wave;
      if (settings.verticalWaves) {
        wave = sin(-frameCount * (speed / 100) + i * 0.4 + abs(offset) + 0.25);
      } else {
        wave = sin(
          -frameCount * (speed / 100) + j * 0.4 + abs(indexOffset) * 0.25
        );
      }
      let xOffset = 0;
      if (settings.xAnimationMode !== "none") {
        let xPhase = -frameCount * (speed / 100) * 0.75 + j * 0.5 + i * 0.2;
        if (settings.xAnimationMode === "sin") {
          xOffset = sin(xPhase) * actualXAmplitude;
        } else if (settings.xAnimationMode === "tan") {
          xOffset = constrain(
            tan(xPhase) * actualXAmplitude * 0.2,
            -actualXAmplitude,
            actualXAmplitude
          );
        }
      }
      let fontSize = baseSize + wave * waveHeight;
      textSize(fontSize);
      text(c, startX + i * actualSpacing + xOffset, y);
    }
  }
}

function drawTypoDrift(startY) {
  let lineCount = getLineCount();
  let spacing = getSpacing();
  let baseSize = getBaseSize();
  let waveHeight = getWaveHeight();
  let lineSpacing = getLineSpacing();
  let speed = getSpeed();
  let xAmplitude = getXAmplitude();
  let actualSpacing = map(spacing, 20, 100, width * 0.02, width * 0.1);
  let startX = width / 2 - ((settings.msg.length - 1) * actualSpacing) / 2;
  for (let k = 0; k < lineCount; k++) {
    let offset = (1 - k / lineCount) * 3;
    let baseY = startY + k * lineSpacing;
    for (let i = 0; i < settings.msg.length; i++) {
      let x = startX + i * actualSpacing;
      let y = baseY;
      y -=
        Math.sin(x * 0.01 - (millis() * (speed / 100)) / 30 + k / 50 + offset) *
        (waveHeight * 7);
      let secondWaveInput =
        x * 0.005 - (millis() * (speed / 100)) / 30 + 5 + offset + noise(50);
      if (settings.xAnimationMode === "tan") {
        y -= constrain(
          Math.tan(secondWaveInput) * (waveHeight * 7) * 0.2,
          -(waveHeight * 7),
          waveHeight * 7
        );
      } else {
        y += Math.sin(secondWaveInput) * (waveHeight * 7);
      }
      let nextX = startX + (i + 1) * actualSpacing;
      let nextY = baseY;
      nextY +=
        Math.sin(
          nextX * 0.01 - (millis() * (speed / 100)) / 30 + k / 50 + offset
        ) *
        ((630 / windowHeight) * 100 + 120);
      nextY +=
        Math.sin(
          nextX * 0.005 -
            (millis() * (speed / 100)) / 30 +
            5 +
            offset +
            noise(50)
        ) *
        ((630 / windowHeight) * 100 + 120);
      let angle = atan2(nextY - y, actualSpacing);
      let c = settings.msg.charAt(i);
      textSize(baseSize);
      push();
      translate(x, y);
      rotate(angle);
      text(c, 0, 0);
      pop();
    }
  }
}
