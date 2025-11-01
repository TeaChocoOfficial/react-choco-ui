//-Path: "react-choco-ui-test/src/main.tsx"
import C from './index'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
    <C.Button>test</C.Button>
    </>
  </StrictMode>,
)
