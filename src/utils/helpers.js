function colorize(line, replacements = [], chalk) {
  if (!chalk) return line

  replacements.forEach(({ pattern, style }) => {
    line = line.replace(pattern, match => style(match))
  })

  return line
}

let _blinkInterval = null
let _blinkOn = false

function startBlinking(onTick) {
  if (_blinkInterval) return
  _blinkInterval = setInterval(() => {
    _blinkOn = !_blinkOn
    if (typeof onTick === 'function') onTick()
  }, 500)
}

function stopBlinking() {
  if (_blinkInterval) {
    clearInterval(_blinkInterval)
    _blinkInterval = null
  }
  _blinkOn = false
}

function isBlinkOn() {
  return _blinkOn
}

export { colorize, startBlinking, stopBlinking, isBlinkOn }
