import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'sat_apps_user';
const SESSION_KEY = 'sat_apps_session';

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser() {
  const value = await AsyncStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
}

export async function setLoggedInUser(user) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function getLoggedInUser() {
  const value = await AsyncStorage.getItem(SESSION_KEY);
  return value ? JSON.parse(value) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}