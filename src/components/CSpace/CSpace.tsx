import React from "react"

interface CSpaceProps {
    count: number
}

const CSpace = (props: CSpaceProps) => {
    const count = props.count <= 0 ? 1 : props.count;
    // let space = null
    // for (let i = 1; i < count; i++) {
    //     space = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
    // } 
    return (
        <span>
            {"&nbsp;".repeat(count)}
        </span>
    )
}

export default CSpace