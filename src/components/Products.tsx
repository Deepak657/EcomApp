import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { useGSelector } from '../redux/store';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/ProductAction';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const products = useGSelector((state) => state.productState.products);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editProduct = (productId: number) => {
        navigate(`/create-product/${productId}`);
    };

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <List>
            {products.map(product =>
                <ListItem key={product.id}>
                    <ListItemText
                        primary={product.name}
                        secondary={product.description}
                    />

                    <ListItemSecondaryAction>
                        <IconButton onClick={() => editProduct(product.id)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => handleDeleteProduct(product.id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        </List>
    );
};

export default Products;