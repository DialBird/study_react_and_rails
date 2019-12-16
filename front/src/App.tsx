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
import firebase from './config/firebase';
import './App.scss';

const axios = require('axios').default;

interface Props {};
interface State {
  email: string,
  password: string
};
class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleSignUp = (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      this.setState({email: '', password: ''});
    }).catch(error => {
      console.log(error);
    })
  };
  render() {
    return (
      <div>
        <form>
          <input type="email" placeholder='email' onChange={e => this.setState({email: e.target.value})} />
          <input type="password" placeholder='password' onChange={e => this.setState({password: e.target.value})} />
          <button onClick={e => this.handleSignUp(e)}>Signup</button>
        </form>
      </div>
    );
  }
};
// const App: React.FC = () => {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/about" activeClassName='haha'>About</NavLink>
//             </li>
//             <li>
//               <Link to="/topics">Topics</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/topics">
//             <Topics />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

const Home: React.FC = () => {
  return <h2>Home</h2>;
};

// interface Dog {
//   id: number,
//   name: string,
//   age: number
// }
// interface Props {}
// interface State {
//   dogs: Dog[]
// }

// class About extends React.PureComponent<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = { dogs: [] };
//   }
//   async componentDidMount() {
//     try {
//       const res = await axios.get('http://localhost:3040/api/v1/dogs');
//       this.setState({dogs: res.data});
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   render() {
//     return (
//       <div>
//         <h2>About</h2>
//         <ul>
//           {this.state.dogs.map((dog)=>{
//             return (
//               <div key={dog.id}>
//                 <h1>{dog.name}</h1>
//                 <p>{dog.age}</p>
//               </div>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   }
// }

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