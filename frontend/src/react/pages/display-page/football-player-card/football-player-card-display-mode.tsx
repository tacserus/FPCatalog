import React from "react";
import {FootballPlayer} from "../../../models/football-player";

function FootballPlayerCardDisplayMode(props: {
    player: FootballPlayer,
    onEditModeClick: (a: boolean) => void,
    onDeleteClick: (id: number) => void
}) {
    const [year, month, day] = props.player.birthDate.split('-');
    const formattedBirthDate = `${day}.${month}.${year}`;

    return (
        <div className="display-card-container">
            <div className="display-card-row" id="display-name">
                <div className="display-name-field">
                    <p className="display-name">{props.player.name}</p>
                    <p className="display-surname"> {props.player.surname}</p>
                </div>
            </div>
            <div className="display-card-row">
                <div className="display-field">
                    <p>Пол: {props.player.gender ? 'Женщина' : 'Мужчина'}</p>
                </div>
                <div className="display-field">
                    <p>Дата рождения: {formattedBirthDate}</p>
                </div>
            </div>
            <div className="display-card-row">
                <div className="display-field">
                    <p>Название команды: {props.player.teemName}</p>
                </div>
                <div className="display-field">
                    <p>Страна: {props.player.country}</p>
                </div>
            </div>
            <div className="display-card-row" id="display-buttons">
                <button className="card-button" id="display-edit-button" onClick={() => props.onEditModeClick(true)}>Редактировать</button>
                <button className="card-button" id="display-delete-button" onClick={() => props.onDeleteClick(props.player.id)}>Удалить</button>
            </div>
        </div>
    );
}

export default FootballPlayerCardDisplayMode;