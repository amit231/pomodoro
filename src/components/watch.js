import React from 'react'

function Watch() {
    return (
        <svg viewBox="0 0 657 650" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame 1">
                <g id="watch">
                    <circle id="background" cx="328" cy="325" r="310" fill="#05051D" stroke="#0b0918" strokeWidth="20" />
                    <g id="track" filter="url(#filter0_d)">
                        <circle style={{ transform: 'rotate(270deg)', transformOrigin: 'center' }} cx="328" cy="325" r="275" strokeWidth="20" />
                    </g>
                </g>
            </g>
            <defs>
                <filter id="filter0_d" x="22" y="19" width="612" height="612" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.52625 0 0 0 0 0.0898438 0 0 0 0 0.535156 0 0 0 0.46 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                </filter>
            </defs>
        </svg>


    )
}

export default Watch
