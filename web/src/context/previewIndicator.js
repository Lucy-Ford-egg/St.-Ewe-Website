// PreviewIndicator.jsx

import React from "react"
import cx from "classnames"

export default function PreviewIndicator({ isLoading = false }) {
  return (
    <div className="fixed inset-0 flex items-end justify-center w-screen h-screen pointer-events-none z-140">
      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xxxs sm:text-xs font-light text-gray-900 ring-1 ring-inset bg-white mb-6">
        <svg
          className={cx(
            "w-2 h-2 bg-white transition-all duration-1000 animate",
            {
              "animate-pulse fill-yellow-500": isLoading,
              "fill-green-500": !isLoading,
            }
          )}
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx={3} cy={3} r={3} />
        </svg>
        {isLoading ? "Preview is loading" : "Preview up-to-date"}
      </span>
    </div>
  )
}
