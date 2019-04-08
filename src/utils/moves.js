function getDirectionForPlayer(player) {
  if (player == 1) return 'down'
  if (player == 2) return 'up'
}

export function calculatePossibleMoves(state, player) {
  const dimension = Math.sqrt(state.length)
  const opponent = player == 1 ? 2 : 1
  const empty = 0
  const direction = getDirectionForPlayer(player)

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
            possibleMoves.push([i * dimension + j, nextRow * dimension + j - 1])
          }
        }
      }
    }
  }

  return possibleMoves
}

export function performMove(state, move) {
  const from = move[0]
  const to = move[1]
  const newState = state.slice(0)
  newState[from] = 0
  newState[to] = state[from]
  return newState
}

export function calculateAllPossibleStates(initialState) {}

function calculateAllPossibleStatesHelper(stateNow, allStates) {}
