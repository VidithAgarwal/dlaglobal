import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { UserListScreen } from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import { ProductListScreen } from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import { OrderListScreen } from './screens/OrderListScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payments' component={PaymentScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/admin/orderlist' component={OrderListScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/' component={HomeScreen} exact />
					<Route path='/search/:keyword' component={HomeScreen} exact />
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					<Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditScreen} />
					<Route path='/admin/product/:id/edit' component={ProductEditScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/admin/productlist' component={ProductListScreen} exact />
					<Route path='/admin/productlist/page/:pageNumber' component={ProductListScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;