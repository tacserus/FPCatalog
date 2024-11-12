import {Link} from 'react-router-dom';
import {AppRouter} from '../../routing/app-router';

function NotFoundPage() {
  return (
      <div className="not-found-block">
          <h2 className="not-found-title">404 Not Found</h2>
          <Link className="child-link" id="not-found-link" to={AppRouter.Main} title={AppRouter.Main}>
              <div className="link-text-container">
                  <strong>Вернуться на главную страницу</strong>
              </div>
          </Link>
      </div>
  );
}

export default NotFoundPage;
