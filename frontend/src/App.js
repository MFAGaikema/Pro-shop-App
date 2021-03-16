import Header from './components/Header'
import Footer from './components/Footer'
import Homescreen from './screens/Homescreen'
import Productscreen from './screens/Productscreen'
import CartScreen from './screens/CartScreen'

import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => {
  return (
      <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path ='/' component={Homescreen}/>
          <Route path="/product/:id" component={Productscreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
        </Container>
      </main>
      <Footer />
      </Router>
  );
}

export default App;
