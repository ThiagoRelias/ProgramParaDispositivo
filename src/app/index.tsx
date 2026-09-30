import { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const HOTELS = [
  {
    id: '1',
    name: 'Pousada do Mar',
    description: 'Quartos aconchegantes a poucos passos da praia com vista para o oceano.',
    fullDescription: 'A Pousada do Mar oferece uma experiência relaxante e acolhedora de frente para o mar. Aproveite o café da manhã tropical e a brisa do oceano em acomodações confortáveis.',
    price: 250,
    rating: 4.8,
    reviewsCount: 124,
    stars: 5,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Praia do Rosa, SC',
    amenities: ['Wi-Fi Grátis', 'Piscina', 'Vista Mar', 'Café da Manhã'],
  },
  {
    id: '2',
    name: 'Hotel Centro Executivo',
    description: 'Localização privilegiada no centro financeiro com estrutura completa.',
    fullDescription: 'Ideal para quem busca praticidade e conforto no centro urbano. Próximo aos principais pontos turísticos, restaurantes e centros de negócios.',
    price: 320,
    rating: 4.5,
    reviewsCount: 89,
    stars: 4,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    location: 'Centro, São Paulo - SP',
    amenities: ['Wi-Fi Grátis', 'Academia', 'Estacionamento', 'Restaurante'],
  },
  {
    id: '3',
    name: 'Chalés Casa da Serra',
    description: 'Chalés privativos cercados pela natureza e vista para as montanhas.',
    fullDescription: 'Refúgio perfeito para relaxar e se conectar com a natureza. Nossos chalés possuem lareira, vista para as montanhas e ambiente super aconchegante.',
    price: 450,
    rating: 4.9,
    reviewsCount: 210,
    stars: 5,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    location: 'Gramado, RS',
    amenities: ['Lareira', 'Café da Manhã', 'Estacionamento', 'Pet Friendly'],
  },
];

export default function Index() {
  const [selectedHotel, setSelectedHotel] = useState(HOTELS[0]);
  const [currentScreen, setCurrentScreen] = useState<'list' | 'detail'>('list');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectHotel = (hotel: typeof HOTELS[0]) => {
    setSelectedHotel(hotel);
    setCurrentScreen('detail');
  };

  const filteredHotels = HOTELS.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* TELA A: LISTA DE HOSPEDAGENS */}
      {currentScreen === 'list' ? (
        <View style={styles.screen}>
          {/* Header Superior Limpo */}
          <View style={styles.navBar}>
            <View>
              <Text style={styles.brandTitle}>hospeda</Text>
              <Text style={styles.brandSubtitle}>Explore lugares incríveis</Text>
            </View>
            <TouchableOpacity style={styles.profileBadge}>
              <Text style={styles.profileText}>JS</Text>
            </TouchableOpacity>
          </View>

          {/* Campo de Pesquisa Direto */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput 
              style={styles.searchInput}
              placeholder="Para onde quer ir?"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView 
            contentContainerStyle={styles.listContent} 
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Hospedagens em destaque</Text>

            {filteredHotels.map((hotel) => (
              <TouchableOpacity 
                key={hotel.id} 
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => handleSelectHotel(hotel)}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: hotel.image }} style={styles.cardImage} />
                  
                  {/* Badge de Avaliação Fluida */}
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingBadgeText}>★ {hotel.rating}</Text>
                  </View>
                </View>

                <View style={styles.cardInfo}>
                  <View style={styles.titleHeader}>
                    <Text style={styles.cardTitle}>{hotel.name}</Text>
                    <Text style={styles.starText}>{'★'.repeat(hotel.stars)}</Text>
                  </View>

                  <Text style={styles.locationText}>📍 {hotel.location}</Text>
                  <Text style={styles.descriptionText} numberOfLines={2}>
                    {hotel.description}
                  </Text>

                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.pricePrefix}>Diária a partir de</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceValue}>R$ {hotel.price}</Text>
                        <Text style={styles.priceUnit}> / noite</Text>
                      </View>
                    </View>

                    <TouchableOpacity 
                      style={styles.primaryButton}
                      onPress={() => handleSelectHotel(hotel)}
                    >
                      <Text style={styles.primaryButtonText}>Ver Detalhes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        /* TELA B: DETALHES */
        <View style={styles.screen}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailImageContainer}>
              <Image source={{ uri: selectedHotel.image }} style={styles.detailImage} />
              
              <TouchableOpacity style={styles.floatingBackButton} onPress={() => setCurrentScreen('list')}>
                <Text style={styles.backButtonIcon}>← Voltar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailBody}>
              <Text style={styles.detailLocation}>📍 {selectedHotel.location}</Text>
              <Text style={styles.detailTitle}>{selectedHotel.name}</Text>

              <View style={styles.metaRow}>
                <View style={styles.ratingChip}>
                  <Text style={styles.ratingChipText}>★ {selectedHotel.rating}</Text>
                  <Text style={styles.reviewsText}>({selectedHotel.reviewsCount} avaliações)</Text>
                </View>

                <Text style={styles.starText}>{'★'.repeat(selectedHotel.stars)}</Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.detailSectionTitle}>Sobre o local</Text>
              <Text style={styles.detailDescription}>{selectedHotel.fullDescription}</Text>

              <Text style={styles.detailSectionTitle}>Comodidades</Text>
              <View style={styles.amenitiesContainer}>
                {selectedHotel.amenities.map((item, idx) => (
                  <View key={idx} style={styles.amenityChip}>
                    <Text style={styles.amenityChipText}>✓ {item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Barra de Reserva Fixa no Rodapé */}
          <View style={styles.bottomBar}>
            <View>
              <Text style={styles.pricePrefix}>Preço total diária</Text>
              <Text style={styles.bottomPrice}>R$ {selectedHotel.price} <Text style={styles.priceUnit}>/noite</Text></Text>
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.bookButtonText}>Reservar agora</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* MODAL DE RESERVA */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Reserva Solicitada</Text>
            <Text style={styles.modalSubtitle}>
              Sua reserva para <Text style={styles.bold}>{selectedHotel.name}</Text> foi registrada com sucesso.
            </Text>

            <View style={styles.modalInfoBox}>
              <Text style={styles.modalInfoLine}>Local: <Text style={styles.bold}>{selectedHotel.location}</Text></Text>
              <Text style={styles.modalInfoLine}>Valor (1 noite): <Text style={styles.boldColor}>R$ {selectedHotel.price}</Text></Text>
              <Text style={styles.modalInfoLine}>Status: <Text style={styles.successText}>Confirmado</Text></Text>
            </View>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  screen: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  profileBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#4338ca',
    fontWeight: '700',
    fontSize: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imageWrapper: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardInfo: {
    padding: 16,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
  },
  starText: {
    color: '#f59e0b',
    fontSize: 12,
    letterSpacing: 1,
  },
  locationText: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  pricePrefix: {
    fontSize: 11,
    color: '#94a3b8',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  priceUnit: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 'normal',
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },

  /* Detalhes */
  detailImageContainer: {
    height: 260,
    position: 'relative',
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  floatingBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  backButtonIcon: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  detailBody: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  detailLocation: {
    fontSize: 13,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  reviewsText: {
    fontSize: 12,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 16,
  },
  detailSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 40,
  },
  amenityChip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  amenityChipText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  bookButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInfoBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
    gap: 6,
  },
  modalInfoLine: {
    fontSize: 13,
    color: '#334155',
  },
  bold: {
    fontWeight: '700',
    color: '#0f172a',
  },
  boldColor: {
    fontWeight: '800',
    color: '#4f46e5',
  },
  successText: {
    color: '#16a34a',
    fontWeight: '700',
  },
  modalCloseButton: {
    backgroundColor: '#0f172a',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});