import React from 'react'
import { useState } from 'react'

import style from './Pomodoro.module.css'

// CONSTANT TAILWIND UTILITY CLASSES
const iconScale = {
    NORMAL: "scale-100",
    REDUCED: "scale-75"
}

const elementStatus = {
    USABLE: "opacity-100 pointer-events-auto",
    UNUSABLE: "opacity-30 pointer-events-none"
}

const IconButton = ({ status, iconText, scale = iconScale.NORMAL }) => {
    return (
        <button type='button'>
            <span className={`${scale} ${status} md:!text-[64px] text-primary hover:text-tertiary transition duration-300 ease-in-out material-symbols-rounded`}>
                {iconText}
            </span>
        </button>
    )
}

export const Pomodoro = () => {
    const [timerValues, setTimerValues] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [currentSection, setCurrentSection] = useState(1)

    const [elementsStatus, setElementsStatus] = useState({
        timer: elementStatus.UNUSABLE,
        section: elementStatus.UNUSABLE,
        playButton: elementStatus.USABLE,
        pauseButton: elementStatus.UNUSABLE,
        stopButton: elementStatus.UNUSABLE,
        settingsButton: elementStatus.USABLE
    })

    return (
        <div className="absolute left-[50%] top-[50%] translate-[-50%] flex flex-col items-center">
            <h1 className={`!text-[50px] sm:!text-[75px] lg:!text-[100px] xl:!text-[150px] text-primary ${elementsStatus.timer}`}>
                {timerValues.hours} : {timerValues.minutes} : {timerValues.seconds}
            </h1>

            <h2 className={`mb-lg lg:mb-xl text-primary ${elementsStatus.section}`}>
                Sessão {currentSection}
            </h2>

            <div className='flex gap-[20px] lg:gap-[40px]'>

                <IconButton status={elementsStatus.playButton} iconText="play_arrow" />

                <IconButton status={elementsStatus.pauseButton} iconText="pause" />

                <IconButton status={elementsStatus.stopButton} iconText="stop" />

                <IconButton status={elementsStatus.settingsButton} iconText="settings" scale={iconScale.REDUCED} />
            </div>
        </div>
    )
}
