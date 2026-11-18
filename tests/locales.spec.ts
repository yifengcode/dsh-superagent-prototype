import { expect, it } from 'vitest'
import { en, zh, type DshSuperagentKey } from '../src/client/locales.ts'
import { reasonLabel, type T } from '../src/client/text.ts'
import { USER_ERRORS } from '../src/core/errors.ts'
import { REASONS } from '../src/core/reasons.ts'

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort()

it('names the same placeholders in both languages', () => {
  const keys = Object.keys(zh) as DshSuperagentKey[]
  expect(keys.filter(key => placeholders(zh[key]).join() !== placeholders(en[key]).join())).toEqual([])
  expect(keys.filter(key => !zh[key] || !en[key])).toEqual([])
})

it('words a reason by its code with its values, each of a batch, and words a person or an assessor wrote as written', () => {
  const t = ((key: DshSuperagentKey, values: Record<string, string> = {}) => (zh[key] ?? key).replace(/\{(\w+)\}/g, (_match, name: string) => values[name] ?? '')) as T
  expect(reasonLabel(t, 'retried')).toBe(zh['reason.retried'])
  expect(reasonLabel(t, [{ code: 'routed', values: { ticket: 't1' } }])).toBe('已转给工单 t1')
  expect(reasonLabel(t, [{ code: 'not_a_member', triggerId: '1' }, { code: 'no_mention', triggerId: '2' }]))
    .toBe(`${zh['reason.not_a_member']}；${zh['reason.no_mention']}`)
  expect(reasonLabel(t, [{ code: 'said', values: { text: 'The button is already blue' } }])).toBe('The button is already blue')
  expect(reasonLabel(t, { code: 'some_new_filter' })).toBe('some_new_filter')
  expect(reasonLabel(t, 'The button is already blue')).toBe('The button is already blue')
})

it('words every refusal the host words by code, in both languages', () => {
  expect(Object.keys(USER_ERRORS).filter(code => !zh[`userError.${code}` as DshSuperagentKey]
    || !en[`userError.${code}` as DshSuperagentKey])).toEqual([])
})

it('has words for every reason code the core records', () => {
  expect(Object.keys(REASONS).filter(code => code !== 'said' && !(`reason.${code}` in zh))).toEqual([])
})
