import {Link} from 'react-router-dom';
import {AppRouter} from "../../routing/app-router";
import ScrollFootballPlayerContainerComponent from "./scroll-football-player-container-component";
import {useEffect, useState} from "react";
import {FootballPlayer} from "../../models/football-player";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {ApiRouter} from "../../routing/api-router";


function DisplayPage() {
    const [players, setPlayers] = useState<FootballPlayer[]>([]);
    const [isReceived, setIsReceived] = useState<boolean>(false);

    useEffect(() => {
        if (!isReceived) {
            fetch(ApiRouter.GetPlayers, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    const playersData: FootballPlayer[] = data['players'];
                    setPlayers(playersData);
                })
                .catch(err =>
                    console.error('Ошибка при получении игроков:', err)
                );

            setIsReceived(true);
        }
    }, [isReceived]);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(ApiRouter.PlayerHub)
            .withAutomaticReconnect()
            .build();

        connection.on('ReceivePlayer', (newPlayer) => {
            setPlayers(prevObjects => [...prevObjects, newPlayer['createdPlayer'] as FootballPlayer]);
        });

        connection.start()
            .then(() => console.log('Connected to SignalR'))
            .catch(err => console.error('Error connecting to SignalR', err));

        return () => {
            connection.stop();
        };
    });

    return (
        <div className="page-background">
          <div className="child-page-block">
              <div className="title-block">
                  <h2 className="child-page-title">Страница просмотра и изменения игроков каталога</h2>
              </div>
              <div className="child-link-container">
                  <Link className="child-link" to={AppRouter.Main} title={AppRouter.Main}>
                      <div className="link-text-container">
                          <strong>Вернуться на главную страницу</strong>
                      </div>
                  </Link>
                  <Link className="child-link" to={AppRouter.Adding} title={AppRouter.Adding}>
                      <div className="link-text-container">
                          <strong>Добавить футбольного игрока</strong>
                      </div>
                  </Link>
              </div>
          </div>
          <ScrollFootballPlayerContainerComponent
              players={players}
              setPlayers={setPlayers}
          />
        </div>
    );
}

export default DisplayPage;
