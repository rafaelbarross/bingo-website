// import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function BingoWinner() {
    const { width, height } = useWindowSize()
    return (
      <Confetti
      
      className='absolute top-0 bottom-0 right-0 left-0'
        width={width}
        height={height}
      />
    )
}
