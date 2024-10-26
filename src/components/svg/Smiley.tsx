const Smiley = () => {
    return (
        <svg width={300} height={300} style={{border: "1px solid blue"}}>
            <circle r={120} cx={150} cy={150} fill="yellow" stroke="black" strokeWidth={2} />
            <g>
                <circle r={20} cx={100} cy={120} fill="black" />
                <circle r={20} cx={200} cy={120} fill="black" />
            </g>
            <path d="M80,180 C120,250 180,250 220,180" style={{fill: "none", stroke: "black", strokeWidth: "3"}} />
        </svg>
    )
}

export default Smiley