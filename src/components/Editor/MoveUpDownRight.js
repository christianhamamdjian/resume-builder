import React from 'react'

const MoveUpDownRight = ({ moveRightContentUp, moveRightContentDown, index }) => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => moveRightContentUp(index)}>↑</button>
                <button className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => moveRightContentDown(index)}>↓</button>
            </div>
        </>
    )
}

export default MoveUpDownRight