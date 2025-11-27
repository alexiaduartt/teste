import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock de dados para visualizar (Simulando certificados já ganhos)
const MY_CERTIFICATES = [
  { id: '1', courseTitle: 'Crie seus Primeiros Jogos com Python', date: '12/08/2024', code: 'PY-2024-882' },
  { id: '2', courseTitle: 'Lógica de Programação com Minecraft', date: '20/09/2024', code: 'MC-2024-101' },
];

export default function MyCertificatesScreen() {
  const router = useRouter();

  const renderCertificateItem = ({ item }: { item: typeof MY_CERTIFICATES[0] }) => (
    <View style={styles.certCard}>
      {/* Lado Esquerdo: Ícone */}
      <View style={styles.certIconContainer}>
        <Ionicons name="ribbon" size={32} color="#1F1B54" />
      </View>
      
      {/* Centro: Informações */}
      <View style={styles.certInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>{item.courseTitle}</Text>
        <Text style={styles.certDate}>Concluído em: {item.date}</Text>
        <Text style={styles.certCode}>Cód: {item.code}</Text>
      </View>

      {/* Lado Direito: Ação */}
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons name="download-outline" size={24} color="#1F1B54" />
      </TouchableOpacity>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Nenhum certificado ainda</Text>
      <Text style={styles.emptySubtitle}>Conclua seus cursos para desbloquear suas certificações!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Box Padrão */}
      <View style={styles.headerBox}>
        <SafeAreaView style={styles.safeAreaContent}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()}>
               <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Meus Certificados</Text>
            <View style={{ width: 28 }} /> 
          </View>
        </SafeAreaView>
      </View>

      {/* Lista */}
      <View style={styles.bodyContent}>
        <FlatList
          data={MY_CERTIFICATES}
          keyExtractor={item => item.id}
          renderItem={renderCertificateItem}
          contentContainerStyle={{ padding: 24, gap: 16 }}
          ListEmptyComponent={EmptyState}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  // Header
  headerBox: {
    backgroundColor: '#1F1B54',
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  safeAreaContent: { paddingHorizontal: 24, paddingTop: 10 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  
  // Body
  bodyContent: { flex: 1 },
  
  // Cards
  certCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#1F1B54', // Detalhe lateral azul
  },
  certIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  certInfo: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F1B54', marginBottom: 4 },
  certDate: { fontSize: 12, color: '#6B7280' },
  certCode: { fontSize: 10, color: '#9CA3AF', marginTop: 2, textTransform: 'uppercase' },
  downloadButton: { padding: 8 },

  // Empty State
  emptyContainer: { alignItems: 'center', marginTop: 60, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#475569', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 8 },
});