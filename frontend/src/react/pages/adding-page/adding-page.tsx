import {Link} from 'react-router-dom';
import {AppRouter} from "../../routing/app-router";
import {FormComponent} from "./form-component";

function AddingPage() {
  return (
      <div className="page-background">
          <div className="child-page-block">
              <div className="title-block">
                  <h2 className="child-page-title">Страница добавления новых игроков</h2>
              </div>
              <div className="child-link-container">
                  <Link className="child-link" to={AppRouter.Main} title={AppRouter.Main}>
                      <div className="link-text-container">
                          <strong>Вернуться на главную страницу</strong>
                      </div>
                  </Link>
                  <Link className="child-link" to={AppRouter.Display} title={AppRouter.Display}>
                      <div className="link-text-container">
                          <strong>Просмотреть футбольных игроков</strong>
                      </div>
                  </Link>
              </div>
              <FormComponent/>
          </div>
      </div>
  );
}

export default AddingPage;
