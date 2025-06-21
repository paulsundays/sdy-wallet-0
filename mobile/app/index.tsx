import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [transferStatus, setTransferStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const usdEquivalent = (balance * usdRate).toFixed(2);

  const handleOpenTransfer = () => {
    setShowTransferModal(true);
  };

  const handleTransfer = () => {
    if (transferAddress && transferAmount) {
      setShowTransferModal(false);
      setShowConfirmModal(true);
    }
  };

  const confirmTransfer = async () => {
    setShowConfirmModal(false);
    setShowStatusModal(true);
    setTransferStatus('loading');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = Math.random() > 0.3;
      if (success) {
        setTransferStatus('success');
        setTimeout(() => {
          setTransferAddress('');
          setTransferAmount('');
        }, 1000);
      } else {
        setTransferStatus('error');
        setErrorMessage(
          'Error de red: No se pudo completar la transferencia. Intenta nuevamente.'
        );
      }
    } catch (e) {
      setTransferStatus('error');
      setErrorMessage('Error inesperado. Por favor intenta nuevamente.');
    }
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setTransferStatus('loading');
    setErrorMessage('');
  };

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
      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
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
          </>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.transferButton} onPress={handleOpenTransfer}>
            <MaterialIcons name="send" size={20} color="white" />
            <Text style={styles.transferButtonText}>Transferir</Text>
          </TouchableOpacity>
        }
      />

      {/* Transfer Form Modal */}
        <Modal visible={showTransferModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Transferir SundaysCoins</Text>

              <TextInput
                placeholder="Dirección del destinatario"
                value={transferAddress}
                onChangeText={setTransferAddress}
                style={styles.input}
              />
              <TextInput
                placeholder="Cantidad (SDY)"
                value={transferAmount}
                onChangeText={setTransferAmount}
                keyboardType="numeric"
                style={styles.input}
              />

              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>Cantidad: {transferAmount || '0'} SDY</Text>
                <Text style={styles.summaryText}>Equivalente USD: ${transferAmount ? (Number.parseFloat(transferAmount) * usdRate).toFixed(2) : '0.00'}</Text>
                <Text style={styles.summaryText}>Comisión: 0.01 SDY</Text>
              </View>

              <TouchableOpacity
                style={[styles.modalButton, !transferAddress || !transferAmount ? styles.disabledButton : null]}
                disabled={!transferAddress || !transferAmount}
                onPress={handleTransfer}
              >
                <Text style={styles.modalButtonText}>Enviar Transferencia</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowTransferModal(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Confirm Modal */}
        <Modal visible={showConfirmModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirmar Transferencia</Text>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>Destinatario: {truncateAddress(transferAddress)}</Text>
                <Text style={styles.summaryText}>Cantidad: {transferAmount} SDY</Text>
                <Text style={styles.summaryText}>Comisión: 0.01 SDY</Text>
                <Text style={[styles.summaryText, { fontWeight: 'bold' }]}>Total: {(Number.parseFloat(transferAmount || '0') + 0.01).toFixed(2)} SDY</Text>
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowConfirmModal(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={confirmTransfer}>
                  <Text style={styles.modalButtonText}>Confirmar Envío</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Status Modal */}
        <Modal visible={showStatusModal} transparent animationType="fade" onRequestClose={closeStatusModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {transferStatus === 'loading' && (
                <View style={{ alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#ec4899" />
                  <Text style={styles.modalTitle}>Procesando Transferencia</Text>
                  <Text style={styles.statusTextDesc}>Tu transferencia está siendo procesada...</Text>
                </View>
              )}

              {transferStatus === 'success' && (
                <View style={{ alignItems: 'center' }}>
                  <MaterialIcons name="check-circle" size={48} color="#16a34a" />
                  <Text style={[styles.modalTitle, { color: '#16a34a' }]}>¡Transferencia Exitosa!</Text>
                  <Text style={styles.statusTextDesc}>Tu transferencia de {transferAmount} SDY se envió correctamente.</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={closeStatusModal}>
                    <Text style={styles.modalButtonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              )}

              {transferStatus === 'error' && (
                <View style={{ alignItems: 'center' }}>
                  <MaterialIcons name="error" size={48} color="#ef4444" />
                  <Text style={[styles.modalTitle, { color: '#ef4444' }]}>Error en la Transferencia</Text>
                  <Text style={styles.statusTextDesc}>{errorMessage}</Text>
                  <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.cancelButton} onPress={closeStatusModal}>
                      <Text style={styles.cancelButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => { closeStatusModal(); setTimeout(() => setShowConfirmModal(true), 100); }}>
                      <Text style={styles.modalButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
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
  transferButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#ec4899',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  transferButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fce7f3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  summaryBox: {
    backgroundColor: '#fdf2f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
  modalButton: {
    backgroundColor: '#ec4899',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    marginBottom: 8,
  },
  cancelButtonText: {
    color: '#1e293b',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statusTextDesc: {
    marginTop: 8,
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 12,
  },
});
