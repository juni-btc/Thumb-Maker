import React, { useRef } from 'react'

const View = ({children}) => {
    

    return(
        <>
            <section className="thumb-view">
                {children}
            </section>
        </>
    )
}

export default View;