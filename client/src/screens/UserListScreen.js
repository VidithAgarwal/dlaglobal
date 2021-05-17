import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { listUsers, deleteUser } from '../actions/userActions';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

export const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(
		() => {
			if (userInfo && userInfo.isAdmin) {
				dispatch(listUsers());
			}
			else {
				history.push('/login');
			}
		},
		[
			dispatch,
			history,
			userInfo,
			successDelete
		]
	);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteUser(id));
		}
	};
	return (
		<React.Fragment>
			<h1>Users</h1>
			{
				loading ? <Loader /> :
				error ? <Message variant='danger'>{error}</Message> :
				<Table responsive striped bordered hover className='table-sm'>
					<thead>
						<tr>
							<td>ID</td>
							<td>NAME</td>
							<td>EMAIL</td>
							<td>ADMIN</td>
							<td />
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{
										user.isAdmin ? <i className='fas fa-check' style={{ color: 'green' }} /> :
										<i className='fas fa-times' style={{ color: 'red' }} />}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit' />
										</Button>
									</LinkContainer>
									<Button
										className='btn-sm'
										variant='danger'
										onClick={() => {
											deleteHandler(user._id);
										}}>
										<i className='fas fa-trash' />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>}
		</React.Fragment>
	);
};