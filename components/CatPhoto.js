import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CatPhoto = () => {
  const [catPhotos, setCatPhotos] = useState([]);

  useEffect(() => {
    fetchCatPhotos();
  }, []);

  const fetchCatPhotos = async () => {
    try {
      const responses = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
      const newPhotos = responses.data.map(photo => photo.url);
      setCatPhotos(newPhotos);
    } catch (error) {
      console.error('Erro ao buscar fotos de gatos:', error);
    }
  };

  const handleButtonPress = async () => {
    try {
      const responses = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
      const newPhotos = responses.data.map(photo => photo.url);
      setCatPhotos([...catPhotos, ...newPhotos]);
    } catch (error) {
      console.error('Erro ao buscar novas fotos de gatos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {catPhotos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.image} />
        ))}
      </ScrollView>
      <Button title="Mais Fotos de Gato" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
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