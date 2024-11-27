import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useShoppingList } from '../contexts/ShoppingListContext';

function ShoppingLists() {
  const { state, dispatch } = useShoppingList();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [expandedList, setExpandedList] = useState<string | null>(null);

  const handleCreateNewList = () => {
    if (newListName.trim()) {
      dispatch({
        type: 'CREATE_LIST',
        payload: { name: newListName },
      });
      setNewListName('');
      setNewListDialogOpen(false);
    }
  };

  const handleDeleteList = (listId: string) => {
    dispatch({
      type: 'DELETE_LIST',
      payload: { listId },
    });
  };

  const handleRemoveProduct = (listId: string, productId: number) => {
    dispatch({
      type: 'REMOVE_FROM_LIST',
      payload: { listId, productId },
    });
  };

  const toggleListExpand = (listId: string) => {
    setExpandedList(expandedList === listId ? null : listId);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Shopping Lists
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewListDialogOpen(true)}
        >
          Create New List
        </Button>
      </Box>

      {state.lists.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              No shopping lists yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Create a new list to start saving products
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {state.lists.map((list) => (
            <Grid item xs={12} key={list.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={() => toggleListExpand(list.id)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        {expandedList === list.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                      <Typography variant="h6">
                        {list.name} ({list.products.length} items)
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => handleDeleteList(list.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Collapse in={expandedList === list.id}>
                    <List>
                      {list.products.map((product, index) => (
                        <React.Fragment key={product.id}>
                          {index > 0 && <Divider />}
                          <ListItem
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleRemoveProduct(list.id, product.id)}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={product.name}
                              secondary={`$${product.price.toFixed(2)}`}
                            />
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={newListDialogOpen} onClose={() => setNewListDialogOpen(false)}>
        <DialogTitle>Create New Shopping List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewListDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateNewList} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ShoppingLists;
