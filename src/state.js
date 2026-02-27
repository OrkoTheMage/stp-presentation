function populateState(state, diagrams, colorDiagram, chalk, isBlinkOn) {
  const current = diagrams[state.diagramIndex] || ''
  state.hashLines = current.split('\n').filter(line => line.trim().startsWith('#'))
  state.diagramContent = colorDiagram(current, state.diagramIndex, null, chalk, isBlinkOn())
}

export { populateState }
