import React, { useEffect, useRef, useState } from 'react';
import {FootballPlayer} from "../models/football-player";

function CustomCalendar(props: {
    formData: FootballPlayer,
    setFormData: (value: (((prevState: FootballPlayer) => FootballPlayer) | FootballPlayer)) => void,
    isFormCalendar: boolean
}) {

    const months = Array.from({ length: 12 },
        (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
    const years = Array.from({ length: 125 }, (_, i) => `${1900 + i}`);

    const date = new Date();
    const [currentDate, setCurrentDate] = useState<Date>(date);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isButtonsDisabled, setIsButtonsDisabled] = useState<[boolean, boolean]>([false, false]);
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean[]>([false, false]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const calendarRef = useRef<HTMLDivElement | null>(null);

    const renderCalendar = () => {
        const monthDays: JSX.Element[] = [];
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Пустые ячейки до первого дня месяца
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            monthDays.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        // Дни месяца
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            monthDays.push(
                <div key={day} className="day" onClick={() => handleDateClick(day)}>
                    {day}
                </div>
            );
        }

        return monthDays;
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleDateClick = (day: number) => {
        const formattedDate =
            `${day.toString().padStart(2, '0')}.`  +
            `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.`  +
            `${currentDate.getFullYear()}`;
        props.setFormData({
            ...props.formData,
            'birthDate': `${formattedDate}`
        });
        setIsOpen(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current!!.contains(event.target as Node)) {
            setIsOpen(false);
            setIsOpenDropdown([false, false]);
        }
    };

    const changeMonth = (direction: number) => {
        const newDate = new Date(currentDate);
        console.log(newDate.getMonth() + direction);
        newDate.setMonth(newDate.getMonth() + direction);

        checkDisabled(newDate);
        setCurrentDate(newDate);
    };

    const checkDisabled = (newDate: Date) => {
        if (newDate.getFullYear() === 1900 && newDate.getMonth() === 0) {
            setIsButtonsDisabled([true, false]);
            return;
        }

        if (newDate.getFullYear() === 2024 && newDate.getMonth() === 11) {
            setIsButtonsDisabled([false, true]);
            return;
        }

        setIsButtonsDisabled([false, false]);
    }



    const handleDropdownYearSelected = (year: string) => {
        const newYear = parseInt(year);
        const newDate = new Date(newYear, currentDate.getMonth(), 1);
        checkDisabled(newDate);
        setCurrentDate(newDate);
        setIsOpenDropdown([false, false]);
    }

    const handleDropdownMonthSelected = (month: string) => {
        const newMonth = months.indexOf(month);
        const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
        checkDisabled(newDate);
        setCurrentDate(newDate);
        setIsOpenDropdown([false, false]);
    };

    const handleToggle = (isFirstToggle: boolean) => {
        if (isFirstToggle) {
            setIsOpenDropdown((prev) => [!prev[0], false]);
            return;
        }

        setIsOpenDropdown((prev) => [false, !prev[1]]);
    };

    return (
        <div className="custom-date-picker" ref={calendarRef}>
            <input
                type="text"
                value={props.formData.birthDate}
                name="birthDate"
                className="custom-date-input"
                placeholder="Выберите дату"
                readOnly
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <div className={props.isFormCalendar ? "calendar" : "edit-calendar"}>
                    <div className="calendar-header">
                        <button type="button" onClick={() => changeMonth(-1)} disabled={isButtonsDisabled[0]}>
                            &lt;
                        </button>
                        <div className="select-header">
                            <div className="select-container">
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="dropdown-toggle" onClick={() => handleToggle(true)}>
                                        {currentDate.toLocaleString('default', { month: 'long'})}
                                    </div>
                                    {isOpenDropdown[0] && (
                                        <div className="dropdown-menu">
                                            {months.map((option, index) => (
                                                <div key={index} className="dropdown-item"
                                                     onClick={() => handleDropdownMonthSelected(option)}>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="select-container">
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="dropdown-toggle" onClick={() => handleToggle(false)}>
                                        {currentDate.getFullYear()}
                                    </div>
                                    {isOpenDropdown[1] && (
                                        <div className="dropdown-menu">
                                            {years.map((option, index) => (
                                                <div key={index} className="dropdown-item"
                                                     onClick={() => handleDropdownYearSelected(option)}>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={() => changeMonth(1)} disabled={isButtonsDisabled[1]}>
                            &gt;
                        </button>
                    </div>
                    <div className="calendar-days">
                        {renderCalendar()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomCalendar;