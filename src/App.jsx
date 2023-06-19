import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { TURNS } from './board'
import { Square } from './components/Square'
import { checkWinner, checkEndGame } from './logic/checkWinner'
import { WinnerModal } from './components/winnerModal'

// componente principal
export function App () {
  // estados del tablero, turno y detectar ganador u empate
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  // empezar de nuevo
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  // funcion switch turno del jugador
  const updateBoard = (index) => {
    // Evitar sobreescribir el tablero
    if (board[index] || winner) return
    // actulizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //  rotacion del turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    // verificar ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      // actualizacion del estado siempre asincrono
      confetti()
      setWinner((previewWinner) => {
        console.log(`Ganador es ${newWinner} el anterior era ${previewWinner}`)
        return newWinner
      })
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(() => {
    console.log('useEffect')
  }, [winner])

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {board.map((_, index) => {
          // componente square
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        {/* switch del turno a jugar */}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
