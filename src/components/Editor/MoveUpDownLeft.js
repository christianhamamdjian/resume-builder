import React from 'react'

const MoveUpDownLeft = ({ moveLeftContentUp, moveLeftContentDown, index }) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button style={{ border: "1px solid #000000", padding: ".4rem", borderRadius: ".4rem" }} onClick={() => moveLeftContentUp(index)}>↑</button>
                <button style={{ border: "1px solid #000000", padding: ".4rem", borderRadius: ".4rem" }} onClick={() => moveLeftContentDown(index)}>↓</button>
            </div>
        </>
    )
}

export default MoveUpDownLeft