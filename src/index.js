import { diagrams } from './diagrams.js'
import { startBlinking, stopBlinking, isBlinkOn } from './utils/helpers.js'
import { colorDiagram, renderWithHashHighlight } from './styles/colorDiagram.js'
import { attachControls } from './utils/controls.js'
import { createUI } from './ui.js'
import { populateState } from './state.js'
import { showHashLine } from './renderer.js'
import chalk from 'chalk'

startDemo(chalk)

function startDemo(chalk) {
  const { screen, box } = createUI()

  const state = {
    diagramIndex: 0,
    hashLineIndex: null,
    diagramContent: '',
    hashLines: []
  }

  populateState(state, diagrams, colorDiagram, chalk, isBlinkOn)

  box.setContent(state.diagramContent)
  screen.render()

  attachControls({ screen, box, diagrams, state, colorDiagram, renderWithHashHighlight, chalk, startBlinking, stopBlinking, isBlinkOn, showHashLine })
}
