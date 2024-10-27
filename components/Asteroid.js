import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const API_KEY = 'Knj5ITpNabNudgapGw1dki5B6NhsYLueHhzuPoSm';

export default function Asteroid({ asteroidId, setAsteroidData, setAsteroidId }) {
  const fetchAsteroidData = async (id) => {
    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`);
      setAsteroidData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch asteroid data. Please try again.');
    }
  };

  const fetchRandomAsteroid = async () => {
    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`);
      const randomAsteroid = response.data.near_earth_objects[Math.floor(Math.random() * response.data.near_earth_objects.length)];
      fetchAsteroidData(randomAsteroid.id);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch random asteroid data. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (asteroidId) {
      fetchAsteroidData(asteroidId);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, asteroidId ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!asteroidId}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.randomButton]} onPress={fetchRandomAsteroid}>
        <Text style={styles.buttonText}>Random Asteroid</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '90%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: '#4a3fe4',
  },
  buttonDisabled: {
    backgroundColor: '#333',
  },
  randomButton: {
    backgroundColor: '#4a3fe4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
