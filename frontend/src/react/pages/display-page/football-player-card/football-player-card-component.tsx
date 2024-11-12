import React from "react";
import {FootballPlayer} from "../../../models/football-player";
import FootballPlayerCardDisplayMode from "./football-player-card-display-mode";
import FootballPlayerCardEditMode from "./football-player-card-edit-mode";

function FootballPlayerCardComponent(props: {
    footballPlayer: FootballPlayer,
    onSaveChangeClick: (player: FootballPlayer) => void,
    onDeleteClick: (id: number) => void
}) {
    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const handleEditModeClick = (value: boolean) => {
        setIsEditing(value);
    }

    const handleSaveClick = (player: FootballPlayer) => {
        props.onSaveChangeClick(player);
        setIsEditing(false);
    }

    return (
        <div>
            { isEditing ? (
                <FootballPlayerCardEditMode
                    player={ props.footballPlayer }
                    onCancelClick={handleEditModeClick}
                    onSaveClick={ handleSaveClick }
                />
            ) : (
                <FootballPlayerCardDisplayMode
                    player={ props.footballPlayer }
                    onEditModeClick={handleEditModeClick}
                    onDeleteClick={ props.onDeleteClick }
                />
            )}
        </div>
    );
}

export default FootballPlayerCardComponent;