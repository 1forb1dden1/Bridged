import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Workers.png')}
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Job Helper</ThemedText>
      </ThemedView>

      <ThemedText type="subtitle">
        Need help with a task? 🛠️
      </ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">1️⃣ Open the Lists Tab</ThemedText>
        <ThemedText>
          Tap the Lists tab at the bottom of the screen. Want to create your own? ➕ Click Create List in the bottom right corner.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">2️⃣ Use Voice Search 🎤</ThemedText>
        <ThemedText>
          Tap the microphone icon next to the search bar and speak your request.  
          Example: "How do I make an espresso?" ☕ The app will find the most relevant task for you!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">3️⃣ Follow the Steps ✅</ThemedText>
        <ThemedText>
          Open the task and follow the step-by-step guide. Prefer a visual demo? 🎬 Watch the video tutorial for hands-on guidance!
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
  },
  headerImage: {
    height: 275,
    width: 450,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
