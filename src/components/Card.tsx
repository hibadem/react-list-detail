import React from 'react'

const Card = (props: any) => {
  const className = ' bg-white border p-2.5 flex flex-col gap-3 items-start' + props.className;
  return (
    <div className={className}>{props.children}</div>
  )
}

export default Card