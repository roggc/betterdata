import React, { useEffect } from 'react'

export const useOutsideClick = (
  ref: React.MutableRefObject<HTMLElement|null>,
  callback: () => void
) => {
  const checkIfOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', checkIfOutside)
    return () => {
      document.removeEventListener('click', checkIfOutside)
    }
  },[])
}
