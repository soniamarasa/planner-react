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
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import { newItem } from '../../services/api';
import { ItemContext } from '../../ItemContext';
import { ThemeContext } from '../../ThemeContext';
import { Boxes, Types } from '../../helpers/ItemConfig';
import Error from '../../helpers/Error';
import useForm from '../../hooks/UseForm';

export const NewItemDialog = (props) => {
  const { items, setItems } = React.useContext(ItemContext);
  const [boxes, setBoxes] = React.useState([]);
  const [clicked, setClicked] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);
  const { onClose, open } = props;

  const type = useForm();
  const description = useForm();
  const obs = useForm();

  const handleClose = () => {
    onClose();
    setClicked(false);
    setBoxes([]);
    type.setValue('task');
    description.setValue('');
    obs.setValue('');
  };

  const handleChangeBox = (event) => {
    setBoxes(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    let item = {
      description: description.value,
      obs: obs.value,
      where: boxes,
      type: type.value,
    };

    if (description.validate() && boxes.length) {
      const response = await newItem(item);
      if (response.status === 200) {
        const newArray = [...items];
        newArray.push(...response.data);
        setItems(newArray);
        handleClose();
      }
    }
  };

  React.useEffect(() => {
    type.setValue('task');
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
                  {type.error && <Error error={type.error} />}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    displayEmpty
                    id="demo-simple-select"
                    multiple
                    value={boxes}
                    onChange={handleChangeBox}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select...</em>;
                      }
                      return selected.join(', ');
                    }}
                    size="small"
                  >
                    {Boxes.map((box) => (
                      <MenuItem
                        disabled={Boolean(
                          (box.code === 'notes' && type.value !== 'note') ||
                            (box.code === 'todo' && type.value !== 'task')
                        )}
                        key={box.code}
                        value={box.code}
                      >
                        <Checkbox checked={boxes.indexOf(box.code) > -1} />
                        <ListItemText primary={box.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {!boxes.length && clicked && (
                    <Error error={'Required Field.'} />
                  )}
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
