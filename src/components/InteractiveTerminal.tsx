import { useState } from 'react'
import { soundFx } from './SoundEffects'

interface CommandOutput {
  cmd: string
  output: string[]
}

const defaultHistory: CommandOutput[] = [
  {
    cmd: 'whoami',
    output: ['Devarakonda Rakesh — Backend-Focused Full Stack Developer'],
  },
  {
    cmd: 'cat location.json',
    output: ['{\n  "city": "Hyderabad",\n  "country": "India",\n  "timezone": "Asia/Kolkata (IST)"\n}'],
  },
  {
    cmd: 'cat focus.txt',
    output: [
      '1. RBAC & Multi-Tenant Data Isolation (10+ Workspaces)',
      '2. AWS Event-Driven Pipelines (SQS + Lambda + EventBridge)',
      '3. Sub-100ms WebSocket Streaming Infrastructure',
      '4. Open Source Developer Tooling (npm: mongo-datalayer)',
    ],
  },
]

export function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>(defaultHistory)
  const [inputVal, setInputVal] = useState('')

  const handleCommand = (cmd: string) => {
    soundFx.playClick()
    const cleanCmd = cmd.trim().toLowerCase()
    let outputLines: string[] = []

    if (cleanCmd === 'whoami') {
      outputLines = ['Devarakonda Rakesh — Backend-Focused Full Stack Developer']
    } else if (cleanCmd === 'cat focus.txt') {
      outputLines = [
        '1. RBAC & Multi-Tenant Data Isolation (10+ Workspaces)',
        '2. AWS Event-Driven Pipelines (SQS + Lambda + EventBridge)',
        '3. Sub-100ms WebSocket Streaming Infrastructure',
        '4. Open Source Developer Tooling (npm: mongo-datalayer)',
      ]
    } else if (cleanCmd === 'cat location.json') {
      outputLines = ['{\n  "city": "Hyderabad",\n  "country": "India",\n  "timezone": "Asia/Kolkata (IST)"\n}']
    } else if (cleanCmd === 'cat stack.sh') {
      outputLines = ['Go · Node.js · TypeScript · PostgreSQL · MongoDB · Redis · AWS · Docker']
    } else if (cleanCmd === 'clear') {
      setHistory([])
      return
    } else {
      outputLines = [`bash: command not found: ${cleanCmd}. Try 'whoami', 'cat focus.txt', 'cat stack.sh', or 'clear'.`]
    }

    setHistory((prev) => [...prev, { cmd: cleanCmd, output: outputLines }])
    setInputVal('')
  }

  return (
    <div className="interactive-terminal">
      <div className="terminal-card__top">
        <span className="terminal-title">profile.sh — zsh</span>
        <span className="window-dots"><span /><span /><span /></span>
      </div>

      <div className="terminal-quick-cmds">
        <button onClick={() => handleCommand('whoami')}>whoami</button>
        <button onClick={() => handleCommand('cat focus.txt')}>focus.txt</button>
        <button onClick={() => handleCommand('cat location.json')}>location.json</button>
        <button onClick={() => handleCommand('cat stack.sh')}>stack.sh</button>
        <button onClick={() => handleCommand('clear')}>clear</button>
      </div>

      <div className="terminal-card__body">
        {history.map((item, idx) => (
          <div key={idx} className="terminal-history-item">
            <p className="terminal-prompt">
              <i>$</i> {item.cmd}
            </p>
            {item.output.map((line, lIdx) => (
              <pre key={lIdx} className="terminal-output">{line}</pre>
            ))}
          </div>
        ))}

        <form
          className="terminal-input-form"
          onSubmit={(e) => {
            e.preventDefault()
            if (inputVal.trim()) handleCommand(inputVal)
          }}
        >
          <span className="terminal-prompt-prefix">$</span>
          <input
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. whoami, stack.sh)..."
          />
        </form>
      </div>
    </div>
  )
}
