function loadPresets() {
  let savedPresets = localStorage.getItem("animationPresets");
  if (savedPresets) {
    try {
      let parsedPresets = JSON.parse(savedPresets);
      presets = [...defaultPresets, ...parsedPresets];
    } catch (e) {
      console.error("Error loading presets:", e);
      presets = [...defaultPresets];
    }
  } else {
    presets = [...defaultPresets];
  }
  updatePresetDropdown();
}

function savePresets() {
  let userPresets = presets.filter(
    (preset) => !defaultPresets.find((def) => def.name === preset.name)
  );
  localStorage.setItem("animationPresets", JSON.stringify(userPresets));
}

function updatePresetDropdown() {
  presetDropdown.innerHTML = '<option value="">-- Select Preset --</option>';

  presets.forEach((preset, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = preset.name;
    presetDropdown.appendChild(option);
  });

  if (presets.length > 0) {
    presetDropdown.value = 0;
    loadPreset(0);
  }
}

function loadPreset(index) {
  if (index >= 0 && index < presets.length) {
    settings = { ...presets[index].settings };
    updateUIFromSettings();
  }
}

function saveCurrentAsPreset() {
  let presetName = prompt("Preset Name:");
  if (presetName && presetName.trim() !== "") {
    let existingIndex = presets.findIndex((p) => p.name === presetName);
    let newPreset = {
      name: presetName,
      settings: { ...settings },
    };
    if (existingIndex !== -1) {
      presets[existingIndex] = newPreset;
    } else {
      presets.push(newPreset);
    }
    updatePresetDropdown();
    savePresets();
    presetDropdown.value = presets.findIndex((p) => p.name === presetName);
  }
}

function deleteCurrentPreset() {
  let selectedIndex = parseInt(presetDropdown.value);
  if (selectedIndex >= 0) {
    let presetToDelete = presets[selectedIndex];
    if (defaultPresets.find((def) => def.name === presetToDelete.name)) {
      alert("Cannot delete default presets!");
      return;
    }
    if (confirm(`Delete preset "${presetToDelete.name}"?`)) {
      presets.splice(selectedIndex, 1);
      updatePresetDropdown();
      savePresets();
    }
  }
}

function updateSettingsFromUI() {
  settings.msg = textInput.value;
  settings.lineCount = parseInt(sliderLineCount.value);
  settings.spacing = parseInt(sliderSpacing.value);
  settings.baseSize = parseInt(sliderBaseSize.value);
  settings.waveHeight = parseInt(sliderWaveHeight.value);
  settings.lineSpacing = parseInt(sliderLineSpacing.value);
  settings.speed = parseFloat(sliderSpeed.value);
  settings.xAmplitude = parseInt(sliderXAmplitude.value);
  settings.mode = modeSelect.value;
  settings.xAnimationMode = xAnimationModeSelect.value;
  settings.verticalWaves = verticalWavesCheckbox.checked;
  settings.bgColor = colorBg.value;
  settings.textColor = colorText.value;
  settings.fontFamily = fontDropdown.value;
}

function updateUIFromSettings() {
  textInput.value = settings.msg;
  sliderLineCount.value = settings.lineCount;
  sliderSpacing.value = settings.spacing;
  sliderBaseSize.value = settings.baseSize;
  sliderWaveHeight.value = settings.waveHeight;
  sliderLineSpacing.value = settings.lineSpacing;
  sliderSpeed.value = settings.speed;
  sliderXAmplitude.value = settings.xAmplitude;
  modeSelect.value = settings.mode;
  xAnimationModeSelect.value = settings.xAnimationMode;
  verticalWavesCheckbox.checked = settings.verticalWaves;
  colorBg.value = settings.bgColor;
  colorText.value = settings.textColor;
  fontDropdown.value = settings.fontFamily;
  updateSliderDisplays();
}

function updateSliderDisplays() {
  let currentMode = settings.mode;
  document.getElementById("line-count-value").textContent =
    getLineCount(currentMode);
  document.getElementById("spacing-value").textContent =
    getSpacing(currentMode);
  document.getElementById("base-size-value").textContent =
    getBaseSize(currentMode);
  document.getElementById("wave-height-value").textContent =
    getWaveHeight(currentMode);
  document.getElementById("line-spacing-value").textContent =
    getLineSpacing(currentMode);
  document.getElementById("speed-value").textContent =
    getSpeed(currentMode).toFixed(1);
  document.getElementById("x-amplitude-value").textContent =
    getXAmplitude(currentMode);
}
