import React from 'react'
import { useState, useEffect } from 'react'

import { PomodoroPopup } from '../PomodoroPopup/PomodoroPopup.jsx'

// CONSTANT TAILWIND UTILITY CLASSES
const iconScale = {
    NORMAL: "scale-100",
    REDUCED: "scale-75"
}

const elementStatus = {
    USABLE: "opacity-100 pointer-events-auto",
    UNUSABLE: "opacity-30 pointer-events-none"
}



// GLOBAL VARIABLES
let timerSettings = {
    setIntervalID: 0,
    isInterval: false,
    isPause: false,
    currentSection: 1,
}



// COMPONENTS
const IconButton = ({ onClickListener, status, iconText, scale = iconScale.NORMAL }) => {
    return (
        <button type='button' className={`${status} text-primary hover:text-tertiary transition duration-300 ease-in-out `} onClick={onClickListener}>
            <span className={`${scale} !text-[40px] md:text-[64px] material-symbols-rounded`}>
                {iconText}
            </span>
        </button>
    )
}

export const Pomodoro = () => {
    const [popup, setPopup] = useState(<></>)

    const [userData, setUserData] = useState(null)

    const [timerValues, setTimerValues] = useState(null)

    const [elementsStatus, setElementsStatus] = useState({
        timer: elementStatus.UNUSABLE,
        section: elementStatus.UNUSABLE,
        playButton: elementStatus.USABLE,
        pauseButton: elementStatus.UNUSABLE,
        stopButton: elementStatus.UNUSABLE,
        settingsButton: elementStatus.USABLE
    })



    useEffect(() => {
        if (userData === null) {
            async function fetchData() {
                let settings = await fetch("http://localhost:3000/users/681e27acde2792bfacf6e328/pomodoro-settings").then(response => response.json())

                let categories = await fetch("http://localhost:3000/users/681e27acde2792bfacf6e328/categories").then(response => response.json())

                setUserData({
                    settings,
                    categories
                })
            }
            fetchData()

        } else if (timerValues === null) {
            setTimerValues({
                hours: userData.settings.sectionDuration[0],
                minutes: userData.settings.sectionDuration[1],
                seconds: userData.settings.sectionDuration[2]
            })
        }

        return () => {

        }
    }, [userData])



    // TIMER FUNCTIONS
    function runTimer() {
        timerSettings.isPause = false

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

                            setTimerValues({
                                hours: userData.settings.sectionDuration[0],
                                minutes: userData.settings.sectionDuration[1],
                                seconds: userData.settings.sectionDuration[2]
                            })
                        } else {
                            timerSettings.isInterval = true

                            if (timerSettings.currentSection % timerSettings.longIntervalSection === 0) {
                                // Is long interval
                                setTimerValues({
                                    hours: userData.settings.longIntervalDuration[0],
                                    minutes: userData.settings.longIntervalDuration[1],
                                    seconds: userData.settings.longIntervalDuration[2]
                                })
                            } else {
                                // Is short interval
                                setTimerValues({
                                    hours: userData.settings.shortIntervalDuration[0],
                                    minutes: userData.settings.shortIntervalDuration[1],
                                    seconds: userData.settings.shortIntervalDuration[2]
                                })
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

        timerSettings.isPause = true

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

        timerSettings = {
            ...timerSettings,
            isInterval: false,
            isPause: false,
            currentSection: 1
        }

        setElementsStatus({
            timer: elementStatus.UNUSABLE,
            section: elementStatus.UNUSABLE,
            playButton: elementStatus.USABLE,
            pauseButton: elementStatus.UNUSABLE,
            stopButton: elementStatus.UNUSABLE,
            settingsButton: elementStatus.USABLE
        })
        setTimerValues({
            hours: userData.settings.sectionDuration[0],
            minutes: userData.settings.sectionDuration[1],
            seconds: userData.settings.sectionDuration[2]
        })
    }



    // SHOW POPUPS FUNCTIONS
    function showSettingsPopup() {
        setPopup(
            <PomodoroPopup popupID={1} closeButtonOnClickListener={() => { setPopup() }} />
        )
    }
    function showSelectionPopupWithoutAlert() {
        setPopup(
            <PomodoroPopup popupID={2} closeButtonOnClickListener={() => { setPopup() }} />
        )
    }
    function showSelectionPopupWithAlert() {
        setPopup(
            <PomodoroPopup popupID={3} closeButtonOnClickListener={() => { setPopup() }} />
        )
    }



    return (
        <>
            {
                userData === null || timerValues === null ?
                    <div className="absolute left-[50%] top-[50%] translate-[-50%]">
                        <p className='text-big text-primary'>Carregando</p>
                    </div>
                    :
                    <div className="absolute left-[50%] top-[50%] translate-[-50%] flex flex-col items-center">
                        {timerSettings.isPause && <h1 className='mb-xl text-big'> Pausado </h1>}

                        <div className={`flex text-[50px] sm:text-[75px] lg:text-[100px] xl:text-[150px] text-primary ${elementsStatus.timer}`}>
                            {timerValues.hours < 9 ? <h1> 0{timerValues.hours}: </h1> : <h1> {timerValues.hours}: </h1>}

                            {timerValues.minutes < 9 ? <h1> 0{timerValues.minutes}: </h1> : <h1> {timerValues.minutes}: </h1>}

                            {timerValues.seconds < 9 ? <h1> 0{timerValues.seconds} </h1> : <h1> {timerValues.seconds} </h1>}
                        </div>

                        <div className={`flex mb-xl text-small md:text-medium text-primary ${elementsStatus.section}`}>
                            <h2>
                                Sessão {timerSettings.currentSection}
                            </h2>

                            {timerSettings.isInterval && <h2><pre className='font-autour-one'> | Intervalo {timerSettings.currentSection}</pre></h2>}
                        </div>

                        <div className='flex gap-sm lg:gap-lg'>
                            <IconButton status={elementsStatus.playButton} onClickListener={runTimer} iconText="play_arrow" />

                            <IconButton status={elementsStatus.pauseButton} onClickListener={pauseTimer} iconText="pause" />

                            <IconButton status={elementsStatus.stopButton} onClickListener={stopTimer} iconText="stop" />

                            <IconButton status={elementsStatus.settingsButton} onClickListener={showSettingsPopup} iconText="settings" scale={iconScale.REDUCED} />
                        </div>
                    </div>
            }
        </>
    )
}
