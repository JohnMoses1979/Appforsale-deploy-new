import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CustomAlertModal({ config, onHide }) {
  if (!config) return null;

  return (
    <Modal
      transparent
      visible={!!config}
      animationType="fade"
      onRequestClose={onHide}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{config.title}</Text>
          <Text style={styles.message}>{config.message}</Text>
          <View style={styles.buttonRow}>
            {config.buttons.map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.button,
                  idx === config.buttons.length - 1 && styles.primaryBtn,
                ]}
                onPress={() => {
                  onHide();
                  if (btn.onPress) btn.onPress();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    idx === config.buttons.length - 1 && styles.primaryBtnText,
                  ]}
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  box: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#1E2A3B',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: 'rgba(77,235,255,0.25)',
    shadowColor: '#4DEBFF',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  primaryBtn: {
    backgroundColor: '#4DEBFF',
    borderColor: '#4DEBFF',
  },
  buttonText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    fontWeight: '600',
  },
  primaryBtnText: {
    color: '#0D1B2A',
    fontWeight: '800',
  },
});