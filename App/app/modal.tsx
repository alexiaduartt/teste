import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações / Modal</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>Aqui você pode colocar configurações ou avisos.</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2E1065' },
  text: { fontSize: 16, color: '#666', marginTop: 10 },
  separator: { marginVertical: 30, height: 1, width: '80%', backgroundColor: '#eee' },
});