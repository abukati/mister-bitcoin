
export function MovesList({ user, contact = null }) {

  const formatDate = (timestamp) => {
    let date = new Date(timestamp)
    return (date.toLocaleDateString() + ',' + date.toLocaleTimeString())
  }

  let filteredMoves

  (() => {
    filteredMoves = contact ? user.moves.filter(move => move.toId === contact._id) : user.moves
    return filteredMoves
  })()


  if (filteredMoves.length === 0) return <div className="no-moves">Your future transactions will appear here.</div>

  return (
    <div className="moves-list-container">
      <h1 className="moves-title">{contact ? `Your moves to ${contact.name}` : 'Your recent moves'}</h1>
      <ul className="moves-list">
        {filteredMoves.map(move =>
          <li key={move.at} className="move-details">
            {contact ? '' : <span className="move-name">To: {move.to}</span>}
            <span className="move-amount">{move.amount} | {}</span>
            <span className="move-date">{formatDate(move.at)}</span>
          </li>
        )}
      </ul>
    </div>
  )
}
