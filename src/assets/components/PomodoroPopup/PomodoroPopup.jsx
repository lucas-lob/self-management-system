import React from 'react'
import { useState } from 'react'

import style from './PomodoroPopup.module.css'

const SettingsMenu = () => {
    const [settings, setSettings] = useState({
        sectionDuration: 0,
        shortIntervalDuration: 0,
        longIntervalDuration: 0,
        sectionsAmount: 0,
        notificationSound: "Bell",
    })

    return (
        <>
            <div>
                <h1>SESSÕES</h1>

                <ul>
                    <li className='flex'>
                        <p>Duração da sessão</p>
                        <p>{settings.sectionDuration}</p>
                    </li>

                    <li className='flex'>
                        <p>Intervalo curto</p>
                        <p>{settings.shortIntervalDuration}</p>
                    </li>

                    <li className='flex'>
                        <p>Intervalo longo</p>
                        <p>{settings.longIntervalDuration}</p>
                    </li>

                    <li className='flex'>
                        <p>Quantidade de sessões</p>
                        <p>{settings.sectionDuration}</p>
                    </li>
                </ul>
            </div>

            <div>
                <h1>NOTIFICAÇÕES</h1>

                <ul>
                    <li className='flex'>
                        <p>Som</p>

                        <select>
                            <option value={settings.notificationSound}>
                                {settings.notificationSound}
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
        </>
    )
}

const SelectionMenuWithAlert = () => {
    return (
        <div className='flex flex-col'>
            <span class="material-symbols-rounded">
                error
            </span>

            <p>
                Ops... Parece que você ainda não criou nenhuma categoria. <br />

                Você precisa criar uma categoria para vinculá-la à sua sessão! <br />

                Exemplos: estudos, lazer, trabalho.
            </p>

            <div className='flex'>
                <input type="text" placeholder='Nome da categoria' />

                <button>Criar</button>
            </div>
        </div>
    )
}

const SelectionMenuWithoutAlert = () => {
    return (
        <>
            <div>
                <h1>Escolha uma categoria</h1>

                <select>
                    <option value=''>Selecione uma categoria</option>
                    <option value='estudos'>Estudos</option>
                </select>
            </div>

            <p>- ou -</p>

            <div>
                <h1>Crie uma nova categoria</h1>

                <div className='flex'>
                    <input type="text" placeholder='Nome da categoria' />

                    <button>Criar</button>
                </div>
            </div>
        </>
    )
}


export const PomodoroPopup = () => {
    const bottomButtonText = "Salvar"

    return (
        <>
            <span class="material-symbols-rounded">
                cancel
            </span>

            <SettingsMenu />

            <button type='button'>
                {bottomButtonText}
            </button>
        </>
    )
}
