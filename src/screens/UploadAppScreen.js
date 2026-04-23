// import React, { useState } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Image,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as ImagePicker from 'expo-image-picker';
// import { useMarketplace } from '../context/MarketplaceContext';
// import { COLORS } from '../theme';

// const initialForm = {
//   title: '',
//   description: '',
//   category: '',
//   price: '',
//   ownerName: '',
//   ownerEmail: '',
//   ownerPhone: '',
//   company: '',
//   features: '',
//   image: null,
// };

// function Field({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
// }) {
//   return (
//     <View style={styles.fieldWrap}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#7F8794"
//         multiline={multiline}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//         style={[styles.input, multiline && styles.inputMultiline]}
//       />
//     </View>
//   );
// }

// export default function UploadAppScreen({ navigation }) {
//   const { addApp } = useMarketplace();
//   const [form, setForm] = useState(initialForm);
//   const [pickingImage, setPickingImage] = useState(false);

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       setPickingImage(true);

//       const permissionResult =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (!permissionResult.granted) {
//         Alert.alert(
//           'Permission Required',
//           'Please allow photo library access to select an app cover image.'
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ['images'],
//         allowsEditing: true,
//         aspect: [16, 9],
//         quality: 0.9,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         updateField('image', { uri: result.assets[0].uri });
//       }
//     } catch (error) {
//       console.log('Image picker error:', error);
//       Alert.alert('Image Picker Error', 'Unable to select image right now.');
//     } finally {
//       setPickingImage(false);
//     }
//   };

//   const removeSelectedImage = () => {
//     updateField('image', null);
//   };

//   const handleSubmit = () => {
//     if (!form.title.trim()) {
//       Alert.alert('Validation', 'Please enter app title');
//       return;
//     }
//     if (!form.category.trim()) {
//       Alert.alert('Validation', 'Please enter category');
//       return;
//     }
//     if (!form.description.trim()) {
//       Alert.alert('Validation', 'Please enter description');
//       return;
//     }
//     if (!form.price.trim()) {
//       Alert.alert('Validation', 'Please enter price');
//       return;
//     }
//     if (!form.ownerName.trim()) {
//       Alert.alert('Validation', 'Please enter owner name');
//       return;
//     }
//     if (!form.ownerEmail.trim()) {
//       Alert.alert('Validation', 'Please enter owner email');
//       return;
//     }
//     if (!form.ownerPhone.trim()) {
//       Alert.alert('Validation', 'Please enter owner phone');
//       return;
//     }
//     if (!form.image) {
//       Alert.alert('Validation', 'Please upload an app cover image');
//       return;
//     }

//     try {
//       addApp(form);
//       navigation.replace('Apps');
//     } catch (error) {
//       console.log('Submit error:', error);
//       Alert.alert('Error', 'Unable to submit app. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.container}
//         >
//           <Text style={styles.eyebrow}>UPLOAD APP</Text>
//           <Text style={styles.title}>Submit Your App</Text>
//           <Text style={styles.subtitle}>
//             Fill the details below. After submission, the app will appear in the
//             Apps marketplace screen.
//           </Text>

//           <View style={styles.card}>
//             <Text style={styles.sectionTitle}>App Cover Image</Text>
//             <Text style={styles.sectionSubtext}>
//               Upload a professional marketplace cover image from your device.
//             </Text>

//             <Pressable
//               onPress={pickImageFromGallery}
//               style={({ pressed }) => [
//                 styles.imagePickerCard,
//                 pressed && styles.pressed,
//               ]}
//             >
//               {form.image ? (
//                 <>
//                   <Image
//                     source={form.image}
//                     style={styles.selectedPreviewImage}
//                     resizeMode="cover"
//                   />
//                   <View style={styles.selectedPreviewOverlay} />
//                   <View style={styles.selectedPreviewContent}>
//                     <View style={styles.selectedPreviewBadge}>
//                       <Text style={styles.selectedPreviewBadgeText}>
//                         Uploaded Cover
//                       </Text>
//                     </View>
//                     <Text style={styles.selectedPreviewTitle} numberOfLines={1}>
//                       {form.title?.trim() || 'Your App Preview'}
//                     </Text>
//                     <Text style={styles.selectedPreviewSubtitle} numberOfLines={1}>
//                       {form.category?.trim() || 'Marketplace listing image'}
//                     </Text>
//                   </View>
//                 </>
//               ) : (
//                 <View style={styles.uploadPlaceholder}>
//                   <Text style={styles.uploadPlaceholderIcon}>↑</Text>
//                   <Text style={styles.uploadPlaceholderTitle}>
//                     Upload Cover Image
//                   </Text>
//                   <Text style={styles.uploadPlaceholderText}>
//                     Tap to open your gallery and choose a listing image
//                   </Text>
//                 </View>
//               )}
//             </Pressable>

//             <View style={styles.imageActionsRow}>
//               <Pressable
//                 onPress={pickImageFromGallery}
//                 style={({ pressed }) => [
//                   styles.secondaryActionBtn,
//                   pressed && styles.pressed,
//                 ]}
//               >
//                 <Text style={styles.secondaryActionBtnText}>
//                   {pickingImage
//                     ? 'Opening...'
//                     : form.image
//                     ? 'Change Image'
//                     : 'Choose Image'}
//                 </Text>
//               </Pressable>

//               {form.image ? (
//                 <Pressable
//                   onPress={removeSelectedImage}
//                   style={({ pressed }) => [
//                     styles.removeActionBtn,
//                     pressed && styles.pressed,
//                   ]}
//                 >
//                   <Text style={styles.removeActionBtnText}>Remove</Text>
//                 </Pressable>
//               ) : null}
//             </View>

//             <Field
//               label="App Title"
//               value={form.title}
//               onChangeText={(text) => updateField('title', text)}
//               placeholder="Enter app title"
//             />

//             <Field
//               label="Category"
//               value={form.category}
//               onChangeText={(text) => updateField('category', text)}
//               placeholder="Example: CRM, Pharmacy, E-commerce"
//             />

//             <Field
//               label="Description"
//               value={form.description}
//               onChangeText={(text) => updateField('description', text)}
//               placeholder="Enter app description"
//               multiline
//             />

//             <Field
//               label="Price"
//               value={form.price}
//               onChangeText={(text) => updateField('price', text)}
//               placeholder="Example: ₹49,999"
//             />

//             <Field
//               label="Owner Name"
//               value={form.ownerName}
//               onChangeText={(text) => updateField('ownerName', text)}
//               placeholder="Enter owner name"
//             />

//             <Field
//               label="Owner Email"
//               value={form.ownerEmail}
//               onChangeText={(text) => updateField('ownerEmail', text)}
//               placeholder="Enter owner email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />

//             <Field
//               label="Owner Phone"
//               value={form.ownerPhone}
//               onChangeText={(text) => updateField('ownerPhone', text)}
//               placeholder="Enter phone number"
//               keyboardType="phone-pad"
//             />

//             <Field
//               label="Company"
//               value={form.company}
//               onChangeText={(text) => updateField('company', text)}
//               placeholder="Enter company name"
//             />

//             <Field
//               label="Features"
//               value={form.features}
//               onChangeText={(text) => updateField('features', text)}
//               placeholder="Enter key features"
//               multiline
//             />

//             <Pressable style={styles.submitBtnWrap} onPress={handleSubmit}>
//               <LinearGradient
//                 colors={[COLORS.primarySoft, COLORS.primary]}
//                 style={styles.submitBtn}
//               >
//                 <Text style={styles.submitBtnText}>Submit App</Text>
//               </LinearGradient>
//             </Pressable>

//             <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   pressed: {
//     opacity: 0.92,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 40,
//   },
//   eyebrow: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//     marginBottom: 6,
//   },
//   title: {
//     color: COLORS.textPrimary,
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   subtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 18,
//   },
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.03)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 22,
//     padding: 16,
//   },
//   sectionTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   sectionSubtext: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     marginBottom: 12,
//   },
//   imagePickerCard: {
//     height: 140,
//     borderRadius: 18,
//     overflow: 'hidden',
//     marginBottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   uploadPlaceholder: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 18,
//   },
//   uploadPlaceholderIcon: {
//     color: COLORS.primary,
//     fontSize: 28,
//     fontWeight: '800',
//     marginBottom: 8,
//   },
//   uploadPlaceholderTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 15,
//     fontWeight: '800',
//     marginBottom: 4,
//   },
//   uploadPlaceholderText: {
//     color: COLORS.textSecondary,
//     fontSize: 12,
//     lineHeight: 18,
//     textAlign: 'center',
//   },
//   selectedPreviewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   selectedPreviewOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(10,12,16,0.26)',
//   },
//   selectedPreviewContent: {
//     position: 'absolute',
//     left: 12,
//     right: 12,
//     bottom: 12,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 14,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   selectedPreviewBadge: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.14)',
//     borderWidth: 1,
//     borderColor: COLORS.borderHighlight,
//     borderRadius: 999,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     marginBottom: 6,
//   },
//   selectedPreviewBadgeText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//   },
//   selectedPreviewTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '800',
//     marginBottom: 2,
//   },
//   selectedPreviewSubtitle: {
//     color: COLORS.textSecondary,
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   imageActionsRow: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 18,
//   },
//   secondaryActionBtn: {
//     flex: 1,
//     minHeight: 44,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   secondaryActionBtnText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   removeActionBtn: {
//     minWidth: 92,
//     minHeight: 44,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     paddingHorizontal: 14,
//   },
//   removeActionBtnText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   fieldWrap: {
//     marginBottom: 14,
//   },
//   label: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//     marginBottom: 8,
//   },
//   input: {
//     minHeight: 50,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     paddingHorizontal: 14,
//     color: COLORS.textPrimary,
//     fontSize: 14,
//   },
//   inputMultiline: {
//     minHeight: 110,
//     textAlignVertical: 'top',
//     paddingTop: 14,
//   },
//   submitBtnWrap: {
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginTop: 4,
//     marginBottom: 12,
//   },
//   submitBtn: {
//     minHeight: 52,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   submitBtnText: {
//     color: COLORS.textDark,
//     fontSize: 15,
//     fontWeight: '800',
//   },
//   cancelBtn: {
//     minHeight: 50,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   cancelBtnText: {
//     color: COLORS.textPrimary,
//     fontSize: 14,
//     fontWeight: '700',
//   },
// });

import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useMarketplace } from '../context/MarketplaceContext';
import { COLORS } from '../theme';

const initialForm = {
  title: '',
  description: '',
  category: '',
  price: '',
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  company: '',
  features: '',
  image: null,
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7F8794"
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input, multiline && styles.inputMultiline]}
      />
    </View>
  );
}

export default function UploadAppScreen({ navigation }) {
  const { addApp } = useMarketplace();
  const [form, setForm] = useState(initialForm);
  const [pickingImage, setPickingImage] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImageFromGallery = async () => {
    try {
      setPickingImage(true);

      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow photo library access to select an app cover image.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.9,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        updateField('image', { uri: result.assets[0].uri });
      }
    } catch (error) {
      console.log('Image picker error:', error);
      Alert.alert('Image Picker Error', 'Unable to select image right now.');
    } finally {
      setPickingImage(false);
    }
  };

  const removeSelectedImage = () => {
    updateField('image', null);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      Alert.alert('Validation', 'Please enter app title');
      return;
    }
    if (!form.category.trim()) {
      Alert.alert('Validation', 'Please enter category');
      return;
    }
    if (!form.description.trim()) {
      Alert.alert('Validation', 'Please enter description');
      return;
    }
    if (!form.price.trim()) {
      Alert.alert('Validation', 'Please enter price');
      return;
    }
    if (!form.ownerName.trim()) {
      Alert.alert('Validation', 'Please enter owner name');
      return;
    }
    if (!form.ownerEmail.trim()) {
      Alert.alert('Validation', 'Please enter owner email');
      return;
    }
    if (!form.ownerPhone.trim()) {
      Alert.alert('Validation', 'Please enter owner phone');
      return;
    }
    if (!form.image) {
      Alert.alert('Validation', 'Please upload an app cover image');
      return;
    }

    try {
      addApp(form);
      navigation.replace('Apps');
    } catch (error) {
      console.log('Submit error:', error);
      Alert.alert('Error', 'Unable to submit app. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Text style={styles.eyebrow}>UPLOAD APP</Text>
          <Text style={styles.title}>Submit Your App</Text>
          <Text style={styles.subtitle}>
            Fill the details below. After submission, the app will appear in the
            Apps marketplace screen.
          </Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>App Cover Image</Text>
            <Text style={styles.sectionSubtext}>
              Upload a professional marketplace cover image from your device.
            </Text>

            <Pressable
              onPress={pickImageFromGallery}
              style={({ pressed }) => [
                styles.imagePickerCard,
                pressed && styles.pressed,
              ]}
            >
              {form.image ? (
                <>
                  <Image
                    source={form.image}
                    style={styles.selectedPreviewImage}
                    resizeMode="cover"
                  />
                  <View style={styles.selectedPreviewOverlay} />
                  <View style={styles.selectedPreviewContent}>
                    <View style={styles.selectedPreviewBadge}>
                      <Text style={styles.selectedPreviewBadgeText}>
                        Uploaded Cover
                      </Text>
                    </View>
                    <Text style={styles.selectedPreviewTitle} numberOfLines={1}>
                      {form.title?.trim() || 'Your App Preview'}
                    </Text>
                    <Text style={styles.selectedPreviewSubtitle} numberOfLines={1}>
                      {form.category?.trim() || 'Marketplace listing image'}
                    </Text>
                  </View>
                </>
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Text style={styles.uploadPlaceholderIcon}>↑</Text>
                  <Text style={styles.uploadPlaceholderTitle}>
                    Upload Cover Image
                  </Text>
                  <Text style={styles.uploadPlaceholderText}>
                    Tap to open your gallery and choose a listing image
                  </Text>
                </View>
              )}
            </Pressable>

            <View style={styles.imageActionsRow}>
              <Pressable
                onPress={pickImageFromGallery}
                style={({ pressed }) => [
                  styles.secondaryActionBtn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.secondaryActionBtnText}>
                  {pickingImage
                    ? 'Opening...'
                    : form.image
                    ? 'Change Image'
                    : 'Choose Image'}
                </Text>
              </Pressable>

              {form.image ? (
                <Pressable
                  onPress={removeSelectedImage}
                  style={({ pressed }) => [
                    styles.removeActionBtn,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.removeActionBtnText}>Remove</Text>
                </Pressable>
              ) : null}
            </View>

            <Field
              label="App Title"
              value={form.title}
              onChangeText={(text) => updateField('title', text)}
              placeholder="Enter app title"
            />

            <Field
              label="Category"
              value={form.category}
              onChangeText={(text) => updateField('category', text)}
              placeholder="Example: CRM, Pharmacy, E-commerce"
            />

            <Field
              label="Description"
              value={form.description}
              onChangeText={(text) => updateField('description', text)}
              placeholder="Enter app description"
              multiline
            />

            <Field
              label="Price"
              value={form.price}
              onChangeText={(text) => updateField('price', text)}
              placeholder="Example: ₹49,999"
            />

            <Field
              label="Owner Name"
              value={form.ownerName}
              onChangeText={(text) => updateField('ownerName', text)}
              placeholder="Enter owner name"
            />

            <Field
              label="Owner Email"
              value={form.ownerEmail}
              onChangeText={(text) => updateField('ownerEmail', text)}
              placeholder="Enter owner email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Field
              label="Owner Phone"
              value={form.ownerPhone}
              onChangeText={(text) => updateField('ownerPhone', text)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />

            <Field
              label="Company"
              value={form.company}
              onChangeText={(text) => updateField('company', text)}
              placeholder="Enter company name"
            />

            <Field
              label="Features"
              value={form.features}
              onChangeText={(text) => updateField('features', text)}
              placeholder="Enter key features"
              multiline
            />

            <Pressable style={styles.submitBtnWrap} onPress={handleSubmit}>
              <LinearGradient
                colors={['#67E6E8', '#42DDE2', '#1FCFD6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitBtn}
              >
                <View style={styles.buttonTopShine} />
                <Text style={styles.submitBtnText}>Submit App</Text>
              </LinearGradient>
            </Pressable>

            <Pressable style={styles.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.92,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 40,
  },
  eyebrow: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    padding: 16,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSubtext: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  imagePickerCard: {
    height: 140,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  uploadPlaceholderIcon: {
    color: '#67E6E8',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  uploadPlaceholderTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  uploadPlaceholderText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  selectedPreviewImage: {
    width: '100%',
    height: '100%',
  },
  selectedPreviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,12,16,0.26)',
  },
  selectedPreviewContent: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  selectedPreviewBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,232,240,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(66,221,226,0.28)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  selectedPreviewBadgeText: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
  },
  selectedPreviewTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  selectedPreviewSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  imageActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  secondaryActionBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  secondaryActionBtnText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  removeActionBtn: {
    minWidth: 92,
    minHeight: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
  },
  removeActionBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  fieldWrap: {
    marginBottom: 14,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 14,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  inputMultiline: {
    minHeight: 110,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  submitBtnWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 12,
    shadowColor: '#42DDE2',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  submitBtn: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonTopShine: {
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    height: 1.2,
    backgroundColor: 'rgba(255,255,255,0.32)',
  },
  submitBtnText: {
    color: '#12343A',
    fontSize: 15,
    fontWeight: '800',
  },
  cancelBtn: {
    minHeight: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cancelBtnText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
});