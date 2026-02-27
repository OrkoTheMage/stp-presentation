import blessed from 'blessed'

function createUI(options = {}) {
  const screen = blessed.screen({
    smartCSR: true,
    title: options.title || 'STP Terminal Demo'
  })

  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '90%',
    height: '90%',
    content: '',
    tags: true,
    border: { type: 'line' }
  })

  screen.append(box)
  return { screen, box }
}

export { createUI }
