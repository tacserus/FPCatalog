This is a solo project on the theme of the catalog of football players

This web application uses technology:
* C# (.NET 8)
* AspNetCore (Mvc, SignalR)
* Postgres
* React (typescript, css)
* git

It consists of two components: 
1) backend:
The server part, where interaction with the database is written through controllers and the distribution of added football players to all clients
2) frontend:
The client part, where all the necessary layout is written. It consists of 3 parts: 
* main page: there are 2 buttons here that lead to the pages for showing and adding players 
* adding page: there are also 2 buttons on this page to go to the main page and to the viewing page, but in addition there is a form for creating a new player
* display page: There are also 2 buttons on this page to go to the main page and to the add page, but in addition there is a scrollable list of players that can be edited and deleted
(not found page: in the case of an unknown path)