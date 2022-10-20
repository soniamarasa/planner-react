import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import { updateItem } from '../../services/api';
import { ThemeContext } from '../../ThemeContext';
import { ItemContext } from '../../ItemContext';
import { Boxes, Types } from '../../helpers/ItemConfig';
import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';

export const EditItemDialog = (props) => {
  const { theme } = React.useContext(ThemeContext);
  const { items, setItems } = React.useContext(ItemContext);
  const { item, onClose, open } = props;
  const box = useForm();
  const type = useForm();
  const description = useForm();
  const obs = useForm();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      description: description.value,
      obs: obs.value,
      where: box.value,
      type: type.value,
    };

    if (description.validate()) {
      const response = await updateItem(item._id, updatedItem);

      if (response.status === 200) {
        const itemsArray = [...items];

        const itemIndex = itemsArray.findIndex((i) => i._id === item._id);
        itemsArray[itemIndex] = { ...response.data };

        const updatedItems = itemsArray;

        setItems(updatedItems);
        handleClose();
      }
    }
  };

  React.useEffect(() => {
    type.setValue(item.type);
    description.setValue(item.description);
    box.setValue(item.where);
    obs.setValue(item.obs);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      className={theme}
    >
      <DialogTitle id="dialog-title">Edit Item</DialogTitle>
      <DialogContent>
        <form className="form-edit">
          <Box width={'100%'}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type.value}
                    onChange={type.onChange}
                    onBlur={type.onBlur}
                    size="small"
                  >
                    {Types.map((type) => (
                      <MenuItem key={type.code} value={type.code}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {box.error && <Error error={box.error} />}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={box.value}
                    onChange={box.onChange}
                    onBlur={box.onBlur}
                    size="small"
                  >
                    {Boxes.map((box) => (
                      <MenuItem key={box.code} value={box.code}>
                        {box.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {box.error && <Error error={box.error} />}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <TextField
                    error
                    required
                    fullWidth
                    type="text"
                    size="small"
                    value={description.value}
                    onChange={description.onChange}
                    onBlur={description.onBlur}
                  />
                  {description.error && <Error error={description.error} />}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <TextField
                    error
                    required
                    fullWidth
                    type="text"
                    size="small"
                    value={obs.value}
                    onChange={obs.onChange}
                    onBlur={obs.onBlur}
                    placeholder="observation"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={Boolean(
            description.error || description.value.length === 0
          )}
          onClick={handleSubmit}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
