import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { deleteItem, updateStatus } from '../../services/api';
import { ItemContext } from '../../ItemContext';
import { EditItemDialog } from '../Dialogs/EditItemDialog';

export const ItemActions = ({ item, anchorEl, setAnchorEl }) => {
  const [openEditDialog, setEditDialog] = React.useState(false);
  const { items, setItems } = React.useContext(ItemContext);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenEditDialog = () => {
    setEditDialog(true);
    handleClose();
  };

  const handleCloseEditDialog = () => {
    setEditDialog(false);
  };

  const handleStatus = async (item, status) => {
    const updatedItem = {
      started: false,
      finished: false,
      important: false,
      canceled: false,
    };

    if (status === 1) updatedItem.started = true;
    if (status === 2) updatedItem.finished = true;
    if (status === 3) updatedItem.important = true;
    if (status === 4) updatedItem.canceled = true;

    const response = await updateStatus(item._id, updatedItem);
    if (response.status === 200) {
      const itemsArray = [...items];

      const itemIndex = itemsArray.findIndex((i) => i._id === item._id);
      itemsArray[itemIndex] = { ...response.data };

      const updatedItems = itemsArray;

      setItems(updatedItems);
      handleClose();
    }
  };

  const handleDelete = async (item) => {
    const response = await deleteItem(item._id);
    if (response.status === 200) {
      const itemsArray = [...items];

      const itemIndex = itemsArray.findIndex((i) => i._id === item._id);

      itemsArray.splice(itemIndex, 1);

      const updatedItems = itemsArray;

      setItems(updatedItems);
      handleClose();
    }
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClickOpenEditDialog(item)}>
          {' '}
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>{' '}
          <ListItemText> Editar </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatus(item, 1)}>
          <ListItemIcon>
            <PlayArrowIcon fontSize="small" />
          </ListItemIcon>{' '}
          <ListItemText> Started </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatus(item, 2)}>
          {' '}
          <ListItemIcon>
            <CheckBoxIcon fontSize="small" />
          </ListItemIcon>{' '}
          <ListItemText> Finished</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleStatus(item, 3)}>
          {' '}
          <ListItemIcon>
            <WarningIcon fontSize="small" />
          </ListItemIcon>{' '}
          <ListItemText> Important</ListItemText>{' '}
        </MenuItem>
        <MenuItem onClick={() => handleStatus(item, 4)}>
          {' '}
          <ListItemIcon>
            <HighlightOffIcon fontSize="small" />
          </ListItemIcon>{' '}
          <ListItemText> Canceled</ListItemText>{' '}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(item)}>
          {' '}
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>{' '}
          <ListItemText> Delete </ListItemText>{' '}
        </MenuItem>
      </Menu>
      <EditItemDialog
        item={item}
        open={openEditDialog}
        onClose={handleCloseEditDialog}
      />
    </>
  );
};
