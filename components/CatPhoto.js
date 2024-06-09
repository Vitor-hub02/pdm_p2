import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CatPhoto = () => {
  const [catPhoto, setCatPhoto] = useState(null);

  useEffect(() => {
    fetchCatPhoto();
  }, []);

  const fetchCatPhoto = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      setCatPhoto(response.data[0].url);
    } catch (error) {
      console.error('Não conseguimos buscar nenhuma foto de gato:', error);
    }
  };

  return (
    <View style={styles.container}>
      {catPhoto && <Image source={{ uri: catPhoto }} style={styles.image} />}
      <Button title="Aperte para visualizar fotos de gato" onPress={fetchCatPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default CatPhoto;
