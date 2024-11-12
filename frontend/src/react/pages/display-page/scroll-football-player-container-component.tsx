import React from "react";
import {ApiRouter} from "../../routing/api-router";
import {FootballPlayer} from "../../models/football-player";
import FootballPlayerCardComponent from "./football-player-card/football-player-card-component";

function ScrollFootballPlayerContainerComponent(props: {
    players: FootballPlayer[],
    setPlayers: (value: (((prevState: FootballPlayer[]) => FootballPlayer[]) | FootballPlayer[])) => void
}) {
    const handleSaveChangeClick = (player: FootballPlayer) => {
        console.log(player);
        fetch(ApiRouter.Edit, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(player),
        })
            .then(response => response.json())
            .then(data => {
                props.setPlayers(props.players.map(p => (p.id === player.id ? data['player'] : p)));
            })
            .catch(err =>
                console.error('Ошибка при редактировании игрока:', err)
        );
    };

    const handleDeleteClick = (id: number) => {
        fetch(ApiRouter.Delete, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Id: id })
            })
            .then(response => response)
            .then(() => {
                props.setPlayers(props.players.filter(player => player.id !== id));
            })
            .catch(err =>
                console.error('Ошибка при удалении игрока:', err)
            );
    };

    return (
        <div className="scroll-container">
            {
                props.players.map((player, index) => (
                    <FootballPlayerCardComponent
                        key={index}
                        footballPlayer={player}
                        onSaveChangeClick={handleSaveChangeClick}
                        onDeleteClick={handleDeleteClick}
                    />
                ))
            }
            {props.players.length === 0 && <p className="empty-list">
                Пока нет игроков в каталоге, но вы всегда можете их добавить
            </p>}
        </div>
    );
}

export default ScrollFootballPlayerContainerComponent;