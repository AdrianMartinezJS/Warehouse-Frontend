import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import HomePage from './pages/HomePage.jsx'
import Savecocktail from './pages/SaveCocktail.jsx'
import UpdateCocktail from './pages/UpdateCocktail.jsx'
import Connect from './pages/Connect.jsx'



function App() {

  let routes;
  const token = sessionStorage.getItem('token')


  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Savecocktail" component={Savecocktail} />
        <Route path="/UpdateCocktail" component={UpdateCocktail} />
        <Route path="/Connect" component={Connect} />
      </Switch>
    )

  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
      </Switch>

    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        {routes}
      </div>
    </BrowserRouter>);
}

export default App;