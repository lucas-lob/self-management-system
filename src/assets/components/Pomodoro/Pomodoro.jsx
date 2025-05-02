import React from 'react'
import { useState } from 'react'

import { secondsToFormattedTime, secondsToTime } from './timeConverter.js'
import { PomodoroPopup } from '../PomodoroPopup/PomodoroPopup.jsx'

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
    sectionDuration: 5,
    shortIntervalDuration: 5,
    longIntervalDuration: 10,
    setIntervalID: 0,
    isInterval: false,
    currentSection: 1,
    longIntervalSection: 3
}

export const Pomodoro = () => {
    const [popup, setPopup] = useState(<></>)

    const [timerValues, setTimerValues] = useState({
        hours: secondsToTime(timerSettings.sectionDuration).hours,
        minutes: secondsToTime(timerSettings.sectionDuration).minutes,
        seconds: secondsToTime(timerSettings.sectionDuration).seconds
    })

    const [elementsStatus, setElementsStatus] = useState({
        timer: elementStatus.UNUSABLE,
        section: elementStatus.UNUSABLE,
        playButton: elementStatus.USABLE,
        pauseButton: elementStatus.UNUSABLE,
        stopButton: elementStatus.UNUSABLE,
        settingsButton: elementStatus.USABLE
    })

    // TIMER FUNCTIONS
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
                        // Timer ended
                        clearInterval(timerSettings.setIntervalID)

                        setElementsStatus({
                            timer: elementStatus.UNUSABLE,
                            section: elementStatus.UNUSABLE,
                            playButton: elementStatus.USABLE,
                            pauseButton: elementStatus.UNUSABLE,
                            stopButton: elementStatus.UNUSABLE,
                            settingsButton: elementStatus.USABLE
                        })

                        if (timerSettings.isInterval) {
                            timerSettings.isInterval = false
                            timerSettings.currentSection++

                            setTimerValues(secondsToTime(timerSettings.sectionDuration))
                        } else {
                            timerSettings.isInterval = true

                            if (timerSettings.currentSection % timerSettings.longIntervalSection === 0) {
                                // Is long interval
                                setTimerValues(secondsToTime(timerSettings.longIntervalDuration))
                            } else {
                                // Is short interval
                                setTimerValues(secondsToTime(timerSettings.shortIntervalDuration))
                            }
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

    // POPUPS FUNCTIONS
    function showSettingsPopup() {
        setPopup(
            <PomodoroPopup popupID={1} closeButtonOnClickListener={() => {setPopup()}} />
        )
    }
    function showSelectionPopupWithoutAlert() {
        setPopup(
            <PomodoroPopup popupID={2} closeButtonOnClickListener={() => {setPopup()}} />
        )
    }
    function showSelectionPopupWithAlert() {
        setPopup(
            <PomodoroPopup popupID={3} closeButtonOnClickListener={() => {setPopup()}} />
        )
    }

    return (
        <>
            {popup}

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

                    <IconButton status={elementsStatus.settingsButton} onClickListener={showSettingsPopup} iconText="settings" scale={iconScale.REDUCED} />
                </div>
            </div>
        </>
    )
}
