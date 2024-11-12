import React, {BaseSyntheticEvent, useEffect, useRef, useState} from "react";
import {FootballPlayer} from "../../models/football-player";
import {ApiRouter} from "../../routing/api-router";
import TeemNameInputComponent from "../../general-components/teem-name-input-component";
import CustomCalendar from "../../general-components/custom-calendar";

export function FormComponent() {
    const countries = ['Россия', 'США', 'Италия'];

    const [formData, setFormData] = useState<FootballPlayer>({
        id: 0,
        name: '',
        surname: '',
        gender: false,
        birthDate: '',
        teemName: '',
        country: 'Выберите страну..'
    });
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    const formContainerRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const isFormValid = Object.values(formData)
                                           .filter(value => typeof(value) !== "boolean" && typeof(value) !== 'number')
                                           .every(value => value.trim() !== '' && value.trim() !== 'Выберите страну..');
        setIsSubmitDisabled(!isFormValid);

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [formData]);

    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current!!.contains(event.target as Node)) {
            setIsOpenDropdown(false);
        }
    };

    const handleChange = (e: BaseSyntheticEvent) => {
        const targetElementName = e.target.name;

        switch (targetElementName) {
            case 'name': case 'surname': case 'birthDate': case 'country':
                setFormData({
                    ...formData,
                    [targetElementName]: e.target.value
                })
                break;
            case 'maleGender':
                setFormData({
                    ...formData,
                    gender: false
                })
                break;
            case 'femaleGender':
                setFormData({
                    ...formData,
                    gender: true
                })
                break;
            default:
                break;
        }
    }

    const handleDropdownCountrySelected = (newCountry: string) => {
        setFormData({
            ...formData,
            country: newCountry
        });
        setIsOpenDropdown(false);
    };

    const handleAdding = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const box = {
            Name: formData.name,
            Surname: formData.surname,
            Gender: formData.gender,
            BirthDate: formData.birthDate,
            TeemName: formData.teemName,
            Country: formData.country
        }
        let isSuccess = false;

        try {
            console.log(box);
            fetch(ApiRouter.Add, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(box)
            });

            setFormData({
                id: 0,
                name: '',
                surname: '',
                gender: false,
                birthDate: '',
                teemName: '',
                country: 'Выберите страну..'
            });
            isSuccess = true;
        } catch (err) {
            console.log(err);
        }

        if (isSuccess) {
            formContainerRef.current && formContainerRef.current!!.classList.add('success');
            formContainerRef.current && formContainerRef.current!!.classList.remove('error');
        } else {
            formContainerRef.current && formContainerRef.current!!.classList.add('error');
            formContainerRef.current && formContainerRef.current!!.classList.remove('success');
        }

        setTimeout(() => {
            formContainerRef.current && formContainerRef.current!!.classList.remove('success', 'error');
        }, 2000);
    };

    return (
        <div className="form-container" ref={formContainerRef}>
            <div className="form-title-block">
                <h2 className="form-title">Новый игрок</h2>
            </div>
            <form className="form" id="form-fields" onSubmit={handleAdding}>
                <div className="form-row">
                    <div className="form-field-block" id="form-field-block-name">
                        <label htmlFor="name">Имя</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={40}
                            required
                        />
                    </div>
                    <div className="form-field-block" id="form-field-block-surname">
                        <label htmlFor="surname">Фамилия</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            autoComplete="off"
                            value={formData.surname}
                            onChange={handleChange}
                            maxLength={40}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field-block" id="form-field-block-birth-date">
                        <label htmlFor="birthDate">Дата рождения</label>
                        <CustomCalendar formData={formData} setFormData={setFormData} isFormCalendar={true} />
                    </div>
                    <div className="form-field-block" id="form-field-block-radio">
                        <div className="radio-button" id="form-field-block-male-gender">
                            <label className="custom-checkbox">
                                <label htmlFor="maleGender">м</label>
                                <input
                                    type="checkbox"
                                    id="male-gender"
                                    name="maleGender"
                                    value="м"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    checked={!formData.gender}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="radio-button" id="form-field-block-female-gender">
                            <label className="custom-checkbox">
                                <label htmlFor="femaleGender">ж</label>
                                <input
                                    type="checkbox"
                                    id="female-gender"
                                    name="femaleGender"
                                    value="ж"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    checked={formData.gender}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <TeemNameInputComponent isFormComponent={true} fieldsData={formData} setFieldsData={setFormData}/>
                    <div className="form-field-block" id="form-field-block-country">
                        <label htmlFor="country">Старана</label>
                        <div className="form-select-container" id="country">
                            <div className="form-dropdown" ref={dropdownRef}>
                                <div className="form-dropdown-toggle" onClick={() => setIsOpenDropdown((prev) => !prev)}>
                                    {formData.country}
                                </div>
                                {isOpenDropdown && (
                                    <div className="form-dropdown-menu">
                                        {countries.map((option, index) => (
                                            <div key={index} className="form-dropdown-item"
                                                 onClick={() => handleDropdownCountrySelected(option)}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="submit-form" type="submit" disabled={isSubmitDisabled}>Добавить</button>
            </form>
        </div>
    );
}