import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayAsyncStorageValues = () => {
  const [storedValues, setStoredValues] = useState([]);

  useEffect(() => {
    const fetchStoredValues = async () => {
      try {
        // Fetch all keys from AsyncStorage
        const allKeys = await AsyncStorage.getAllKeys();

        // Fetch all values corresponding to the keys
        const values = await AsyncStorage.multiGet(allKeys);

        // Extract and set the values
        setStoredValues(values);
      } catch (error) {
        console.error('Error fetching AsyncStorage values:', error);
      }
    };

    fetchStoredValues();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Stored Values:
        </Text>
        {storedValues.map(([key, value], index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{`Key: ${key}`}</Text>
            <Text style={{color: "black"}}>{`Value: ${value}`}</Text>
          </View>
        ))}
        {storedValues.length === 0 && (
          <Text>No values stored in AsyncStorage</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default DisplayAsyncStorageValues;