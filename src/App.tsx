import './App.css'
import Home from "./components/Home.tsx";
import Sunset from "./assets/sunset.svg";
import Work from "./components/Work.tsx";

function App() {
  return (
      <div>
        <div className="relative min-h-screen">
          <Home/>
          <img className="absolute bottom-0 w-screen" src={Sunset} alt="sunset" />
        </div>
          <Work/>
      </div>
  )
}

export default App
