/**
 * Health templates shared with the management panel.
 *
 * Temporary coupling: the full SourceHost / SourceContext interfaces live in
 * `dsh-superagent-backend` (`src/sources/host.ts`). This frontend copy keeps only
 * what the panel localizes and displays.
 */
import { fill } from '../infra/text.ts'

export const HEALTH_TEXT = {
  setupPending: 'Waiting for the deployment check',
  sourceOff: 'Off',
  feishuCliUnset: 'The Source is on, and its bot lark-cli is not set',
  feishuBotMissing: 'Waiting for the Feishu bot',
  pollFailures: '{count} consecutive failed polls; last: {error}',
} as const
export type HealthCode = keyof typeof HEALTH_TEXT
export type Health = { state: 'starting' | 'ready' | 'paused' | 'error'; detail: string; at?: string; code?: HealthCode; values?: Record<string, string> }
export function health(state: Health['state'], code: HealthCode, values: Record<string, string> = {}): Health {
  return { state, detail: fill(HEALTH_TEXT[code], values), code, ...Object.keys(values).length ? { values } : {} }
}
