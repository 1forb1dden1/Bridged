import { Image, StyleSheet, Platform } from 'react-native';

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
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Application Purpose</ThemedText>
      </ThemedView>
      
      <ThemedText type="subtitle">User's will be able to navigate through a list of pre-curated tasks. They can quickly search through for tasks to help match their specific needs.</ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Click the Lists Tab</ThemedText>
        <ThemedText>
            Tap the Create List tab on the bottom right corner of the screen.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Press the microphone icon next to the search bar</ThemedText>
        <ThemedText>
          Speak into your device specifiying the needs you may have. An example may be "I don't know how to create an espresso".
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Open the task that shown</ThemedText>
        <ThemedText>
            Open the task and follow the steps as outlined or watch the video for guidance on your needs!
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
    marginBottom: 8,
    fontWeight: 'normal',
  },
  reactLogo: {
    height: 275,
    width: 450,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
