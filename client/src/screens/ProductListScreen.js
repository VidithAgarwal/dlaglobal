import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export const ProductListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const pageNumber = match.params.pageNumber;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading : loadingCreate,
		error   : errorCreate,
		success : successCreate,
		product : createdProduct
	} = productCreate;

	useEffect(
		() => {
			dispatch({ type: PRODUCT_CREATE_RESET });
			if (!userInfo.isAdmin) {
				history.push('/login');
			}

			if (successCreate) {
				history.push(`/admin/product/${createdProduct._id}/edit`);
			}
			else {
				dispatch(listProducts('', pageNumber));
			}
		},
		[
			dispatch,
			history,
			userInfo,
			successDelete,
			successCreate,
			createdProduct,
			pageNumber
		]
	);

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};
	return (
		<React.Fragment>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus' /> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}

			{
				loading ? <Loader /> :
				error ? <Message variant='danger'>{error}</Message> :
				<React.Fragment>
					<Table responsive striped bordered hover className='table-sm'>
						<thead>
							<tr>
								<td>ID</td>
								<td>NAME</td>
								<td>PRICE</td>
								<td>CATEGORY</td>
								<td>BRAND</td>
								<td />
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit' />
											</Button>
										</LinkContainer>
										<Button
											className='btn-sm'
											variant='danger'
											onClick={() => {
												deleteHandler(product._id);
											}}>
											<i className='fas fa-trash' />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</React.Fragment>}
		</React.Fragment>
	);
};
