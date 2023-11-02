import React from "react"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="">{children}</div>
    </main>
  )
}