import React from 'react'

import { useState } from 'react'

import style from './PomodoroPopup.module.css'

const CreateCategoryInput = () => {
    return (
        <div className='flex justify-center'>
            <input type="text" placeholder='Nome da categoria' className='w-[299px] mr-[17px] rounded-[18px] border-2 border-on-primary text-center text-primary bg-on-primary placeholder:text-on-brackground hover:border-primary transition duration-350 ease-in-out' />

            <button className='w-[97px] p-[8px_0] rounded-[8px] bg-primary hover:bg-tertiary text-on-primary hover:text-on-tertiary transition duration-350 ease-in-out'>
                Criar
            </button>
        </div>
    )
}

const SettingsMenu = () => {
    const [settings, setSettings] = useState({
        sectionDuration: 0,
        shortIntervalDuration: 0,
        longIntervalDuration: 0,
        sectionsAmount: 0,
        notificationSound: "Bell",
    })

    return (
        <div className='flex flex-col gap-[30px] m-[70px_70px_0_70px] text-on-secundary'>
            <div>
                <h1 className='mb-[30px]'>SESSÕES</h1>

                <ul className='flex flex-col gap-[20px]'>
                    <li className='flex justify-between'>
                        <h2>Duração da sessão</h2>
                        <h2>{settings.sectionDuration}</h2>
                    </li>

                    <li className='flex justify-between'>
                        <h2>Intervalo curto</h2>
                        <h2>{settings.shortIntervalDuration}</h2>
                    </li>

                    <li className='flex justify-between'>
                        <h2>Intervalo longo</h2>
                        <h2>{settings.longIntervalDuration}</h2>
                    </li>

                    <li className='flex justify-between'>
                        <h2>Quantidade de sessões</h2>
                        <h2>{settings.sectionDuration}</h2>
                    </li>
                </ul>
            </div>

            <div>
                <h1 className='mb-[30px]'>NOTIFICAÇÕES</h1>

                <ul>
                    <li className='flex justify-between'>
                        <h2>Som</h2>

                        <select className='text-medium'>
                            <option value={settings.notificationSound}>
                                {settings.notificationSound}
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const SelectionMenuWithAlert = () => {
    return (
        <div className='flex flex-col gap-[32px] m-[70px_81px_0] text-on-secundary'>
            <span className="!text-[75px] text-center material-symbols-rounded">
                error
            </span>

            <p className='!text-justify'>
                Ops... Parece que você ainda não criou nenhuma categoria.
                <br /><br />
                Você precisa criar uma categoria para vinculá-la à sua sessão!
                <br /><br />
                Exemplos: estudos, lazer, trabalho.
            </p>

            <CreateCategoryInput />
        </div>
    )
}

const SelectionMenuWithoutAlert = () => {
    return (
        <div className='flex flex-col gap-[32px] m-[118px_67px_0] items-center text-on-secundary'>
            <div className='flex flex-col gap-[20px]'>
                <h1>Escolha uma categoria</h1>

                <select className='w-[413px] p-[3px_0] rounded-[6px] border-2 border-on-primary bg-background !text-secundary text-medium text-center hover:border-primary transition duration-350 ease-in-out'>
                    <option value=''>Selecione uma categoria</option>
                    <option value='estudos'>Estudos</option>
                </select>
            </div>

            <p>- ou -</p>

            <div className='flex flex-col gap-[20px]'>
                <h1>Crie uma nova categoria</h1>

                <CreateCategoryInput />
            </div>
        </div>
    )
}

export const PomodoroPopup = ({popupID, closeButtonOnClickListener}) => {
    const bottomButtonText = "Salvar"

    return (
        <div className='absolute top-[50%] left-[50%] translate-[-50%] w-[585px] h-[543px] bg-secundary rounded-[45px]'>
            <button type='button' className='absolute left-[100%] translate-x-[calc(-100%-34px)] top-[34px]' onClick={closeButtonOnClickListener}>
                <span className='text-on-secundary hover:!text-on-tertiary transition duration-350 ease-in-out material-symbols-rounded'>
                    cancel
                </span>
            </button>

            <div>
                { popupID === 1 && <SettingsMenu />}
                { popupID === 2 && <SelectionMenuWithoutAlert />}
                { popupID === 3 && <SelectionMenuWithAlert />}
            </div>

            <button type='button' className='absolute left-[50%] bottom-[50px] translate-x-[-50%] w-[165px] p-[9px_0px] rounded-[8px] bg-primary hover:bg-tertiary text-on-primary hover:text-on-tertiary text-medium transition duration-350 ease-in-out'>
                {bottomButtonText}
            </button>
        </div>
    )
}
