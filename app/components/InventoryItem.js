"use client";
import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import Add Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon
import Image from 'next/image';
import styles from './styles.module.css';

const InventoryItem = ({ name, quantity, imageUrl, removeItem, updateQuantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity); // Manage quantity state

  const incrementQuantity = async () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    await updateQuantity(name, newQuantity); // Notify parent to update Firestore
  };

  const handleRemove = async () => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      setCurrentQuantity(newQuantity);
      await updateQuantity(name, newQuantity); // Notify parent to update Firestore
    } else {
      await removeItem(name); // Remove item if quantity is 0
    }
  };

  return (
    <Box
      className={styles.inventoryItem}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: '#f9f9f9',
        gap: 2, // Space between elements
        mb: 2, // Margin bottom for spacing between items
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          overflow: 'hidden',
          boxShadow: 1,
        }}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
            layout="intrinsic"
          />
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 1, // Space between text elements
        }}
      >
        <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
        <Typography variant={'body1'} color="textSecondary">
          Quantity: {currentQuantity}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={incrementQuantity}
          sx={{
            minWidth: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AddIcon />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemove}
          sx={{
            minWidth: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default InventoryItem;
