"use client"

import * as React from "react"

export function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: "url('/Assets/SVG/Herobg.svg')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
           
          
          `,
          backgroundSize: "cover",
        }}
      />
    </div>
  )
}