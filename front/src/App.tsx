import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import "./App.scss";

const axios = require('axios').default;

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName='haha'>About</NavLink>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return <h2>Home</h2>;
};

interface Dog {
  id: number,
  name: string,
  age: number
}
interface Props {}
interface State {
  dogs: Dog[]
}

class About extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { dogs: [] };
  }
  componentDidMount() {
    axios.get('http://localhost:3040/api/v1/dogs').then((res: any) => {
      this.setState({dogs: res.data});
    });
  }
  render() {
    return (
      <div>
        <h2>About</h2>
        <ul>
          {this.state.dogs.map((dog)=>{
            return (
              <div key={dog.id}>
                <h1>{dog.name}</h1>
                <p>{dog.age}</p>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const Topics: React.FC = () => {
  const match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
};

const Topic: React.FC = () => {
  const { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
};

export default App;