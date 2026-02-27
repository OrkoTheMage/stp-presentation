import { colorize } from '../utils/helpers.js'

function getColorRules(chalk) {
  if (!chalk) return { always: [], diagrams: {} }

  return {
    always: [
      { pattern: /#/g, style: chalk.cyan }
    ],
    diagrams: {
      // Diagram Index 1
      1: {
        1: [
          { pattern: / A /g, style: chalk.bgGreen.black },
          { pattern: / B /g, style: chalk.bgGreen.black },
          { pattern: / C /g, style: chalk.bgGreen.black },
          { pattern: / D /g, style: chalk.bgGreen.black }
        ],
        2: [ 
          { pattern: / A /g, style: chalk.bgGreen.black, blink: true },
          { pattern: / B /g, style: chalk.bgGreen.black, blink: true },
          { pattern: / C /g, style: chalk.bgGreen.black, blink: true },
          { pattern: / D /g, style: chalk.bgGreen.black, blink: true }
        ],
        3: [
          { pattern: /SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, style: chalk.bgGreen.black }
        ],
        4: [
          { pattern: /SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, style: chalk.bgGreen.black },
          { pattern: / A /g, style: chalk.bgGreen.black },
          { pattern: / B /g, style: chalk.bgGreen.black },
          { pattern: / C /g, style: chalk.bgGreen.black },
          { pattern: / D /g, style: chalk.bgGreen.black }
        ],
        5: [
          { pattern: /SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, style: chalk.bgRed.black, blink: true },
          { pattern: / A /g, style: chalk.bgGreen.black }
        ],
        6: [
          { pattern: /SWITCH(?:\s*\(\d+\)|\s+\d+)/gi, style: chalk.bgGreen.black },
          { pattern: / A /g, style: chalk.bgGreen.black },
          { pattern: / B /g, style: chalk.bgGreen.black },
          { pattern: / C /g, style: chalk.bgGreen.black },
          { pattern: / D /g, style: chalk.bgGreen.black }
        ]
      },
      // Diagram Index 2
      2: {
        0: [
          { pattern: /SWITCH 1/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 2/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 3/g, style: chalk.bgGreen.black }
        ],
        1: [
          { pattern: /(?<=│)BPDUs(?=│)/g, style: chalk.bgYellow.black, blink: true }
        ],
        2: [
          { pattern: /(?<=│)BPDUs(?=│)/g, style: chalk.bgYellow.black, blink: true }
        ],
        3: [
          { pattern: /SWITCH 3/g, style: chalk.bgYellow.black }
        ]
      },
      // Diagram Index 3
      3: {
        0: [
          { pattern: /SWITCH 3/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 1/g, style: chalk.bgGreen.black },
          { pattern: /SWITCH 2/g, style: chalk.bgGreen.black },
          { pattern: /RB/g, style: chalk.yellow }
        ],
        1: [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /00:1B:54:8A:00:03/g, style: chalk.bgGreen.black },
          { pattern: /00:1B:54:8A:00:02/g, style: chalk.bgGreen.black },
          { pattern: /00:1B:54:8A:00:01/g, style: chalk.bgGreen.black },
          { pattern: /24576/g, style: chalk.bgGreen.black },
          { pattern: / 32768 /g, style: chalk.bgGreen.black }
        ],
        2: [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /24576/g, style: chalk.bgYellow.black },
          { pattern: / 32768 /g, style: chalk.bgRed.black }
        ],
        3: [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /24576/g, style: chalk.bgYellow.black },
          { pattern: /03/g, style: chalk.bgRed.black },
          { pattern: /02/g, style: chalk.bgRed.black },
          { pattern: /01/g, style: chalk.bgGreen.black }
        ],
        4: [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /00:1B:54:8A:00:03/g, style: chalk.bgRed.black },
          { pattern: /00:1B:54:8A:00:02/g, style: chalk.bgRed.black },
          { pattern: /00:1B:54:8A:00:01/g, style: chalk.bgGreen.black }
        ],
        5: [
          { pattern: /RB/g, style: chalk.yellow },
          { pattern: /SWITCH 3/g, style: chalk.bgYellow.black }
        ]
      },
      // Diagram Index 4
      4: {
        0: [
          { pattern: /RP/g, style: chalk.bgGreen.black }
        ],
        1: [
          { pattern: /RP/g, style: chalk.bgGreen.black },
          { pattern: /PATH COST/g, style: chalk.bgYellow.black },
          { pattern: /10 Gbps = 2/g, style: chalk.yellow },
          { pattern: /1 Gbps = 4/g, style: chalk.yellow },
          { pattern: /100 Mbps = 19/g, style: chalk.yellow },
          { pattern: /10 Mbps = 100/g, style: chalk.yellow },
          { pattern: /1 Gbps(?!\s*=\s*\d+)/g, style: chalk.bgYellow.black },
          { pattern: /100 Mbps(?!\s*=\s*\d+)/g, style: chalk.bgYellow.black }
        ],
        2: [
          { pattern: /DP/g, style: chalk.bgBlue.black }
        ],
        3: [
          { pattern: /(?<=\(|─)BP(?=\)|─)/g, style: chalk.bgRed.black }
        ],
        4: [
          { pattern: /DP/g, style: chalk.bgBlue.black },
          { pattern: /RP/g, style: chalk.bgGreen.black },
          { pattern: /(?<=\(|─)BP(?=\)|─)/g, style: chalk.bgRed.black }
        ]
      }
    }
  }
}

function boldWords(text, words, chalk) {
  if (!chalk) return text

  const escapedWords = words
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)

  const seen = new Set()
  const regex = new RegExp(escapedWords.join('|'), 'gi')

  return text.replace(regex, match => {
    const lower = match.toLowerCase()
    if (seen.has(lower)) return match
    seen.add(lower)
    return chalk.bold(match)
  })
}

function colorDiagram(diagram, diagramIndex = 0, hashLineIndex = 0, chalk, blinkOn = false) {
  const rules = getColorRules(chalk)

  const lines = diagram.split('\n').map(line => {
    if (!chalk) return line

    // always rules
    line = colorize(line, rules.always || [], chalk)

    const diag = (rules.diagrams && rules.diagrams[diagramIndex]) || {}
    const lineRules = diag[hashLineIndex] || []

    // normal (non-blink) rules — can be passed to `colorize`
    const normal = lineRules.filter(r => !r.blink).map(({ pattern, style }) => ({ pattern, style }))
    if (normal.length > 0) {
      line = colorize(line, normal, chalk)
    }

    // blink rules — handled with replace so blinking can be toggled
    const blinkRules = lineRules.filter(r => r.blink)
    blinkRules.forEach(({ pattern, style }) => {
      const replacer = match => (blinkOn ? style(match) : match)
      line = line.replace(pattern, replacer)
    })

    return line
  })

  const WORDS_TO_BOLD = {
    0: ['| Terminal-based presentation on Spanning Tree Protocol (STP) |'],
    1: [
      'topology',
      'MAC addresses',
      'Broadcast Signal',
      'Broadcast Frame',
      '(port)',
      'Local Area Network (LAN)',
      'loops', 'Broadcast Storm',
      'Spanning Tree Protocol (STP)',
      'ARP (Address Resolution Protocol) Request'
    ],
    2: [
      'Bridge Protocol Data Units (BPDUs)',
      'root bridge',
      'Hello Time',
      'Forward Delay',
      'Max Age'
    ],
    3: [
      'Bridge ID',
      'priority',
      'NOT'
    ],
    4: [
      'root port (RP)',
      'Path cost',
      'designated port (DP)',
      'blocked port (BP)'
    ],
    5: [
      "| At least I think they're fun... don't @ me |",
      'Dr. Radia Perlman',
      'An Anlogrithm for Distributed Computation of a Spanning Tree in an Extended LAN',
      '1985',
      '1991',
      '1990',
      '2003',
      'standerdized',
      'IEEE 802.1D',
      'Rapid Spanning Tree Protocol',
      'IEEE 802.1w',
      'RSTP',
      'MSTP'
    ]
  }

  const wordsToBold = WORDS_TO_BOLD[diagramIndex] || []
  if (wordsToBold.length > 0) {
    const text = lines.join('\n')
    return boldWords(text, wordsToBold, chalk)
  }

  return lines.join('\n')
}


function renderWithHashHighlight(diagram, diagramIndex, hashLineIndex, chalk, blinkOn) {
  const rawLines = diagram.split('\n')
  const coloredLines = colorDiagram(diagram, diagramIndex, hashLineIndex, chalk, blinkOn).split('\n')

  return rawLines.map((line, idx) => {
    if (!line.trim().startsWith('#')) return coloredLines[idx]
    if (hashLineIndex === null) return chalk ? chalk.dim(coloredLines[idx]) : coloredLines[idx]
    if (line === rawLines.filter(l => l.trim().startsWith('#'))[hashLineIndex]) {
      return chalk ? chalk.bgBlue(coloredLines[idx]) : coloredLines[idx]
    }
    return chalk ? chalk.dim(coloredLines[idx]) : coloredLines[idx]
  }).join('\n')
}

export { colorDiagram, renderWithHashHighlight }
