import { useState } from 'react';
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material';

const AddItemModal = ({ open, handleClose, addItem }) => {
  const [itemName, setItemName] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for the image URL input

  const handleAddItem = () => {
    if (!itemName || !imageUrl) {
      alert("Please provide both item name and image URL.");
      return;
    }
    
    // Call addItem with the provided itemName and imageUrl
    addItem(itemName, imageUrl);
    setItemName('');
    setImageUrl(''); // Clear the image URL
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Item
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            label="Image URL (Freepik)"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {/* Display the image preview if a valid URL is provided */}
          {imageUrl && (
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: 1,
                mt: 2,
              }}
            >
              <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%' }} />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
