import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Watch from './components/watch'
import audioSrc from './assets/Bell-ring-sound-effect.mp3'



const Bakcgroundsc = styled.div`
    height:100vh;
    width:100vw;
    background-color:rgba(2, 2, 31, 0.953);
    display:grid;
    grid-template-columns:100% ;
    grid-row-gap:20px;
    grid-template-rows:10% 7% 70% 10%;
    overflow:hidden;
    .AppHeadingsc{
        justify-self:center;
        grid-row:1/2;
        grid-column:1/-1;
        letter-spacing:5px;
        color:white;
        font-size:3rem;
        @media(max-width:450px){
            font-size:2rem;
        }
    }
        @media(max-width:450px){
            grid-row-gap:2px;
            
        }

`
const CircleContainersc = styled.div`
    position: relative;
    grid-row:3/4;
    grid-column:1/-1;
    width:100%;
    height:100%;
    margin:0px auto;
    svg{
        filter: drop-shadow(0px 0px 20px rgba(122, 73, 191, 0.748));
        width:100%;
        height:100%;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        #track{
            stroke-linecap: round;
            stroke-dasharray:1727;
            stroke-dashoffset:${(props) => props.dash ? props.dash : 1727};
            circle{
                stroke:${(props) => props.theme};
            }
        }
        @media(max-width:450px){
            width:95%;            
        }
    }
    
`
const ButtonContainersc = styled.div`
    grid-row:2/3;
    border-radius:30px;
    background-color:#05051D;
    padding:5px;
    grid-column:1/-1;
    display:flex;
    justify-self:center;
    justify-content: center;
    width:25%;
    /* background-color:green; */
    @media (max-width:950px){
        width:90%;
    }
    
`
const MiddleWrapper = styled.div`
    display:block;
    position:absolute;
    z-index:1;
    left:50%;
    transform:translate(-50%);
    top:45%;
    
    width:19%;
    height:10%;
    input{
        font-size:2.3rem;
        width:100%;
        height:100%;
        background-color:inherit;
        border: 2px solid blue;
        border-radius:15px;
        text-align:center;
        outline:none;
        color:white;
        
        @media (max-width:450px){
            font-size:1.5rem;
        }
    }
    @media (max-width:850px){
        width:70%;
    }
`
const ThemeTogglerContainersc = styled.div`
    grid-row:4/-1;
    grid-column:1/-1;
    text-align:center;
    transition: transform 2s;
    
    path{
        fill:white;
        stroke-width:1;
    }
    svg{
        height:50%;
    }
    svg:hover{
        filter:drop-shadow(-1px -1px 10px rgba(256,256,256,1));
    }
`
const Timersc = styled.div`
    color:white;
    font-size:5rem;
    position:absolute;
    top:20%;
    left:50%;
    transform:translateX(-50%);
    z-index:2;
    @media (max-width:450px){
        top:30%;
        font-size:3rem;
   }
`
const Buttonsc = styled.button`
    margin-left:5px;
    border-radius:30px;
    cursor:pointer;
    width:33%;
    background-color:${props => props.now === 'true' ? props.theme : 'inherit'};
    border:none;
    outline:none;
    font-size:2rem;
    color:rgb(28, 28, 95);
    font-weight:400;
    @media (max-width:450px){
        
        font-size:1rem;
    }
`
const ControlsWrapper = styled.div`
    display:block;
    position:absolute;
    z-index:1;
    left:50%;
    transform:translate(-50%);
    top:75%;
    outline:none;
    font-size:3rem;
    color:rgb(28, 28, 95);
    letter-spacing:10px;
    font-weight:900;
    cursor:pointer;
    @media (max-width:450px){   
        top:60%;
        font-size:2rem;
    }
`
const Name = styled.div`
    width:100%;
    z-index:1;
    font-size:3rem;
    color:${props => props.theme};
    font-weight:500;
    text-align:center;
    @media (max-width:450px){
        font-size:1.5rem;
    }

`

const Modal = styled.div`
    position:fixed;
    width:50%;
    height:50%;
    background-color:grey;
    z-index:10;
    top:50%;
    left:50%;
    transform:${props => { return props.msg !== '' ? 'translate(-50%, -50%)' : 'translate(-500%, -500%)' }}; 
    transition:transform 10s ease;
    span{
        display:block;
        position:absolute;
        top:40%;
        left:50%;
        font-size:4rem;
        transform:translate(-50%,-50%); 
        color:aqua;
        @media (max-width:450px){
        font-size:1.7rem;
        }
    }
    button{
        display:block;
        position:absolute;
        top:70%;
        left:50%;
        transform:translate(-50%,-50%); 
        color:red;
        background:none;
        border:none;
        font-size:4rem;
        cursor:pointer;
        @media (max-width:450px){
            font-size:2rem;
        }
    }

`

function App() {
    // timers is the pomodoro objects
    const [timers, setTimers] = useState([{ name: 'pomodoro', duration: 1500 }, { name: 'short break', duration: 300, }, { name: 'long break', duration: 900, },])

    // theme
    const [theme, setTheme] = useState('#EE08F3')

    // state to manage current pomodoro session
    const [currTimer, setCurrTimer] = useState(0);
    let pomo = timers[currTimer];

    // current state of pomodoro (pause and play)
    const [stateOfPomo, setStateOfPomo] = useState('RESUME')

    //timer max value is timer duration
    const [timer, setTimer] = useState(1);
    function translate(value, leftMin, leftMax, rightMin, rightMax) {
        let leftSpan = leftMax - leftMin
        let rightSpan = rightMax - rightMin
        let valueScaled = (value - leftMin) / (leftSpan)
        return rightMin + (valueScaled * rightSpan)
    }
    let temp = translate(timer, 1, pomo.duration, 1, 1727);

    //name of session managing states
    const [ip, setIp] = useState(true);
    const [name, setName] = useState('');
    const [timerCompleted, setTImerCompleted] = useState(false)
    var interval;
    const countRef = useRef(null);
    const inputRef = useRef(null);
    var audio = new Audio(audioSrc);
    const [modal, setModal] = useState('d');

    useEffect(() => {
        inputRef.current.focus();
    }, [])
    //handle starting of timer
    useEffect(() => {
        if (!ip) {
            if (stateOfPomo === 'PAUSE') {
                countRef.current = setInterval(() => {
                    setTimer(timer => timer + 100);
                }, 100)
            }
            else if (stateOfPomo === 'RESUME') {
                clearInterval(countRef.current)
            }
        }
    }, [stateOfPomo])
    useEffect(() => {
        if (timer > pomo.duration) {
            setTImerCompleted(true)
        }
    }, [timer])
    useEffect(() => {
        if (timerCompleted) {
            console.log('hey')
            clearInterval(countRef.current)
            setTimer(pomo.duration)
        }
    }, [timerCompleted])
    useEffect(() => {
        // setTimer()
        if (!ip) {
            setTimer(1)
            clearInterval(countRef.current)
            setIp(true);
            setStateOfPomo('RESUME')
            setTImerCompleted(false)
        }
    }, [currTimer])

    useEffect(() => {
        if (timerCompleted) {
            audio.play();
            let header = name;
            if (header === '') {
                header = currTimer === 0 ? 'pomodoro sessio' : 'break period'
            }
            setModal(header + ' was completed');
            setTimer(1)
            clearInterval(countRef.current)
            setIp(true);
            setStateOfPomo('RESUME')
            setTImerCompleted(false)
        }
    }, [timerCompleted])



    let middle = <>
        <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} placeholder='name of session' />
    </>

    if (!ip) {
        if (name === '') {
            middle = <Name theme={theme} >pomodoro session</Name>
        }
        else {
            middle = <Name theme={theme} >{name}</Name>
        }
    }

    let controlHandler = e => { setIp(false); ((stateOfPomo === 'PAUSE') ? setStateOfPomo('RESUME') : setStateOfPomo('PAUSE')) };


    return (
        <Bakcgroundsc >
            <h1 className='AppHeadingsc'>pomodoro</h1>
            <ButtonContainersc theme={theme}>
                {timers.map((btn, key) => (<Buttonsc theme={theme} key={btn.name} now={key === currTimer ? 'true' : 'false'} onClick={e => setCurrTimer(key)}>{btn.name}</Buttonsc>))}
            </ButtonContainersc>
            {(modal !== '') ? <Modal msg={modal}> <span>{modal}</span><button onClick={e => setModal('')}> X</button></Modal> : null}
            <CircleContainersc dash={(temp + 1727)} theme={theme} >
                <Timersc>{Math.round((ip ? pomo.duration : timer) / 60)} : {String("0" + ((ip ? pomo.duration : timer) % 60)).slice(-2)}</Timersc>
                <Watch />
                <MiddleWrapper>{middle}</MiddleWrapper>
                <ControlsWrapper onClick={controlHandler}>{!ip ? stateOfPomo : 'START'}</ControlsWrapper>
            </CircleContainersc>
            <ThemeTogglerContainersc onClick={e => { if (theme === 'rgb(64, 226, 56)') { setTheme('#EE08F3') } else { setTheme('rgb(64, 226, 56)') } }}>
                <GearIcon />
            </ThemeTogglerContainersc>
        </Bakcgroundsc>
    );
}


function GearIcon() {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 512.003 512.003">
            <g>
                <g>
                    <path d="M491.584,192.579l-55.918-6.914c-0.919-2.351-1.884-4.682-2.892-6.993l34.648-44.428
                        c7.227-9.267,6.412-22.464-1.899-30.773l-57.028-56.996c-8.308-8.304-21.502-9.114-30.763-1.893L333.32,79.216
                        c-2.312-1.008-4.644-1.974-6.994-2.894l-6.915-55.904c-1.443-11.66-11.348-20.415-23.097-20.415h-80.637
                        c-11.748,0-21.656,8.755-23.097,20.416l-6.914,55.904c-2.349,0.919-4.681,1.884-6.988,2.89l-44.415-34.642
                        c-9.261-7.222-22.458-6.414-30.768,1.894l-57.021,57.009c-8.31,8.307-9.123,21.506-1.896,30.771l34.644,44.417
                        c-1.012,2.312-1.978,4.647-2.9,7.002l-55.906,6.914C8.757,194.022,0,203.927,0,215.676v80.64c0,11.75,8.758,21.658,20.421,23.097
                        l55.901,6.903c0.919,2.352,1.884,4.686,2.894,6.994l-34.641,44.417c-7.224,9.264-6.411,22.46,1.894,30.767l57.021,57.031
                        c8.307,8.31,21.507,9.121,30.773,1.896l44.417-34.648c2.306,1.007,4.638,1.974,6.987,2.891l6.914,55.921
                        c1.441,11.66,11.348,20.416,23.097,20.416h80.637c11.748,0,21.655-8.755,23.097-20.416l6.915-55.92
                        c2.351-0.92,4.682-1.885,6.993-2.892l44.425,34.65c9.266,7.225,22.463,6.414,30.771-1.898l57.015-57.031
                        c8.307-8.308,9.117-21.504,1.893-30.768l-34.641-44.409c1.012-2.313,1.978-4.647,2.898-7.002l55.901-6.903
                        c11.661-1.44,20.421-11.348,20.421-23.097v-80.64C512,203.927,503.243,194.022,491.584,192.579z M465.455,275.74l-49.864,6.158
                        c-9.151,1.131-16.772,7.556-19.431,16.386c-2.813,9.337-6.56,18.387-11.138,26.903c-4.367,8.124-3.525,18.063,2.147,25.335
                        l30.898,39.613l-27.924,27.932l-39.621-30.905c-7.269-5.668-17.202-6.513-25.327-2.15c-8.513,4.572-17.565,8.319-26.905,11.134
                        c-8.827,2.661-15.25,10.279-16.381,19.427l-6.169,49.883h-39.492l-6.167-49.883c-1.131-9.146-7.551-16.763-16.375-19.425
                        c-9.367-2.825-18.417-6.571-26.899-11.132c-8.122-4.369-18.061-3.527-25.336,2.147l-39.615,30.902L93.929,390.13l30.897-39.618
                        c5.671-7.273,6.513-17.206,2.147-25.328c-4.568-8.501-8.315-17.554-11.137-26.911c-2.662-8.825-10.282-15.247-19.43-16.376
                        l-49.861-6.156v-39.492l49.866-6.167c9.146-1.131,16.763-7.551,19.423-16.375c2.824-9.356,6.572-18.406,11.143-26.9
                        c4.374-8.124,3.533-18.067-2.143-25.342l-30.903-39.62l27.924-27.918l39.62,30.902c7.273,5.672,17.209,6.513,25.335,2.146
                        c8.493-4.565,17.541-8.31,26.896-11.132c8.825-2.662,15.247-10.279,16.378-19.427l6.166-49.867h39.494l6.169,49.869
                        c1.133,9.148,7.557,16.767,16.384,19.427c9.328,2.811,18.379,6.557,26.902,11.135c8.122,4.364,18.055,3.522,25.325-2.149
                        l39.616-30.894l27.927,27.912l-30.897,39.618c-5.666,7.267-6.513,17.191-2.158,25.311c4.58,8.54,8.328,17.599,11.138,26.923
                        c2.661,8.825,10.279,15.248,19.427,16.381l49.878,6.169V275.74z"/>
                </g>
            </g>
            <g>
                <g>
                    <path d="M255.997,155.153c-55.606,0-100.845,45.244-100.845,100.856c0,55.603,45.239,100.839,100.845,100.839
                        c55.609,0,100.852-45.236,100.852-100.839C356.849,200.397,311.606,155.153,255.997,155.153z M255.997,310.303
                        c-29.941,0-54.3-24.356-54.3-54.294c0-29.947,24.359-54.311,54.3-54.311c29.944,0,54.306,24.363,54.306,54.311
                        C310.303,285.947,285.941,310.303,255.997,310.303z"/>
                </g>
            </g>

        </svg>

    )
}

export default App;
