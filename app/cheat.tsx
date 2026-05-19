import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// ─── Colors (shared palette) ─────────────────────────────────────────────────

const C = {
  bg: '#0D0D1A',
  card: '#1A1A2E',
  cardBorder: '#2A2A4A',
  yellow: '#FFCB05',
  muted: '#8A8AAA',
  white: '#FFFFFF',
  green: '#27AE60',
  red: '#E74C3C',
  purple: '#6C3483',
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function CheatScreen() {
  // revealed tracks whether the user has pressed "Show Answer"
  const [revealed, setRevealed] = useState(false);

  // useLocalSearchParams reads the params that were passed via router.push
  const { answer } = useLocalSearchParams<{ answer: string }>();

  // The answer param arrives as a string ("true" or "false"), so we convert it
  const isTrue = answer === 'true';
  const correctAnswer = isTrue ? 'TRUE' : 'FALSE';

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Text style={styles.title}>Cheat Mode</Text>
      <Text style={styles.subtitle}>Shhh... no one will know 👀</Text>

      {/* ── Answer Display ── */}
      <View style={styles.answerContainer}>
        {revealed ? (
          // Show the answer once the button has been pressed
          <>
            <Text style={styles.revealedLabel}>The correct answer is:</Text>
            <View style={[styles.answerBadge, isTrue ? styles.trueBadge : styles.falseBadge]}>
              <Ionicons
                name={isTrue ? 'checkmark-circle' : 'close-circle'}
                size={52}
                color={C.white}
              />
              <Text style={styles.answerText}>{correctAnswer}</Text>
            </View>
          </>
        ) : (
          // Hidden state before the button is pressed
          <View style={styles.hiddenContainer}>
            <Text style={styles.hiddenEmoji}>🔒</Text>
            <Text style={styles.hiddenText}>Answer Hidden</Text>
            <Text style={styles.hiddenSubtext}>Press the button below to reveal</Text>
          </View>
        )}
      </View>

      {/* ── Show Answer Button (only visible before reveal) ── */}
      {!revealed && (
        <TouchableOpacity
          style={styles.revealBtn}
          onPress={() => setRevealed(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="eye-outline" size={22} color={C.white} />
          <Text style={styles.revealBtnText}>Show Answer</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: C.yellow,
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: C.muted,
    marginBottom: 52,
  },

  // Answer area
  answerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 44,
  },
  revealedLabel: {
    fontSize: 14,
    color: C.muted,
    marginBottom: 24,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  answerBadge: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 14,
  },
  trueBadge: {
    backgroundColor: C.green,
    shadowColor: C.green,
  },
  falseBadge: {
    backgroundColor: C.red,
    shadowColor: C.red,
  },
  answerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: C.white,
    letterSpacing: 3,
  },

  // Hidden state circle
  hiddenContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.card,
    borderWidth: 2,
    borderColor: C.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  hiddenEmoji: {
    fontSize: 52,
  },
  hiddenText: {
    fontSize: 16,
    color: C.white,
    fontWeight: '600',
  },
  hiddenSubtext: {
    fontSize: 12,
    color: C.muted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // Reveal button
  revealBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: C.purple,
    paddingVertical: 18,
    paddingHorizontal: 44,
    borderRadius: 16,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  revealBtnText: {
    color: C.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
