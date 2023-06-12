import 'normalize.css'
import './style.scss'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Sidebar />
    </>
  );
}

export default App;
