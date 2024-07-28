import AddNew from "./AddNew";
import "./Styles/App.css";
import CartoonList from "./CartoonList";
import Description from "./Description";

function App() {
  return (
    <>
      <Description />
      <AddNew />
      <CartoonList />
      <footer> Owned by Kaća and Marko </footer>
    </>
  );
}

export default App;
