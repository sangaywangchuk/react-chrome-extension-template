import React from 'react'
import { createRoot } from 'react-dom/client'
import OptionsPage from '../components/optionsPage'

// Create a root div element
const root = document.createElement('div')
document.body.appendChild(root)

// Use createRoot to render the JSX element into the root element
const rootElement = createRoot(root)
rootElement.render(<OptionsPage />)
