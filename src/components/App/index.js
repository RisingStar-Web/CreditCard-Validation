import Header from "../Header";
import Card from "../Card";
import "./index.css";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex w-full h-full justify-center items-center px-8">
        <Card />
      </div>
    </div>
  );
}

export default App;
