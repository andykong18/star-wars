import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CharacterList from './CharacterList.js';
import Character from './Character.js'

function CharacterApp() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <h1 className="text-light">Star Wars Character List</h1>
            <CharacterList />
          </Route>
          <Route path="/character/:id">
            <h1 className="text-center text-light">Character Info Page</h1>
            <Character />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default CharacterApp;
