import {Link} from 'react-router-dom';
import {AppRouter} from '../../routing/app-router';

function MainPage() {
  return (
      <div className="page-background">
          <div className="main-page-block">
              <div className="title-block">
                  <h2 className="main-page-title">Добро пожаловать в каталог футбольных игроков!</h2>
              </div>
              <div className="link-container">
                  <Link className="main-link" to={AppRouter.Adding} title={AppRouter.Adding}>
                      <div className="link-text-container">
                          <strong>Добавить футбольного игрока</strong>
                      </div>
                  </Link>
                  <Link className="main-link" to={AppRouter.Display} title={AppRouter.Display}>
                      <div className="link-text-container">
                          <strong>Просмотреть футбольных игроков</strong>
                      </div>
                  </Link>
              </div>
          </div>
      </div>
  );
}

export default MainPage;
