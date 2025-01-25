import React from 'react'

function Btn({
    children,
    type="button",
    bg_color="bg-green-600",
    text_color="text-white",
    className="",
    ...props
}) {
  return (
       <button className={`bg-green-600 py-5 ${bg_color} text-white ${text_color} `}
         {...props}>
            {children}</button>
  )
}

export default Btn
