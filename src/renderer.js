function showHashLine(state, box, diagrams, renderWithHashHighlight, colorDiagram, chalk, isBlinkOn, screen) {
  const current = diagrams[state.diagramIndex] || ''
  state.hashLines = current.split('\n').filter(line => line.trim().startsWith('#'))
  state.diagramContent = colorDiagram(current, state.diagramIndex, null, chalk, isBlinkOn())

  if (!state.hashLines.length || state.hashLineIndex === null) {
    box.setContent(state.diagramContent)
    screen.render()
    return
  }

  const rendered = renderWithHashHighlight(current, state.diagramIndex, state.hashLineIndex, chalk, isBlinkOn())
  box.setContent(rendered)
  screen.render()
}

export { showHashLine }
