import 'normalize.css'
import './style.scss'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './components/Main';

function App() {

  return (
    <div className="separator">
      <Sidebar />
      <div className="wrapper">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
