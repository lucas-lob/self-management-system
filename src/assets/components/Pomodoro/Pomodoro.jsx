import React from 'react'
import { useState } from 'react'

import style from './Pomodoro.module.css'

export const Pomodoro = () => {
    const [timerValues, setTimerValues] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [currentSection, setCurrentSection] = useState(1)

    return (
        <div className="absolute left-[50%] top-[50%] flex flex-col items-center">
            <h1>
                {timerValues.hours} : {timerValues.minutes} : {timerValues.seconds}
            </h1>

            <h2>
                Sessão {currentSection}
            </h2>

            <div className='flex'>
                <button type='button'>
                    <span class="material-symbols-rounded">
                        play_arrow
                    </span>
                </button>

                <button type='button'>
                    <span class="material-symbols-rounded">
                        pause
                    </span>
                </button>

                <button type='button'>
                    <span class="material-symbols-rounded">
                        stop
                    </span>
                </button>

                <button type='button'>
                    <span class="material-symbols-rounded">
                        settings
                    </span>
                </button>
            </div>
        </div>
    )
}
