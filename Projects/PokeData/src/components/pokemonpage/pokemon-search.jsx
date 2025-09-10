export function PokemonSearch({ search, setSearch }) {
  return (
    <input
      type='text'
      placeholder='Busca un pokemon'
      value={search}
      onChange={e => setSearch(e.target.value)}
      className='search-input'
    />
  )
}
