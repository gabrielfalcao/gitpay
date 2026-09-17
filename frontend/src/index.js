import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './main/app'

// <suppress annoying errors that bring no value // TODO: revisit this after upgrading react and react-dom>
const originalWarn = console.warn
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('validateDOMNesting') || args[0].includes('deprecated'))
  ) {
    return
  }
  originalWarn(...args)
}
const originalError = console.error
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('validateDOMNesting') || args[0].includes('deprecated'))
  ) {
    return
  }
  originalError(...args)
}
// </suppress annoying errors that bring no value // TODO: revisit this after upgrading react and react-dom>

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<App />)
