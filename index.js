const getSchemeBtn = document.getElementById('get-scheme-btn')

getSchemeBtn.addEventListener( 'click', () => {
    const colorPickerValue = document.getElementById('color-picker').value.replace('#', '')
    const colorModeMenu = document.getElementById('color-mode-menu')
    const colorMode = colorModeMenu.selectedOptions[0].value   
    generateScheme(colorPickerValue, colorMode)
})

function generateScheme(inputColor, inputMode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${inputMode}`)
    .then( response => response.json() )
    .then( data => getHexValues(data) )
}

function getHexValues(data) {
    const colorsArray = []
    data.colors.forEach( color => {
        colorsArray.push(color.hex.value) 
    })
    renderColorScheme(colorsArray)
}

function renderColorScheme(colorsArray) {
    let html = ''
    colorsArray.forEach( color => {
        html += `
        <div 
            class="color-block" 
            tabindex="0" 
            onclick="copyColor('${color}')" 
            onkeydown="handleKeyPress(event, '${color}')"
        >
            <div class="hex-color-div" style="background-color: ${color};">
            </div>
            <div class="hex-color-value" id="${color}">${color}</div>
        </div>
        `
    })
    document.getElementById('color-scheme-container').innerHTML = html
}

function handleKeyPress(event, color) {
    if(event.key == "Enter") {
        copyColor(color)
    }
}

function copyColor(color) {
    navigator.clipboard.writeText(color);
    alert("Copied color to clipboard: " + color);
}