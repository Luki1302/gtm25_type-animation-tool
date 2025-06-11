window.addEventListener("DOMContentLoaded", () => {
  const startScreen = document.getElementById("start-screen");
  const layoutGrid = document.getElementById("layout-grid");
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    startScreen.style.opacity = "0";
    setTimeout(() => {
      startScreen.style.display = "none";
      layoutGrid.style.display = "flex";
    }, 500);
  });
});

function setupCanvas() {
  let canvasContainer = document.getElementById("canvas-container");
  let w = Math.min(800, canvasContainer.offsetWidth);
  canvas = createCanvas(w, w);
  canvas.parent("canvas-container");
  let ratioSelect = document.getElementById("ratio-select");
  ratioSelect.innerHTML = "";
  for (let r of ratios) {
    let option = document.createElement("option");
    option.text = r.label;
    option.value = r.ratio;
    ratioSelect.add(option);
  }
  ratioSelect.addEventListener("change", function () {
    let newRatio = parseFloat(this.value);
    resizeCanvas(w * newRatio, w);
  });
}

function loadDefaultFonts() {
  loadedFonts["Univers"] = loadFont("fonts/UniversLTPro-55Roman.otf");
}

function handleFontUpload(event) {
  let file = event.target.files[0];
  if (file) {
    if (file.name.endsWith(".ttf") || file.name.endsWith(".otf")) {
      let fileURL = URL.createObjectURL(file);
      let fontName = file.name.split(".")[0];
      let newFont = new FontFace(fontName, `url(${fileURL})`);
      newFont
        .load()
        .then(function (loadedFace) {
          document.fonts.add(loadedFace);
          let option = document.createElement("option");
          option.text = fontName;
          option.value = fontName;
          fontDropdown.add(option);
          fontDropdown.value = fontName;
          settings.fontFamily = fontName;
          let styleElement = document.createElement("style");
          styleElement.appendChild(
            document.createTextNode(`
            @font-face {
              font-family: '${fontName}';
              src: url(${fileURL});
            }
          `)
          );
          document.head.appendChild(styleElement);
        })
        .catch(function (error) {
          console.error(`Error loading font: ${error}`);
        });
    }
  }
}

function applyFontSettings() {
  let selectedFont = settings.fontFamily;

  if (loadedFonts[selectedFont]) {
    textFont(loadedFonts[selectedFont]);
  } else {
    textFont(selectedFont);
  }
  let cText = color(settings.textColor);
  fill(cText);
  textAlign(CENTER, CENTER);
}

function updateModeUI(mode) {
  let guiRows = document.querySelectorAll(".mode-ui");
  guiRows.forEach((row) => {
    row.style.display = "none";
  });
  if (mode === "Dancing Lines") {
    let guiShow = document.querySelectorAll(".mode-a-ui");
    guiShow.forEach((row) => {
      row.style.display = "grid";
      row.style.gridtemplatecolumns = "1fr auto";
    });
  } else if (mode === "Typo Drift") {
    let guiShow = document.querySelectorAll(".mode-b-ui");
    guiShow.forEach((row) => {
      row.style.display = "grid";
      row.style.gridtemplatecolumns = "1fr auto";
    });
  }
  updateSliderDisplays();
}

function setupUIElements() {
  textInput = document.getElementById("text-input");
  colorBg = document.getElementById("color-bg");
  colorText = document.getElementById("color-text");
  fontDropdown = document.getElementById("font-dropdown");
  verticalWavesCheckbox = document.getElementById("vertical-waves");
  modeSelect = document.getElementById("mode-select");
  xAnimationModeSelect = document.getElementById("x-animation-mode");
  presetDropdown = document.getElementById("preset-select");
  sliderLineCount = document.getElementById("line-count");
  sliderSpacing = document.getElementById("spacing");
  sliderBaseSize = document.getElementById("base-size");
  sliderWaveHeight = document.getElementById("wave-height");
  sliderLineSpacing = document.getElementById("line-spacing");
  sliderSpeed = document.getElementById("animation-speed");
  sliderXAmplitude = document.getElementById("x-amplitude");
  setupFontDropdown();
}

function setupFontDropdown() {
  let systemFonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Courier New",
    "Verdana",
    "Georgia",
  ];
  fontDropdown.innerHTML = "";
  let universOption = document.createElement("option");
  universOption.text = "Univers";
  universOption.value = "Univers";
  fontDropdown.add(universOption);
  for (let font of systemFonts) {
    let option = document.createElement("option");
    option.text = font;
    option.value = font;
    fontDropdown.add(option);
  }
}

function setupEventListeners() {
  presetDropdown.addEventListener("change", function () {
    if (this.value !== "") {
      loadPreset(parseInt(this.value));
    }
  });
  document
    .getElementById("save-preset")
    .addEventListener("click", saveCurrentAsPreset);
  document
    .getElementById("delete-preset")
    .addEventListener("click", deleteCurrentPreset);
  document
    .getElementById("font-upload")
    .addEventListener("change", handleFontUpload);
  modeSelect.addEventListener("change", function () {
    updateSettingsFromUI();
    updateModeUI(settings.mode);
  });
  presetDropdown.addEventListener("change", function () {
    if (this.value !== "") {
      loadPreset(parseInt(this.value));
      updateModeUI(settings.mode);
    }
  });
  textInput.addEventListener("input", updateSettingsFromUI);
  colorBg.addEventListener("input", updateSettingsFromUI);
  colorText.addEventListener("input", updateSettingsFromUI);
  fontDropdown.addEventListener("change", updateSettingsFromUI);
  verticalWavesCheckbox.addEventListener("change", updateSettingsFromUI);
  modeSelect.addEventListener("change", updateSettingsFromUI);
  xAnimationModeSelect.addEventListener("change", updateSettingsFromUI);
  sliderLineCount.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  sliderSpacing.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  sliderBaseSize.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  sliderWaveHeight.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  sliderLineSpacing.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  sliderSpeed.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  sliderXAmplitude.addEventListener("input", function () {
    updateSettingsFromUI();
    updateSliderDisplays();
  });
  window.addEventListener("resize", function () {
    let canvasContainer = document.getElementById("canvas-container");
    let w = Math.min(800, canvasContainer.offsetWidth);
    let currentRatio = width / height;
    resizeCanvas(w * currentRatio, w);
  });
}

function mapValue(paramName, sliderValue, mode) {
  const mapping = modeMappings[mode];
  if (!mapping || !mapping[paramName]) {
    console.warn(`No mapping found for ${paramName} in mode ${mode}`);
    return sliderValue;
  }

  const { min, max } = mapping[paramName];
  return map(sliderValue, 0, 100, min, max);
}

function getLineCount(mode = settings.mode) {
  return Math.round(mapValue("lineCount", settings.lineCount, mode));
}

function getSpacing(mode = settings.mode) {
  return Math.round(mapValue("spacing", settings.spacing, mode));
}

function getBaseSize(mode = settings.mode) {
  return Math.round(mapValue("baseSize", settings.baseSize, mode));
}

function getWaveHeight(mode = settings.mode) {
  return Math.round(mapValue("waveHeight", settings.waveHeight, mode));
}

function getLineSpacing(mode = settings.mode) {
  return Math.round(mapValue("lineSpacing", settings.lineSpacing, mode));
}

function getSpeed(mode = settings.mode) {
  return mapValue("speed", settings.speed, mode);
}

function getXAmplitude(mode = settings.mode) {
  return Math.round(mapValue("xAmplitude", settings.xAmplitude, mode));
}
