import LoginForm from "./components/LoginForm";
import Button from "./components/Button";
import "./App.css";

function App() {
  return (
    <div class="h-dvh bg-slate-400 flex flex-col items-center justify-center">
      <div>
        <LoginForm />
      </div>
      <div>
        <Button />
      </div>
    </div>
  );
}

export default App;
