import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AppRouter} from "./routing/app-router";
import MainPage from "./pages/main-page/main-page";
import AddingPage from "./pages/adding-page/adding-page";
import DisplayPage from "./pages/display-page/display-page";
import NotFoundPage from "./pages/not-found-page/not-found-page";
import "./pages/adding-page/adding-page-style.css"
import "./pages/main-page/main-page-style.css"
import "./pages/display-page/display-page-style.css"
import "./pages/not-found-page/not-found-page-style.css"
import './general-styles/general-styles.css'
import {useEffect, useState} from "react";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {FootballPlayer} from "./models/football-player";
import {ApiRouter} from "./routing/api-router";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRouter.Main} element={ <MainPage /> }/>
                <Route path={AppRouter.Adding} element={ <AddingPage /> }/>
                <Route path={AppRouter.Display} element={ <DisplayPage /> }/>
                <Route path={AppRouter.NotFound} element={ <NotFoundPage /> } />
            </Routes>
      </BrowserRouter>
  );
}
export default App;
