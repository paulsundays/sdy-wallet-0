import { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const mockTransactions = [
  {
    id: 1,
    type: 'received',
    amount: 150.5,
    from: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
    timestamp: '2024-06-21 14:30',
    status: 'completed',
  },
  {
    id: 2,
    type: 'sent',
    amount: 75.25,
    to: '0x8D4C0532925a3b8D4C0532925a3b8D4C0532925a',
    timestamp: '2024-06-21 12:15',
    status: 'completed',
  },
  {
    id: 3,
    type: 'received',
    amount: 200.0,
    from: '0x925a3b8D4C0532925a3b8D4C0532925a3b8D4C05',
    timestamp: '2024-06-20 18:45',
    status: 'completed',
  },
  {
    id: 4,
    type: 'sent',
    amount: 50.75,
    to: '0xD4C0532925a3b8D4C0532925a3b8D4C0532925a3',
    timestamp: '2024-06-20 16:20',
    status: 'pending',
  },
];

export default function HomeScreen() {
  const [balance] = useState(1247.83);
  const [usdRate] = useState(0.85);

  const usdEquivalent = (balance * usdRate).toFixed(2);

  const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const renderItem = ({ item }: { item: typeof mockTransactions[0] }) => (
    <View style={styles.transaction}>
      <View style={styles.txLeft}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: item.type === 'received' ? '#dcfce7' : '#ffedd5' },
          ]}
        >
          <MaterialIcons
            name={item.type === 'received' ? 'arrow-downward' : 'arrow-upward'}
            size={16}
            color={item.type === 'received' ? '#16a34a' : '#ea580c'}
          />
        </View>
        <View>
          <Text style={styles.txTitle}>{item.type === 'received' ? 'Recibido' : 'Enviado'}</Text>
          <Text style={styles.txAddress}>
            {item.type === 'received' ? 'De: ' : 'A: '}
            {truncateAddress(item.from || item.to || '')}
          </Text>
          <Text style={styles.txTime}>{item.timestamp}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={[
            styles.txAmount,
            { color: item.type === 'received' ? '#16a34a' : '#ea580c' },
          ]}
        >
          {item.type === 'received' ? '+' : '-'}
          {item.amount} SDY
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'completed' ? '#ecfeff' : '#fdf2f8' },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === 'completed' ? 'Completado' : 'Pendiente'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Image source={require('../assets/images/sundays-logo.png')} style={styles.logo} />
            <View>
              <Text style={styles.headerTitle}>SundaysCoins</Text>
              <Text style={styles.headerSubtitle}>Tu wallet digital</Text>
            </View>
          </View>
          <View style={styles.connectedWrap}>
            <MaterialIcons name="wallet" size={20} color="#ec4899" />
            <Text style={styles.connectedText}>Conectado</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance Total</Text>
          <Text style={styles.balance}>{balance.toLocaleString()} SDY</Text>
          <View style={styles.balanceUsdWrap}>
            <MaterialIcons name="trending-up" size={14} color="white" />
            <Text style={styles.balanceUsd}>≈ ${usdEquivalent} USD</Text>
          </View>
          <Text style={styles.balanceRate}>1 SDY = ${usdRate} USD</Text>
        </View>

        <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
        <FlatList
          data={mockTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefce8',
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#475569',
  },
  connectedWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  connectedText: {
    fontSize: 12,
    color: '#475569',
  },
  balanceCard: {
    backgroundColor: '#ec4899',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  balanceLabel: {
    color: '#fce7f3',
    marginBottom: 4,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  balanceUsdWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  balanceUsd: {
    color: 'white',
    fontSize: 14,
  },
  balanceRate: {
    fontSize: 12,
    color: '#fbcfe8',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    padding: 4,
    borderRadius: 16,
  },
  txTitle: {
    fontWeight: '500',
    color: '#1e293b',
  },
  txAddress: {
    fontSize: 12,
    color: '#64748b',
  },
  txTime: {
    fontSize: 10,
    color: '#94a3b8',
  },
  txAmount: {
    fontWeight: 'bold',
  },
  statusBadge: {
    marginTop: 2,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    color: '#0c0a09',
  },
  separator: {
    height: 8,
  },
});
