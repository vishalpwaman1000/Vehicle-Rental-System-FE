import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import AdminDashboard from "./components/dashboard/adminDashboard/AdminDashboard";
import UserDashboard from "./components/dashboard/userDashboard/UserDashboard";

function App() {
  return (
    <div className="App h-100 w-100">
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/AdminDashboard" component={AdminDashboard} />
          <Route exact path="/UserDashboard" component={UserDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
