import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Question = {
  question: string;
  answer: boolean;
};

const QUESTIONS: Question[] = [
  {
    question: 'Rhydon was the very first Pokémon ever designed by Game Freak.',
    answer: true,
  },
  {
    question: "Pikachu's original design was based on a squirrel, not a mouse.",
    answer: true,
  },
  {
    question:
      "In Japan, the original Pokémon games were released as 'Red' and 'Green', not 'Red' and 'Blue'.",
    answer: true,
  },
  {
    question:
      'In Generation I, Ghost-type moves had no effect on Psychic-types due to a programming bug.',
    answer: true,
  },
  {
    question: 'Shedinja always has exactly 1 HP, no matter how high its level.',
    answer: true,
  },
  {
    question: 'Wobbuffet can learn fewer than five moves across its entire learnset.',
    answer: true,
  },
  {
    question: 'Gengar is the evolved form of Clefable.',
    answer: false,
  },
  {
    question: 'Charizard is a Dragon-type Pokémon.',
    answer: false,
  },
  {
    question:
      'Kadabra can evolve into Alakazam without trading, by reaching a high enough level.',
    answer: false,
  },
  {
    question: 'Jynx originally had a black face design before it was changed to purple.',
    answer: true,
  },
];

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

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const current = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const goNext = () => setCurrentIndex((i) => (i + 1) % QUESTIONS.length);
  const goPrev = () => setCurrentIndex((i) => (i - 1 + QUESTIONS.length) % QUESTIONS.length);

  const handleAnswer = (userAnswer: boolean) => {
    if (userAnswer === current.answer) {
      Alert.alert('Correct!', 'Nice work!', [{ text: 'Next Question', onPress: goNext }]);
    } else {
      Alert.alert('Not Quite.', 'Give it another try', [{ text: 'Try Again' }]);
    }
  };

  const handleCheat = () => {
    router.push({ pathname: '/cheat', params: { answer: current.answer.toString() } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={C.bg} />

      <View style={styles.header}>
        <Text style={styles.title}>Pokémon Quiz</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>
          Question {currentIndex + 1} of {QUESTIONS.length}
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons name="help-circle" size={36} color={C.yellow} style={styles.cardIcon} />
        <Text style={styles.questionText}>{current.question}</Text>
      </View>

      <View style={styles.answerRow}>
        <Pressable
          style={({ pressed }) => [styles.answerBtn, styles.trueBtn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => handleAnswer(true)}
        >
          <Ionicons name="checkmark-circle-outline" size={28} color={C.white} />
          <Text style={styles.answerBtnText}>TRUE</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.answerBtn, styles.falseBtn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => handleAnswer(false)}
        >
          <Ionicons name="close-circle-outline" size={28} color={C.white} />
          <Text style={styles.answerBtnText}>FALSE</Text>
        </Pressable>
      </View>

      <View style={styles.navRow}>
        <Pressable
          style={({ pressed }) => [styles.navBtn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={goPrev}
        >
          <Ionicons name="chevron-back-circle" size={22} color={C.yellow} />
          <Text style={styles.navBtnText}>Prev</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.cheatBtn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={handleCheat}
        >
          <Ionicons name="eye-outline" size={18} color={C.white} />
          <Text style={styles.cheatBtnText}>Cheat</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.navBtn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={goNext}
        >
          <Text style={styles.navBtnText}>Next</Text>
          <Ionicons name="chevron-forward-circle" size={22} color={C.yellow} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: C.yellow,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: C.muted,
    marginTop: 4,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabel: {
    color: C.muted,
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressTrack: {
    height: 6,
    backgroundColor: C.card,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: C.yellow,
    borderRadius: 3,
  },
  card: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 28,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: C.cardBorder,
    shadowColor: C.yellow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 14,
  },
  questionText: {
    fontSize: 20,
    color: C.white,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '500',
  },
  answerRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  answerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  trueBtn: {
    backgroundColor: C.green,
    shadowColor: C.green,
  },
  falseBtn: {
    backgroundColor: C.red,
    shadowColor: C.red,
  },
  answerBtnText: {
    color: C.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
    flex: 1,
    justifyContent: 'center',
  },
  navBtnText: {
    color: C.yellow,
    fontSize: 15,
    fontWeight: '600',
  },
  cheatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: C.purple,
    borderRadius: 14,
    shadowColor: C.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  cheatBtnText: {
    color: C.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
