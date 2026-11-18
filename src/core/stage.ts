/**
 * Ticket stage union used by the management panel.
 *
 * Temporary coupling: classification helpers (`ticketStage`, `canRetry`) live in
 * `dsh-superagent-backend` (`src/core/stage.ts`). The panel only needs the type.
 */
export type TicketStage = { stage: 'person'; action: 'delivery' | 'answer' | 'review' | 'blocked' | 'failed' }
  | { stage: 'working'; action?: 'queued' } | { stage: 'idle' } | { stage: 'ended' }
