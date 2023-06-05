import React from 'react'

const Sidebar = (props: any) => {
  return (
    <div className={props.className}>
      <div className="text-muted text-xs mb-1">{props.title}</div>
      <div className="shadow-xl border min-w-[220px]">
        {props.children}
      </div>
    </div>
  )
}

export default Sidebar