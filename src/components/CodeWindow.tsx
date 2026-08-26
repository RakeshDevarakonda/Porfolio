import { Terminal } from 'lucide-react'

export function CodeWindow() {
  return (
    <div className="code-window" aria-label="A small code sample showing a tenant-scoped backend route">
      <div className="code-window__bar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="code-window__title"><Terminal size={13} /> backend.ts</div>
        <span className="code-window__status">stable</span>
      </div>
      <pre>
        <code>
          <span className="code-muted">01</span> <span className="code-purple">const</span> <span className="code-blue">workspace</span> = <span className="code-purple">await</span> auth.<span className="code-blue">resolve</span>(req)
          {'\n'}<span className="code-muted">02</span> <span className="code-purple">if</span> (!workspace) <span className="code-purple">return</span> reply.<span className="code-blue">unauthorized</span>()
          {'\n'}<span className="code-muted">03</span>
          {'\n'}<span className="code-muted">04</span> <span className="code-purple">const</span> leads = <span className="code-purple">await</span> db.leads.<span className="code-blue">findMany</span>({'{'}
          {'\n'}<span className="code-muted">05</span>   tenantId: workspace.tenantId,
          {'\n'}<span className="code-muted">06</span>   actor: req.user,
          {'\n'}<span className="code-muted">07</span> {'}'})
          {'\n'}<span className="code-muted">08</span>
          {'\n'}<span className="code-muted">09</span> <span className="code-comment">// secure by default, observable in production</span>
        </code>
      </pre>
    </div>
  )
}
