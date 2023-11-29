import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function DeleteConfirmDialog(props) {
  const { onClose, deleteSelected, modelAPI, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    modelAPI.delete(deleteSelected);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Are you certain? This cannot be undone</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

DeleteConfirmDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  deleteSelected: PropTypes.number,
  modelAPI: PropTypes.object.isRequired
};

export default DeleteConfirmDialog;
