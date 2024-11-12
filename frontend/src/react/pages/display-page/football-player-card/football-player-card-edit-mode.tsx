import React, {BaseSyntheticEvent, useEffect, useRef, useState} from "react";
import {FootballPlayer} from "../../../models/football-player";
import TeemNameInputComponent from "../../../general-components/teem-name-input-component";
import CustomCalendar from "../../../general-components/custom-calendar";

function FootballPlayerCardEditMode(props: {
    player: FootballPlayer,
    onCancelClick: (value: boolean) => void,
    onSaveClick: (footballPlayer: FootballPlayer) => void
}) {
    const countries = ['Россия', 'США', 'Италия'];
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

    const [year, month, day] = props.player.birthDate.split('-');
    const formattedBirthDate = `${day}.${month}.${year}`;
    const [editModeData, setEditModeData] = useState<FootballPlayer>({
        id: props.player.id,
        name: props.player.name,
        surname: props.player.surname,
        gender: props.player.gender,
        birthDate: formattedBirthDate,
        teemName: props.player.teemName,
        country: props.player.country
    });
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Проверяем, все ли поля заполнены
        const isFormValid = Object.values(editModeData)
                                           .filter(value => typeof(value) != "boolean" && typeof(value) != "number")
                                           .every(value => value.trim() !== '');
        setIsSaveDisabled(!isFormValid);
    }, [editModeData]);

    const handleDropdownCountrySelected = (newCountry: string) => {
        setEditModeData({
            ...editModeData,
            country: newCountry
        });
        setIsOpenDropdown(false);
    };

    const handleChange = (e: BaseSyntheticEvent) => {
        const targetElementName = e.target.name;

        switch (targetElementName) {
            case 'name': case 'surname': case 'birthDate': case 'teemName': case 'country':
                setEditModeData({
                    ...editModeData,
                    [targetElementName]: e.target.value
                })
                break;
            case 'maleGender':
                setEditModeData({
                    ...editModeData,
                    gender: false
                })
                break;
            case 'femaleGender':
                setEditModeData({
                    ...editModeData,
                    gender: true
                })
                break;
            default:
                break;
        }
    }

    return (
        <div className="edit-card-container">
            <div className="edit-card-row">
                <div className="edit-card-block">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder={props.player.name}
                        value={editModeData.name}
                        onChange={handleChange}
                        maxLength={40}
                        required
                    />
                </div>
                <div className="edit-card-block">
                    <label htmlFor="surname">Фамилия</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder={props.player.surname}
                        value={editModeData.surname}
                        onChange={handleChange}
                        maxLength={40}
                        required
                    />
                </div>
            </div>
            <div className="edit-card-row">
                <div className="edit-card-block" id="form-field-block-birth-date">
                    <label htmlFor="birthDate">Дата рождения</label>
                    <CustomCalendar formData={editModeData} setFormData={setEditModeData} isFormCalendar={false} />
                </div>
                <div className="edit-card-block" id="form-field-block-radio">
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
                                checked={!editModeData.gender}
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
                                checked={editModeData.gender}
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="edit-card-row">
                <TeemNameInputComponent isFormComponent={false} fieldsData={editModeData} setFieldsData={setEditModeData}/>
                <div className="edit-card-block" id="edit-card-block-country">
                    <label htmlFor="country">Страна</label>
                    <div className="edit-select-container" id="country">
                        <div className="edit-dropdown" ref={dropdownRef}>
                            <div className="edit-dropdown-toggle" onClick={() => setIsOpenDropdown((prev) => !prev)}>
                                {editModeData.country}
                            </div>
                            {isOpenDropdown && (
                                <div className="edit-dropdown-menu">
                                    {countries.map((option, index) => (
                                        <div key={index} className="edit-dropdown-item"
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
            <div className="edit-card-row" id="">
                <button className="card-button" id="save-button" onClick={() => props.onSaveClick(editModeData)}
                        disabled={isSaveDisabled}>Сохранить
                </button>
                <button className="card-button" id="cancel-button" onClick={() => props.onCancelClick(false)}>Отменить
                </button>
            </div>
        </div>
    );
}

export default FootballPlayerCardEditMode;
