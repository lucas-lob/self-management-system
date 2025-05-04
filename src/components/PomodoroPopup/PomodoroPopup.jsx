import React from 'react'

import { useState } from 'react'

const CreateCategoryInput = () => {
    return (
        <div className='flex justify-center'>
            <input type="text" placeholder='Nome da categoria' className='w-[180px] md:w-[299px] mr-sm md:mr-[17px] rounded-[18px] border-2 border-on-primary text-center text-primary bg-on-primary placeholder:text-very-small md:placeholder:text-small placeholder:text-on-brackground hover:border-primary transition duration-350 ease-in-out' />

            <button className='w-[97px] p-[8px_0] rounded-[8px] bg-primary hover:bg-tertiary text-very-small md:text-small text-on-primary hover:text-on-tertiary transition duration-350 ease-in-out'>
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
        <div className='flex flex-col gap-md md:gap-lg m-[70px_25px_0_25px] md:m-[70px_70px_0_70px] text-on-secundary'>
            <div>
                <h1 className='mb-md md:mb-lg text-small md:text-big'>SESSÕES</h1>

                <ul className='flex flex-col gap-sm md:gap-md text-very-small md:text-medium'>
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
                <h1 className='mb-md md:mb-lg text-small md:text-big'>NOTIFICAÇÕES</h1>

                <ul className='text-very-small md:text-medium'>
                    <li className='flex justify-between'>
                        <h2>Som</h2>

                        <select className='text-very-small md:text-medium'>
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
        <div className='flex flex-col gap-md md:gap-lg m-[70px_25px_0_25px] md:m-[70px_81px_0] text-on-secundary'>
            <span className="!text-[55px] md:!text-[75px] text-center material-symbols-rounded">
                error
            </span>

            <p className='!text-justify text-smallest md:text-small'>
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
        <div className='flex flex-col gap-md md:gap-lg m-[90px_25px_0_25px] md:m-[118px_67px_0] items-center text-on-secundary'>
            <div className='flex flex-col gap-sm md:gap-md'>
                <h1 className='text-small md:text-big'>Escolha uma categoria</h1>

                <select className='w-[271px] md:w-[413px] p-[3px_0] rounded-[6px] border-2 border-on-primary bg-background !text-secundary text-very-small md:text-medium text-center hover:border-primary transition duration-350 ease-in-out'>
                    <option value=''>Selecione uma categoria</option>
                    <option value='estudos'>Estudos</option>
                </select>
            </div>

            <p className='text-smallest md:text-small'>- ou -</p>

            <div className='flex flex-col gap-sm md:gap-md'>
                <h1 className='text-small md:text-big'>Crie uma nova categoria</h1>

                <CreateCategoryInput />
            </div>
        </div>
    )
}

export const PomodoroPopup = ({popupID, closeButtonOnClickListener}) => {
    const bottomButtonText = "Salvar"

    return (
        <div className='z-10 absolute top-[50%] left-[50%] translate-[-50%] w-[311px] md:w-[585px] h-[403px] md:h-[543px] bg-secundary rounded-[45px]'>
            <button type='button' className='absolute left-[100%] translate-x-[calc(-100%-34px)] top-[34px]' onClick={closeButtonOnClickListener}>
                <span className='!text-[33px] md:!text-[64px] text-on-secundary hover:!text-on-tertiary transition duration-350 ease-in-out material-symbols-rounded'>
                    cancel
                </span>
            </button>

            <div>
                { popupID === 1 && <SettingsMenu />}
                { popupID === 2 && <SelectionMenuWithoutAlert />}
                { popupID === 3 && <SelectionMenuWithAlert />}
            </div>

            <button type='button' className='absolute left-[50%] bottom-[50px] translate-x-[-50%] w-[110px] md:w-[165px] p-[9px_0px] rounded-[8px] bg-primary hover:bg-tertiary text-on-primary hover:text-on-tertiary text-small md:text-medium transition duration-350 ease-in-out'>
                {bottomButtonText}
            </button>
        </div>
    )
}
