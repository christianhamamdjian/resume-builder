import React from 'react'

const MoveUpDownLeft = ({ moveLeftContentUp, moveLeftContentDown, index }) => {
    return (
        <>
            {/* <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}> */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: ".5rem", }}>
                <button className='bg-gray-400 mt-3 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => moveLeftContentUp(index)}>↑</button>
                <button className='bg-gray-400 mt-3 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => moveLeftContentDown(index)}>↓</button>
            </div>
        </>
    )
}

export default MoveUpDownLeft