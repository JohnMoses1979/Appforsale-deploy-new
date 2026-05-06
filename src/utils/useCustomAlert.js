import { useState } from 'react';
import { Alert, Platform } from 'react-native';

export default function useCustomAlert() {
  const [alertConfig, setAlertConfig] = useState(null);

  const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
    if (Platform.OS !== 'web') {
      // Mobile: use native Alert
      Alert.alert(title, message, buttons);
    } else {
      // Web: use custom modal
      setAlertConfig({ title, message, buttons });
    }
  };

  const hideAlert = () => setAlertConfig(null);

  return { alertConfig, showAlert, hideAlert };
}