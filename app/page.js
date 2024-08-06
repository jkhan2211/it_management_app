"use client"; // Ensure this is the first line in the file

import { useState, useEffect } from 'react';
import { firestore, storage } from '@/firebase'; // Import storage for Firebase Storage
import { Box, Typography, Stack, Button, Container, TextField } from '@mui/material';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage'; // Import storage functions
import InventoryItem from './components/InventoryItem';
import AddItemModal from './components/AddItemModal';
import PieChartComponent from './components/PieChartComponent';
import Navbar from './components/Navbar';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item, imageUrl) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    const itemData = { quantity: 1 }; // Default value for quantity
    
    if (!docSnap.exists()) {
      if (imageUrl) {
        itemData.imageUrl = imageUrl;
      }
      await setDoc(docRef, itemData);
    } else {
      const existingQuantity = (await docSnap.data()).quantity || 0;
      await setDoc(docRef, { quantity: existingQuantity + 1 }, { merge: true });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity, imageUrl } = docSnap.data();
      if (quantity === 1) {
        if (imageUrl) {
          try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.error("Error deleting image from Firebase Storage:", error);
          }
        }
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const updateQuantity = async (name, newQuantity) => {
    const docRef = doc(collection(firestore, 'inventory'), name);
    await setDoc(docRef, { quantity: newQuantity }, { merge: true });
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Navbar />
      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly lighter background for contrast
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 4,
          padding: 4,
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <AddItemModal open={open} handleClose={handleClose} addItem={addItem} />

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              padding: '8px 16px',
              fontSize: '0.875rem',
              margin: '20px 0',
            }}
          >
            Add New Item
          </Button>
        </Box>

        <TextField
          label="Search Items"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{ margin: '20px 0' }}
        />

        <Box
          width="100%"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          mb={2}
        >
          <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
            IT Inventory Items
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box sx={{ flex: 2 }}>
            <Stack spacing={2}>
              {filteredInventory.map(({ name, quantity, imageUrl }) => (
                <InventoryItem
                  key={name}
                  name={name}
                  quantity={quantity}
                  imageUrl={imageUrl}
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PieChartComponent inventory={filteredInventory} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
