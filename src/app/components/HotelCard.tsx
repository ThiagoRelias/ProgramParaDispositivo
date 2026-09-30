import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Hotel } from '../components/data/Hotel';

interface Props {
  hotel: Hotel;
}

export const HotelCard: React.FC<Props> = ({ hotel }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => router.push({ pathname: '/details', params: { id: hotel.id } })}
    >
      <Image source={{ uri: hotel.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.description}>{hotel.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#e5e7eb',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});