import React, {BaseSyntheticEvent, useEffect, useRef, useState} from "react";
import {ApiRouter} from "../routing/api-router";
import {FootballPlayer} from "../models/football-player";

function TeemNameInputComponent(props: {
    isFormComponent: boolean,
    fieldsData: FootballPlayer,
    setFieldsData: (value: (((prevState: FootballPlayer) => FootballPlayer) | FootballPlayer)) => void
}) {
    const [allTeemNames, setAllTeemNames] = useState<string[]>([]);
    const [suitableTeemNames, setSuitableTeemNames] = useState<string[]>([]);
    const [isTeemNamesHidden, setIsTeemNamesHidden] = useState<boolean>(true);
    const [savedTeemName, setSavedTeemName] = useState<string>('');

    const inputRef = useRef<HTMLInputElement | null>(null);
    const optionsRef = useRef<HTMLUListElement | null>(null);

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current!!.contains(event.target as Node) &&
                inputRef.current && !inputRef.current!!.contains(event.target as Node)) {
                if (savedTeemName !== '') {
                    props.setFieldsData({
                        ...props.fieldsData,
                        'teemName': savedTeemName
                    });
                }

                setIsTeemNamesHidden(true);
                return;
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: BaseSyntheticEvent) => {
        props.setFieldsData({
            ...props.fieldsData,
            'teemName': e.target.value
        });

        setSuitableTeemNames(
            allTeemNames.filter(
                name => name.split(' ').some(
                    part => part.toLowerCase().startsWith(e.target.value.toLowerCase())
                )
            )
        );
    }

    const handleTeemNameOptionSelect = (teemName: string) => {
        props.setFieldsData({
            ...props.fieldsData,
            'teemName': teemName
        });

        setIsTeemNamesHidden(true);
    }

    const handleTeemNameInputFocus = async () => {
        try {
            await fetch(ApiRouter.GetTeemNames, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    setAllTeemNames(data['teemNames'] as string[]);
                    setSuitableTeemNames(data['teemNames'] as string[]);
                });

        } catch (err) {
            console.log(err);
        }

        if (props.fieldsData.teemName !== '') {
            setSavedTeemName(props.fieldsData.teemName);
        }

        props.setFieldsData({
            ...props.fieldsData,
            'teemName': ''
        });

        setIsTeemNamesHidden(false);
    }

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            inputRef.current && inputRef.current!!.blur();
            handleTeemNameOptionSelect(suitableTeemNames[0]);
        }
    }

    return (
        <div className={props.isFormComponent ? "form-field-block" : "edit-card-block"}
             id={props.isFormComponent ? "form-field-block-teem-name" : "edit-card-block-teem-name"}>
            <label htmlFor="teemName">Название команды</label>
            <input
                type="text"
                id="teem-name"
                name="teemName"
                autoComplete="off"
                value={props.fieldsData.teemName}
                ref={inputRef}
                onKeyDown={handleEnterPress}
                onFocus={handleTeemNameInputFocus}
                onChange={handleInputChange}
                maxLength={40}
                required
            />
            <div className={props.isFormComponent ? "teem-name-container" : "edit-teem-name-container"} ref={divRef}>
                {!isTeemNamesHidden && suitableTeemNames.length > 0 && (
                    <ul className={props.isFormComponent ? "teem-name-menu" : "edit-teem-name-menu"}
                        ref={optionsRef}
                        style={{ listStyle: 'none' }}>
                        {suitableTeemNames.map((item, index) => (
                            <li className={props.isFormComponent ? "teem-name-item" : "edit-teem-name-item" }
                                key={index}
                                onClick={() => handleTeemNameOptionSelect(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TeemNameInputComponent;