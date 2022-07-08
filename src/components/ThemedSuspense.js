import React from 'react'

function ThemedSuspense() {
  return (
    <div className="w-full h-screen bg-green-500 dark:bg-green-900 "/>
  )
}

export function ErrorScreen({ children }) {
  return (
    <div className="w-full h-screen bg-red-500 dark:bg-red-900 ">
      {children}
    </div>
  )
}

export default ThemedSuspense
