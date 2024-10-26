import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import Asteroid from './components/Asteroid';

export default function App() {
  const [asteroidId, setAsteroidId] = useState('');
  const [asteroidData, setAsteroidData] = useState(null);

  const handleAsteroidData = (data) => {
    setAsteroidData(data);
  };

  return (
    <ImageBackground
      source={require('./assets/Space_img.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {!asteroidData ? (
          <>
            <Text style={styles.heading}>Asteroid Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Search Here"
              placeholderTextColor="#aaa"
              value={asteroidId}
              onChangeText={setAsteroidId}
            />
            <Asteroid
              asteroidId={asteroidId}
              setAsteroidId={setAsteroidId}
              setAsteroidData={handleAsteroidData}
            />
          </>
        ) : (
          <View style={styles.asteroidInfo}>
            <Text style={styles.title}>{asteroidData.name}</Text>
            <Text style={styles.infoText}>NASA JPL URL: {asteroidData.nasa_jpl_url}</Text>
            <Text style={styles.infoText}>Potentially Hazardous: {asteroidData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</Text>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => setAsteroidData(null)}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#162447',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#4a3fe4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  asteroidInfo: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e43f5a',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 4,
  },
});
