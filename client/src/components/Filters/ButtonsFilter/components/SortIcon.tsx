import { SortAscending } from 'phosphor-react'

export default function SortIcon({ sort }: { sort: 'desc' | 'asc' }) {
  return (
    <div
      style={{
        transition: 'all .35s ease',
        transform: `rotate(${sort.toLowerCase() === 'asc' ? '360deg' : '-180deg'})`
      }}
    >
      <SortAscending size={24} />
    </div>
  )
}
