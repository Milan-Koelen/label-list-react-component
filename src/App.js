import './App.css';
import Footer from './components/Footer';
import List from './components/List';


function App() {

  return (
    <div className="App">
      <List className="pt-[33vh]"
        title="tags"
        param="tags"
        color="red"
        solid={true} />
      <List className="pt-[33vh]" title="categories" param="categories" color="indigo" solid={true} />
      <List className="pt-[33vh]" title="colors" param="colors" color="green" solid={false} />

      <Footer className="max-h-[10vh] absolute bottom-0" />

    </div >
  );
}

export default App;
