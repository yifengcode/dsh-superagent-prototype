/**
 * Management API contract used by the web panel.
 *
 * Temporary coupling: response shapes are intentionally loose (`any`) so this frontend
 * package typechecks without vendoring the full backend view graph. The authoritative
 * typed contract lives in `dsh-superagent-backend` at `src/app/api.ts` — keep route names
 * and filter constants in sync when either side changes.
 */
export const TICKET_FILTERS = ['open', 'person', 'working', 'idle', 'ended'] as const
export const THREAD_FILTERS = ['subscribed', 'evaluating', 'recent', 'all'] as const
export type TicketFilter = typeof TICKET_FILTERS[number]
export type ThreadFilter = typeof THREAD_FILTERS[number]
interface Paged { offset?: number; limit?: number }

export interface Api {
  'GET state': { response: any }
  'GET overview': { response: any }
  'GET search': { query: { q: string }; response: any }
  'GET sources': { response: any }
  'GET settings': { response: any }
  'POST sources/:id/labels': { response: { added: string[] } }
  'GET threads': { query?: Paged & { filter?: ThreadFilter }; response: any }
  'GET threads/:key': { query?: { limit?: number; before?: string; around?: string }; response: any }
  'POST threads/:key/unsubscribe': { response: { removed: boolean; thread: string; context_delivery: 'injected' | 'pending' } }
  'POST triggers/:id/requeue': { response: { queued: boolean } }
  'GET decisions': { query?: Paged & { kind?: string; window?: '24h' }; response: any }
  'POST decisions/:id/dismiss': { response: { dismissed: true } }
  'GET tickets': { query?: Paged & { state?: TicketFilter }; response: any }
  'GET tickets/:id': { response: any }
  'POST tickets/:id/retry': { response: { retried: true } }
  'POST tickets/:id/stop': { response: { stopped: true } }
  'POST executor/pause': { body: { paused: boolean }; response: { paused: boolean } }
  'PUT settings/:block': { body: { value: unknown; revision: number }; response: { revision: number; restarting: boolean } }
  'GET policy/history': { response: any }
  'POST policy-sync/:id': { response: { policy: unknown } }
  'POST setup/check': { response: { restarting: true } }
  'GET models': { response: any }
  'GET prompts': { query?: { revision?: number; offset?: number }; response: any }
  'PUT prompts': { body: { config: unknown; baseRevision: number }; response: { revision: number; context_delivery: 'injected' | 'pending' } }
  'POST prompts/preview': { body: unknown; response: any }
}
type Path<K> = K extends `${string} ${infer P}` ? P : never
type Params<P> = P extends `${string}:${infer Name}/${infer Rest}` ? Record<Name, string> & Params<Rest>
  : P extends `${string}:${infer Name}` ? Record<Name, string> : unknown
export type RouteParams<K extends keyof Api> = Params<Path<K>>
export type ApiRequest<K extends keyof Api> = RouteParams<K> & Omit<Api[K], 'response'>
export type ApiResponse<K extends keyof Api> = Api[K]['response']
