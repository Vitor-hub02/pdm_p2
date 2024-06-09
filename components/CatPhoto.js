import React, { useState, useEffect } from 'eact';
import { View, Image, Button, StyleSheet } from 'eact-native';
import axios from 'axios';

const CatPhoto = () => {
  const [catPhoto, setCatPhoto] = useState(null);
  const [catPhotos, setCatPhotos] = useState([]); // novo estado para armazenar as fotos

  useEffect(() => {
    fetchCatPhoto();
  }, []);

  const fetchCatPhoto = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      setCatPhoto(response.data[0].url);
      setCatPhotos([...catPhotos, response.data[0].url]); // adiciona a foto à lista de fotos
    } catch (error) {
      console.error('Não conseguimos buscar nenhuma foto de gato:', error);
    }
  };

  const handleButtonPress = async () => {
    try {
      const responses = await Promise.all(Array(5).fill(0).map(() => axios.get('https://api.thecatapi.com/v1/images/search')));
      const newPhotos = responses.map(response => response.data[0].url);
      setCatPhotos([...catPhotos,...newPhotos]); // adiciona as novas fotos à lista de fotos
    } catch (error) {
      console.error('Não conseguimos buscar novas fotos de gato:', error);
    }
  };

  return (
    <View style={styles.container}>
      {catPhoto && <Image source={{ uri: catPhoto }} style={styles.image} />}
      {catPhotos.map((photo, index) => (
        <Image key={index} source={{ uri: photo }} style={styles.image} />
      ))}
      <Button title="Aperte para visualizar mais fotos de gato" onPress={handleButtonPress} />
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