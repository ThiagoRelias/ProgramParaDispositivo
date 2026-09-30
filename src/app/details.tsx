import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HOTELS } from '../app/components/data/Hotel';

export default function Details() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  
  const hotel = HOTELS.find((h) => h.id === id) || HOTELS[0];

  const handleBooking = () => {
    Alert.alert('Sucesso!', `Sua reserva no ${hotel.name} foi realizada com sucesso!`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: hotel.image }} style={styles.image} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.location}>📍 {hotel.location}</Text>
        <Text style={styles.description}>{hotel.fullDescription}</Text>

        <Text style={styles.subtitle}>Comodidades</Text>
        <View style={styles.amenitiesContainer}>
          {hotel.amenities.map((item, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Diária a partir de</Text>
            <Text style={styles.price}>R$ {hotel.price} <Text style={styles.perNight}>/ noite</Text></Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    color: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  perNight: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});