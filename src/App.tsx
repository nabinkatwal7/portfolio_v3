import "./App.css";
import Home from "./components/Home.tsx";
import Sunset from "./assets/sunset.svg";
import Work from "./components/Work.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <div className="pb-10">
      <div className="relative min-h-screen">
        <Home />
        <img className="absolute bottom-0 w-screen" src={Sunset} alt="sunset" />
      </div>
      <Work />
      <Footer />
    </div>
  );
}

export default App;
