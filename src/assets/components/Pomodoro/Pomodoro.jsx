import React from 'react'
import { useState } from 'react'

import {secondsToFormattedTime } from './timeConverter.js'

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

const IconButton = ({ onClickListener, status, iconText, scale = iconScale.NORMAL }) => {
    return (
        <button type='button' className={`${status} text-primary hover:text-tertiary transition duration-300 ease-in-out `} onClick={onClickListener}>
            <span className={`${scale} md:!text-[64px] material-symbols-rounded`}>
                {iconText}
            </span>
        </button>
    )
}

let timerSettings = {
    sectionDuration: 10,
    shortIntervalDuration: 0,
    longIntervalDuration: 0,
    setIntervalID: 0,
    isInterval: false,
    currentSection: 1
}

export const Pomodoro = () => {
    const [timerValues, setTimerValues] = useState({
        hours: 0,
        minutes: 0,
        seconds: 5
    })

    const [elementsStatus, setElementsStatus] = useState({
        timer: elementStatus.UNUSABLE,
        section: elementStatus.UNUSABLE,
        playButton: elementStatus.USABLE,
        pauseButton: elementStatus.UNUSABLE,
        stopButton: elementStatus.UNUSABLE,
        settingsButton: elementStatus.USABLE
    })

    function runTimer() {
        setElementsStatus({
            timer: elementStatus.USABLE,
            section: elementStatus.USABLE,
            playButton: elementStatus.UNUSABLE,
            pauseButton: elementStatus.USABLE,
            stopButton: elementStatus.USABLE,
            settingsButton: elementStatus.USABLE
        })

        let seconds = timerValues.seconds
        let minutes = timerValues.minutes
        let hours = timerValues.hours

        seconds--

        timerSettings.setIntervalID = setInterval(() => {
            if (seconds === -1) {
                seconds = 59
                minutes--
                if (minutes === -1) {
                    minutes = 59
                    hours--
                    if (hours === -1) {                    
                        clearInterval(timerSettings.setIntervalID)
                        setElementsStatus({
                            timer: elementStatus.UNUSABLE,
                            section: elementStatus.UNUSABLE,
                            playButton: elementStatus.USABLE,
                            pauseButton: elementStatus.UNUSABLE,
                            stopButton: elementStatus.UNUSABLE,
                            settingsButton: elementStatus.USABLE
                        })
                        if(timerSettings.isInterval){
                            // End interval
                        } else {
                            // End section
                        }
                        return
                    }
                }
            }
            setTimerValues({
                hours: hours,
                minutes: minutes,
                seconds: seconds
            })
            seconds--
        }, 1000);
    }

    function pauseTimer() {    
        clearInterval(timerSettings.setIntervalID)
        setElementsStatus({
            timer: elementStatus.UNUSABLE,
            section: elementStatus.UNUSABLE,
            playButton: elementStatus.USABLE,
            pauseButton: elementStatus.UNUSABLE,
            stopButton: elementStatus.USABLE,
            settingsButton: elementStatus.USABLE
        })
    }

    function stopTimer() {    
        clearInterval(timerSettings.setIntervalID)
        setElementsStatus({
            timer: elementStatus.UNUSABLE,
            section: elementStatus.UNUSABLE,
            playButton: elementStatus.USABLE,
            pauseButton: elementStatus.UNUSABLE,
            stopButton: elementStatus.UNUSABLE,
            settingsButton: elementStatus.USABLE
        })
        setTimerValues({
            hours: 0,
            minutes: 60,
            seconds: 0
        })
        timerSettings = {
            ...timerSettings,
            isInterval: false,
            currentSection: 1
        }
    }

    return (
        <div className="absolute left-[50%] top-[50%] translate-[-50%] flex flex-col items-center">
            <h1 className={`!text-[50px] sm:!text-[75px] lg:!text-[100px] xl:!text-[150px] text-primary ${elementsStatus.timer}`}>
                {timerValues.hours} : {timerValues.minutes} : {timerValues.seconds}
            </h1>

            <h2 className={`mb-lg lg:mb-xl text-primary ${elementsStatus.section}`}>
                Sessão {timerSettings.currentSection}
            </h2>

            <div className='flex gap-[20px] lg:gap-[40px]'>

                <IconButton status={elementsStatus.playButton} onClickListener={runTimer} iconText="play_arrow" />

                <IconButton status={elementsStatus.pauseButton} onClickListener={pauseTimer} iconText="pause" />

                <IconButton status={elementsStatus.stopButton} onClickListener={stopTimer} iconText="stop" />

                <IconButton status={elementsStatus.settingsButton} iconText="settings" scale={iconScale.REDUCED} />
            </div>
        </div>
    )
}
