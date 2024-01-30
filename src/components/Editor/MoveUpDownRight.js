import React from 'react'

const MoveUpDownRight = ({ moveRightContentUp, moveRightContentDown, index }) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button style={{ border: "1px solid #000000", padding: ".4rem", borderRadius: ".4rem" }} onClick={() => moveRightContentUp(index)}>↑</button>
                <button style={{ border: "1px solid #000000", padding: ".4rem", borderRadius: ".4rem" }} onClick={() => moveRightContentDown(index)}>↓</button>
            </div>
        </>
    )
}

export default MoveUpDownRight