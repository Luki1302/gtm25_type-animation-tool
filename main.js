let presets = [];
let presetDropdown;
let settings = {
  msg: "HELLO WORLD",
  lineCount: 45,
  spacing: 15,
  baseSize: 10,
  waveHeight: 40,
  lineSpacing: 5,
  speed: 20,
  xAmplitude: 30,
  mode: "Dancing Lines",
  xAnimationMode: "sin",
  verticalWaves: false,
  bgColor: "#000000",
  textColor: "#FFFFFF",
  fontFamily: "Univers",
};
let defaultPresets = [
  {
    name: "HELLO WORLD",
    settings: {
      msg: "HELLO WORLD",
      lineCount: 45,
      spacing: 15,
      baseSize: 10,
      waveHeight: 40,
      lineSpacing: 5,
      speed: 20,
      xAmplitude: 30,
      mode: "Dancing Lines",
      xAnimationMode: "sin",
      verticalWaves: false,
      bgColor: "#000000",
      textColor: "#FFFFFF",
      fontFamily: "Univers",
    },
  },
  {
    name: "DANCER",
    settings: {
      msg: "DANCER",
      lineCount: 20,
      spacing: 80,
      baseSize: 100,
      waveHeight: 0,
      lineSpacing: 35,
      speed: 30,
      xAmplitude: 50,
      mode: "Dancing Lines",
      xAnimationMode: "tan",
      verticalWaves: true,
      bgColor: "#E6E6E6",
      textColor: "#D400FF",
      fontFamily: "Arial",
    },
  },
  {
    name: "STICKS",
    settings: {
      msg: "STICKS",
      lineCount: 28,
      spacing: 71,
      baseSize: 23,
      waveHeight: 0,
      lineSpacing: 47,
      speed: 50,
      xAmplitude: 0,
      mode: "Typo Drift",
      xAnimationMode: "none",
      verticalWaves: false,
      bgColor: "#FFFFFF",
      textColor: "#000000",
      fontFamily: "Helvetica",
    },
  },
  {
    name: "jump",
    settings: {
      msg: "jump",
      lineCount: 0,
      spacing: 100,
      baseSize: 100,
      waveHeight: 40,
      lineSpacing: 10,
      speed: 35,
      xAmplitude: 0,
      mode: "Typo Drift",
      xAnimationMode: "tan",
      verticalWaves: false,
      bgColor: "#000000",
      textColor: "#A6FF00",
      fontFamily: "Times New Roman",
    },
  },
];
let modeMappings = {
  "Dancing Lines": {
    lineCount: { min: 1, max: 35, default: 10 },
    spacing: { min: 20, max: 200, default: 50 },
    baseSize: { min: 10, max: 200, default: 60 },
    waveHeight: { min: 0, max: 50, default: 40 },
    lineSpacing: { min: 20, max: 400, default: 75 },
    speed: { min: 0, max: 20, default: 15 },
    xAmplitude: { min: 0, max: 100, default: 30 },
  },
  "Typo Drift": {
    lineCount: { min: 1, max: 25, default: 20 },
    spacing: { min: 20, max: 200, default: 58 },
    baseSize: { min: 10, max: 200, default: 23 },
    waveHeight: { min: 0, max: 30, default: 67 },
    lineSpacing: { min: 30, max: 350, default: 100 },
    speed: { min: 0, max: 10, default: 8 },
    xAmplitude: { min: 10, max: 80, default: 0 },
  },
};
let ratios = [
  { label: "1:1", ratio: 1 },
  { label: "3:2", ratio: 1.5 },
  { label: "4:3", ratio: 1.333333 },
  { label: "4:5", ratio: 0.8 },
  { label: "16:9", ratio: 1.77777 },
  { label: "9:16", ratio: 0.5625 },
];
let canvas;
let loadedFonts = {};

function setup() {
  setupCanvas();
  setupUIElements();
  updateModeUI(settings.mode);
  loadDefaultFonts();
  setupEventListeners();
  loadPresets();
  updateUIFromSettings();
  initializeCaptureSystem();
}

function draw() {
  let cBg = color(colorBg.value);
  background(cBg);
  applyFontSettings();
  drawAnimatedText();
}
