import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productCreateReducer,
	productDeleteReducer,
	productDetailReducer,
	productListReducer,
	productReviewCreateReducer,
	productTopRatedReducer,
	productUpdateReducer
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	ordersListMyReducer,
	orderPayReducer,
	ordersListReducer,
	orderDeliverReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
	productList         : productListReducer,
	productDetails      : productDetailReducer,
	productDelete       : productDeleteReducer,
	productCreate       : productCreateReducer,
	productUpdate       : productUpdateReducer,
	productReviewCreate : productReviewCreateReducer,
	productTopRated     : productTopRatedReducer,
	cart                : cartReducer,
	userLogin           : userLoginReducer,
	userRegister        : userRegisterReducer,
	userDetails         : userDetailsReducer,
	userUpdateProfile   : userUpdateProfileReducer,
	userList            : userListReducer,
	userDelete          : userDeleteReducer,
	userUpdate          : userUpdateReducer,
	orderCreate         : orderCreateReducer,
	orderDetails        : orderDetailsReducer,
	orderPay            : orderPayReducer,
	ordersListMy        : ordersListMyReducer,
	ordersList          : ordersListReducer,
	orderDeliver        : orderDeliverReducer
});

const cartItemsFromStorage =
	localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :
	[];

const userInfoFromStorage =
	localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :
	null;

const shippingAdrressFromStorage =
	localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :
	{};

const middleware = [
	thunk
];

const initialState = {
	cart      : {
		cartItems       : cartItemsFromStorage,
		shippingAddress : shippingAdrressFromStorage
	},
	userLogin : {
		userInfo : userInfoFromStorage
	}
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
