import React from 'react'
import { useState } from 'react'

import style from './Pomodoro.module.css'

const IconButton = ({ opacity, iconText, rescale = 1 }) => {
    return (
        <button type='button'>
            <span className={`scale-[${rescale}] md:!text-[64px] !text-primary/${opacity} hover:!text-tertiary/${opacity} transition duration-300 ease-in-out material-symbols-rounded`}>
                {iconText}
            </span>
        </button>
    )
}

export const Pomodoro = () => {
    // CONSTANTS
    const USABLE_OPACITY = 100
    const UNUSABLE_OPACITY = 30

    const [timerValues, setTimerValues] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [currentSection, setCurrentSection] = useState(1)

    const [elementsOpacity, setElementsOpacity] = useState({
        timer: UNUSABLE_OPACITY,
        section: UNUSABLE_OPACITY,
        playButton: USABLE_OPACITY,
        pauseButton: UNUSABLE_OPACITY,
        stopButton: UNUSABLE_OPACITY,
        settingsButton: USABLE_OPACITY
    })

    return (
        <div className="absolute left-[50%] top-[50%] translate-[-50%] flex flex-col items-center">
            <h1 className={`!text-[50px] sm:!text-[75px] lg:!text-[100px] xl:!text-[150px] !text-primary/${elementsOpacity.timer}`}>
                {timerValues.hours} : {timerValues.minutes} : {timerValues.seconds}
            </h1>

            <h2 className={`mb-lg lg:mb-xl !text-primary/${elementsOpacity.section}`}>
                Sessão {currentSection}
            </h2>

            <div className='flex gap-[20px] lg:gap-[40px]'>

                <IconButton opacity={elementsOpacity.playButton} iconText="play_arrow" />

                <IconButton opacity={elementsOpacity.pauseButton} iconText="pause" />

                <IconButton opacity={elementsOpacity.stopButton} iconText="stop" />

                <IconButton opacity={elementsOpacity.settingsButton} iconText="settings" rescale ={0.7} />
            </div>
        </div>
    )
}
