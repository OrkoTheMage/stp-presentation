function attachControls({ screen, box, diagrams, state, colorDiagram, renderWithHashHighlight, chalk, startBlinking, stopBlinking, isBlinkOn, showHashLine }) {
  // Tab key - Next diagram
  screen.key(['tab'], () => {
    if (state.diagramIndex < diagrams.length - 1) state.diagramIndex++
    state.hashLineIndex = null
    state.diagramContent = colorDiagram(diagrams[state.diagramIndex], state.diagramIndex, null, chalk, isBlinkOn())
    state.hashLines = diagrams[state.diagramIndex].split('\n').filter(line => line.trim().startsWith('#'))
    box.setContent(state.diagramContent)
    screen.render()
    stopBlinking()
  })

  // Backspace key - Previous diagram
  screen.key(['backspace'], () => {
    if (state.diagramIndex > 0) state.diagramIndex--
    state.hashLineIndex = null
    state.diagramContent = colorDiagram(diagrams[state.diagramIndex], state.diagramIndex, null, chalk, isBlinkOn())
    state.hashLines = diagrams[state.diagramIndex].split('\n').filter(line => line.trim().startsWith('#'))
    box.setContent(state.diagramContent)
    screen.render()
    stopBlinking()
  })

  // Z key - Next hash line
  screen.key(['z'], () => {
    if (!state.hashLines || state.hashLines.length === 0) return
    if (state.hashLineIndex === null) state.hashLineIndex = 0
    else state.hashLineIndex = (state.hashLineIndex + 1) % state.hashLines.length
    showHashLine(state, box, diagrams, renderWithHashHighlight, colorDiagram, chalk, isBlinkOn, screen)
    startBlinking(() => showHashLine(state, box, diagrams, renderWithHashHighlight, colorDiagram, chalk, isBlinkOn, screen))
  })

  // Ctrl+C key - Exit
  screen.key(['C-c'], () => process.exit(0))
}

export { attachControls }
