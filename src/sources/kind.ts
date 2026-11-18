/**
 * Panel-facing Source field types.
 *
 * Temporary coupling: the full SourceKind plugin contract lives in
 * `dsh-superagent-backend` (`src/sources/kind.ts`). Keep FieldSpec / Localized /
 * AdmissionRowView aligned when settings forms change.
 */
export interface Localized { zh: string; en: string }
interface FieldBase { key: string; label: Localized; hint?: Localized; advanced?: true }
export type FieldSpec =
  | FieldBase & { type: 'switch' }
  | FieldBase & { type: 'select'; options: { value: string; label: Localized }[] }
  | FieldBase & { type: 'number'; min: number; max: number }
  | FieldBase & { type: 'text'; pattern?: string; readonly?: boolean; choose?: Localized }
  | FieldBase & { type: 'fact'; settings?: 'deployment' }
  | FieldBase & { type: 'rows'; columns: ({ key: string; label: Localized; type: 'text'; pattern?: string; optional?: boolean; choose?: Localized; refresh?: Localized } | { key: string; label: Localized; type: 'select'; options: { value: string; label: Localized }[] })[] }

export interface AdmissionRowView {
  id: string
  label: Localized | string
  note: Localized
  cells: { listedUnaddressed: boolean; unlistedAddressed: boolean; unlistedUnaddressed: boolean }
}
