
import { Navbar } from "components/Chat/navbar/Navbar";
import { HomePage } from "pages/HomePage";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { Switch, Route } from 'react-router-dom'


function App() {


 



  return (
    <div>
      <Navbar  />
      <Switch>
        <Route exact path="/" component={HomePage}  />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;

