import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { listOrders } from '../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

export const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const ordersList = useSelector((state) => state.ordersList);
	const { loading, error, orders } = ordersList;

	useEffect(
		() => {
			if (userInfo && userInfo.isAdmin) {
				dispatch(listOrders());
			}
			else {
				history.push('/login');
			}
		},
		[
			dispatch,
			history,
			userInfo
		]
	);

	return (
		<React.Fragment>
			<h1>Orders</h1>
			{
				loading ? <Loader /> :
				error ? <Message variant='danger'>{error}</Message> :
				<Table responsive striped bordered hover className='table-sm'>
					<thead>
						<tr>
							<td>ID</td>
							<td>USER</td>
							<td>DATE</td>
							<td>TOTAL PRICE</td>
							<td>PAID</td>
							<td>DELIVERED</td>
							<td />
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{
										order.isPaid ? order.paidAt.substring(0, 10) :
										<i className='fas fa-times' style={{ color: 'red' }} />}
								</td>
								<td>
									{
										order.isDelivered ? order.deliveredAt.substring(0, 10) :
										<i className='fas fa-times' style={{ color: 'red' }} />}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>}
		</React.Fragment>
	);
};
