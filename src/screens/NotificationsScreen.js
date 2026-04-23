// import React, { useEffect, useRef } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
//   Animated,
//   Easing,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { COLORS } from '../theme';
// import CommonHeader from '../components/common/CommonHeader';
// import { useNotifications } from '../context/NotificationContext';

// function formatTime(isoString) {
//   try {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   } catch {
//     return '';
//   }
// }

// function getTypeLabel(type) {
//   if (type === 'success') return 'MARKETPLACE UPDATE';
//   if (type === 'warning') return 'IMPORTANT NOTICE';
//   if (type === 'error') return 'ACTION NEEDED';
//   return 'APP NEWS';
// }

// export default function NotificationsScreen({ navigation }) {
//   const {
//     notifications,
//     markAsRead,
//     markAllAsRead,
//     removeNotification,
//     clearAllNotifications,
//   } = useNotifications();

//   const headerAnim = useRef(new Animated.Value(0)).current;
//   const topCardAnim = useRef(new Animated.Value(0)).current;
//   const emptyAnim = useRef(new Animated.Value(0)).current;
//   const cardsAnimRef = useRef([]);

//   if (cardsAnimRef.current.length !== notifications.length) {
//     cardsAnimRef.current = notifications.map(
//       (_, index) => cardsAnimRef.current[index] || new Animated.Value(0)
//     );
//   }

//   useEffect(() => {
//     const sequence = [
//       Animated.timing(headerAnim, {
//         toValue: 1,
//         duration: 280,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//       Animated.timing(topCardAnim, {
//         toValue: 1,
//         duration: 340,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ];

//     if (notifications.length === 0) {
//       sequence.push(
//         Animated.timing(emptyAnim, {
//           toValue: 1,
//           duration: 320,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         })
//       );
//     } else {
//       sequence.push(
//         Animated.stagger(
//           110,
//           cardsAnimRef.current.map((anim) =>
//             Animated.timing(anim, {
//               toValue: 1,
//               duration: 340,
//               easing: Easing.out(Easing.cubic),
//               useNativeDriver: true,
//             })
//           )
//         )
//       );
//     }

//     const intro = Animated.sequence(sequence);
//     intro.start();

//     return () => {
//       intro.stop();
//     };
//   }, [headerAnim, topCardAnim, emptyAnim, notifications]);

//   const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
//     opacity: anim,
//     transform: [
//       {
//         translateY: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [distance, 0],
//         }),
//       },
//       {
//         scale: anim.interpolate({
//           inputRange: [0, 1],
//           outputRange: [fromScale, 1],
//         }),
//       },
//     ],
//   });

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.container}
//       >
//         <Animated.View style={fadeUp(headerAnim, 10, 1)}>
//           <CommonHeader
//             navigation={navigation}
//             title="Notifications"
//             subtitle="Apps Marketplace updates"
//             showBack
//             rightLabel="Mark all"
//             onRightPress={markAllAsRead}
//             onNotificationPress={() => {}}
//             onProfilePress={() => navigation.navigate('Profile')}
//           />
//         </Animated.View>

//         <Animated.View style={fadeUp(topCardAnim, 16, 0.99)}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
//             style={styles.topCard}
//           >
//             <View style={styles.topChip}>
//               <Text style={styles.topChipText}>NOTIFICATION CENTER</Text>
//             </View>

//             <Text style={styles.topTitle}>Stay updated with marketplace activity</Text>
//             <Text style={styles.topText}>
//               All marketplace updates, featured apps, pricing changes, offers,
//               product highlights, profile updates, and inquiries will appear here.
//             </Text>

//             <Pressable
//               onPress={clearAllNotifications}
//               style={({ pressed }) => [
//                 styles.clearButton,
//                 pressed && styles.buttonPressed,
//               ]}
//             >
//               <Text style={styles.clearButtonText}>Clear All</Text>
//             </Pressable>
//           </LinearGradient>
//         </Animated.View>

//         {notifications.length === 0 ? (
//           <Animated.View style={fadeUp(emptyAnim, 18, 0.99)}>
//             <LinearGradient
//               colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
//               style={styles.emptyCard}
//             >
//               <Text style={styles.emptyTitle}>No marketplace notifications</Text>
//               <Text style={styles.emptyText}>
//                 New app updates, offers, and product news will appear here.
//               </Text>
//             </LinearGradient>
//           </Animated.View>
//         ) : (
//           notifications.map((item, index) => (
//             <Animated.View
//               key={item.id}
//               style={fadeUp(cardsAnimRef.current[index], 16, 0.99)}
//             >
//               <LinearGradient
//                 colors={
//                   item.read
//                     ? ['rgba(255,255,255,0.035)', 'rgba(255,255,255,0.015)']
//                     : ['rgba(184,122,86,0.12)', 'rgba(255,255,255,0.02)']
//                 }
//                 style={styles.notificationCard}
//               >
//                 <View style={styles.notificationTop}>
//                   <View style={styles.notificationHeaderLeft}>
//                     <View style={styles.typePill}>
//                       <Text style={styles.typePillText}>{getTypeLabel(item.type)}</Text>
//                     </View>
//                     {!item.read ? <View style={styles.unreadDot} /> : null}
//                   </View>

//                   <Text style={styles.notificationTime}>
//                     {formatTime(item.createdAt)}
//                   </Text>
//                 </View>

//                 <Text style={styles.notificationTitle}>{item.title}</Text>
//                 <Text style={styles.notificationMessage}>{item.message}</Text>

//                 <View style={styles.notificationActions}>
//                   {!item.read ? (
//                     <Pressable
//                       onPress={() => markAsRead(item.id)}
//                       style={({ pressed }) => [
//                         styles.actionButton,
//                         pressed && styles.buttonPressed,
//                       ]}
//                     >
//                       <Text style={styles.actionButtonText}>Mark as read</Text>
//                     </Pressable>
//                   ) : null}

//                   <Pressable
//                     onPress={() => removeNotification(item.id)}
//                     style={({ pressed }) => [
//                       styles.deleteButton,
//                       pressed && styles.buttonPressed,
//                     ]}
//                   >
//                     <Text style={styles.deleteButtonText}>Remove</Text>
//                   </Pressable>
//                 </View>
//               </LinearGradient>
//             </Animated.View>
//           ))
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     paddingHorizontal: 18,
//     paddingTop: 10,
//     paddingBottom: 44,
//     backgroundColor: COLORS.background,
//   },

//   topCard: {
//     borderRadius: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 18,
//     marginBottom: 16,
//   },

//   topChip: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.28)',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     marginBottom: 12,
//   },

//   topChipText: {
//     color: COLORS.primary,
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },

//   topTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 22,
//     fontWeight: '800',
//     marginBottom: 8,
//     lineHeight: 28,
//   },

//   topText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 14,
//   },

//   clearButton: {
//     minHeight: 46,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },

//   clearButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 13,
//     fontWeight: '700',
//   },

//   emptyCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 20,
//     alignItems: 'center',
//   },

//   emptyTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//   },

//   emptyText: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     textAlign: 'center',
//     lineHeight: 20,
//   },

//   notificationCard: {
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     padding: 16,
//     marginBottom: 12,
//   },

//   notificationTop: {
//     marginBottom: 10,
//   },

//   notificationHeaderLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 6,
//   },

//   typePill: {
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(184,122,86,0.10)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.24)',
//     borderRadius: 999,
//     paddingHorizontal: 9,
//     paddingVertical: 5,
//   },

//   typePillText: {
//     color: COLORS.primary,
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 0.6,
//   },

//   unreadDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: COLORS.primary,
//   },

//   notificationTime: {
//     color: COLORS.textMuted,
//     fontSize: 11,
//   },

//   notificationTitle: {
//     color: COLORS.textPrimary,
//     fontSize: 17,
//     fontWeight: '800',
//     marginBottom: 8,
//     lineHeight: 22,
//   },

//   notificationMessage: {
//     color: COLORS.textSecondary,
//     fontSize: 13,
//     lineHeight: 20,
//     marginBottom: 12,
//   },

//   notificationActions: {
//     flexDirection: 'row',
//     gap: 10,
//   },

//   actionButton: {
//     minHeight: 40,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(184,122,86,0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(184,122,86,0.30)',
//   },

//   actionButtonText: {
//     color: COLORS.textPrimary,
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   deleteButton: {
//     minHeight: 40,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(220,53,69,0.16)',
//     borderWidth: 1,
//     borderColor: 'rgba(220,53,69,0.30)',
//   },

//   deleteButtonText: {
//     color: '#FFB8C1',
//     fontSize: 12,
//     fontWeight: '700',
//   },

//   buttonPressed: {
//     opacity: 0.9,
//     transform: [{ scale: 0.97 }],
//   },
// });


import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../theme';
import CommonHeader from '../components/common/CommonHeader';
import { useNotifications } from '../context/NotificationContext';

function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch {
    return '';
  }
}

function getTypeLabel(type) {
  if (type === 'success') return 'MARKETPLACE UPDATE';
  if (type === 'warning') return 'IMPORTANT NOTICE';
  if (type === 'error') return 'ACTION NEEDED';
  return 'APP NEWS';
}

export default function NotificationsScreen({ navigation }) {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotifications();

  const headerAnim = useRef(new Animated.Value(0)).current;
  const topCardAnim = useRef(new Animated.Value(0)).current;
  const emptyAnim = useRef(new Animated.Value(0)).current;
  const cardsAnimRef = useRef([]);

  if (cardsAnimRef.current.length !== notifications.length) {
    cardsAnimRef.current = notifications.map(
      (_, index) => cardsAnimRef.current[index] || new Animated.Value(0)
    );
  }

  useEffect(() => {
    cardsAnimRef.current.forEach((anim) => anim.setValue(0));
    emptyAnim.setValue(0);

    const sequence = [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(topCardAnim, {
        toValue: 1,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ];

    if (notifications.length === 0) {
      sequence.push(
        Animated.timing(emptyAnim, {
          toValue: 1,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );
    } else {
      sequence.push(
        Animated.stagger(
          110,
          cardsAnimRef.current.map((anim) =>
            Animated.timing(anim, {
              toValue: 1,
              duration: 340,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            })
          )
        )
      );
    }

    const intro = Animated.sequence(sequence);
    intro.start();

    return () => {
      intro.stop();
    };
  }, [headerAnim, topCardAnim, emptyAnim, notifications]);

  const fadeUp = (anim, distance = 18, fromScale = 0.985) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [fromScale, 1],
        }),
      },
    ],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <CommonHeader
            navigation={navigation}
            title="Notifications"
            subtitle="Apps Marketplace updates"
            showBack
            rightLabel="Mark all"
            onRightPress={markAllAsRead}
            onNotificationPress={() => {}}
            onProfilePress={() => navigation.navigate('Profile')}
          />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >


        <Animated.View style={fadeUp(topCardAnim, 16, 0.99)}>
          <LinearGradient
            colors={['rgba(255,255,255,0.045)', 'rgba(255,255,255,0.02)']}
            style={styles.topCard}
          >
            <View style={styles.topChip}>
              <Text style={styles.topChipText}>NOTIFICATION CENTER</Text>
            </View>

            <Text style={styles.topTitle}>Stay updated with marketplace activity</Text>
            <Text style={styles.topText}>
              All marketplace updates, featured apps, pricing changes, offers,
              product highlights, profile updates, and inquiries will appear here.
            </Text>

            <Pressable
              onPress={clearAllNotifications}
              style={({ pressed }) => [
                styles.clearButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </Pressable>
          </LinearGradient>
        </Animated.View>

        {notifications.length === 0 ? (
          <Animated.View style={fadeUp(emptyAnim, 18, 0.99)}>
            <LinearGradient
              colors={['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.018)']}
              style={styles.emptyCard}
            >
              <Text style={styles.emptyTitle}>No marketplace notifications</Text>
              <Text style={styles.emptyText}>
                New app updates, offers, and product news will appear here.
              </Text>
            </LinearGradient>
          </Animated.View>
        ) : (
          notifications.map((item, index) => (
            <Animated.View
              key={item.id}
              style={fadeUp(cardsAnimRef.current[index], 16, 0.99)}
            >
              <LinearGradient
                colors={
                  item.read
                    ? ['rgba(255,255,255,0.035)', 'rgba(255,255,255,0.015)']
                    : ['rgba(103,232,240,0.12)', 'rgba(255,255,255,0.02)']
                }
                style={styles.notificationCard}
              >
                <View style={styles.notificationTop}>
                  <View style={styles.notificationHeaderLeft}>
                    <View style={styles.typePill}>
                      <Text style={styles.typePillText}>{getTypeLabel(item.type)}</Text>
                    </View>
                    {!item.read ? <View style={styles.unreadDot} /> : null}
                  </View>

                  <Text style={styles.notificationTime}>
                    {formatTime(item.createdAt)}
                  </Text>
                </View>

                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>

                <View style={styles.notificationActions}>
                  {!item.read ? (
                    <Pressable
                      onPress={() => markAsRead(item.id)}
                      style={({ pressed }) => [
                        styles.actionButton,
                        pressed && styles.buttonPressed,
                      ]}
                    >
                      <Text style={styles.actionButtonText}>Mark as read</Text>
                    </Pressable>
                  ) : null}

                  <Pressable
                    onPress={() => removeNotification(item.id)}
                    style={({ pressed }) => [
                      styles.deleteButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Text style={styles.deleteButtonText}>Remove</Text>
                  </Pressable>
                </View>
              </LinearGradient>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 44,
    backgroundColor: COLORS.background,
  },

  topCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 16,
  },

  topChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,232,240,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(66,221,226,0.28)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },

  topChipText: {
    color: '#67E6E8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  topTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 28,
  },

  topText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },

  clearButton: {
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  clearButtonText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },

  emptyCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    alignItems: 'center',
  },

  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },

  notificationCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 12,
  },

  notificationTop: {
    marginBottom: 10,
  },

  notificationHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },

  typePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(103,232,240,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(66,221,226,0.24)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  typePillText: {
    color: '#67E6E8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: '#67E6E8',
  },

  notificationTime: {
    color: COLORS.textMuted,
    fontSize: 11,
  },

  notificationTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 22,
  },

  notificationMessage: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },

  notificationActions: {
    flexDirection: 'row',
    gap: 10,
  },

  actionButton: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(103,232,240,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(66,221,226,0.30)',
  },

  actionButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },

  deleteButton: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(220,53,69,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(220,53,69,0.30)',
  },

  deleteButtonText: {
    color: '#FFB8C1',
    fontSize: 12,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
});