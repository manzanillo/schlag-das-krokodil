calculatePossibleMoves = function(state, player, direction) {
  const dimension = Math.sqrt(state.length)
  const opponent = player == 1 ? 2 : 1
  const empty = 0
  if (dimension * dimension != state.length) {
    console.log('provided state is not a square')
    return
  }

  const rows = state.map(() => state.splice(0, 3)).filter(state => state)

  let possibleMoves = []
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] == player) {
        // check if this avatar can move
        const nextRow = direction == 'down' ? i + 1 : i - 1
        if (nextRow >= 0 && nextRow < rows.length) {
          /* if there is still one row below we now check
                    a) if field below or up is empty
                    b) field cross left or cross right exists and has an opponent on it 
                */
          if (rows[nextRow][j] == empty) {
            possibleMoves.push([i * dimension + j, nextRow * dimension + j])
          }

          if (j + 1 < dimension && rows[nextRow][j + 1] == opponent) {
            possibleMoves.push([i * dimension + j, nextRow * dimension + j + 1])
          }

          if (j - 1 < dimension && rows[nextRow][j - 1] == opponent) {
            possibleMoves.push([i * dimension + j, nextRow * dimension + j + 1])
          }
        }
      }
    }
  }

  return possibleMoves
}
