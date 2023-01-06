import './App.css';
import Footer from './components/Footer';
import List2 from './components/List2';


function App() {

  return (
    <div className="App">
      <List2 className="pt-[33vh]"
        title="tags"
        param="tags"
        color="orange"
        solid={true} />
      <List2 className="pt-[33vh]" title="categories" param="categories" color="indigo" solid={true} />
      <List2 className="pt-[33vh]" title="colors" param="colors" color="green" solid={false} />

      <Footer className="max-h-[10vh] absolute bottom-0" />

    </div >
  );
}

export default App;
