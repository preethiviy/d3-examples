import BarChart from "./components/d3/BarChart";
import Smiley from "./components/svg/Smiley";

function App() {
  return (
    <main className="p-5 flex flex-col gap-5">
      <Smiley />
      <BarChart />
    </main>
  );
}

export default App;
