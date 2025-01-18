import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Video, { VideoRef } from 'react-native-video';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function Lists() {
  const videoRef = useRef<VideoRef>(null);

  const [tasks, setTasks] = useState([
    {
      Task_Name: "How to Screw in a Nail on a Wooden Plank",
      Task_Description: "1. Hammer nail in plank\n2. Hammer",
      Task_Time: 2,
      Task_Video: require('../../assets/Videos/HowToScrew.mp4'),
      Expanded: false,
    },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);

  const removeTask = (index: number) => {
    let object = [...tasks]; // Create a copy of tasks
    object.splice(index, 1); // Remove at that index
    setTasks(object);
  };

  const onBuffer = () => {
    console.log("Buffering...");
  };

  const onError = (error: any) => {
    console.error("Error loading video:", error);
  };

  const handlePlay = (index: number) => {
    setIsPlaying(!isPlaying);
  };

  const toggleTaskExpansion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].Expanded = !updatedTasks[index].Expanded;
    setTasks(updatedTasks);
  };

  const Items = ({ task, index }: { task: any, index: number }) => (
    <View style={styles.item}>
      {/* Title with toggle */}
      <TouchableOpacity onPress={() => toggleTaskExpansion(index)}>
        <Text style={styles.title}>{task.Task_Name}</Text>
      </TouchableOpacity>

      {/* Conditionally render task details based on expansion state */}
      {task.Expanded && (
        <View>
          <Text>{task.Task_Description}</Text>
          <Text>Time: {task.Task_Time} minutes</Text>

          {/* Video Display */}
          <View style={styles.videoContainer}>
            <Video
              source={task.Task_Video}
              ref={videoRef}
              onBuffer={onBuffer}
              onError={onError}
              style={styles.backgroundVideo}
              controls={true}
              muted={true}
            />
          </View>

          {/* Countdown Timer when task is playing */}
          {isPlaying && (
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
          )}

          {/* Start task button */}
          {!isPlaying && (
            <TouchableOpacity onPress={() => handlePlay(index)} style={styles.playButton}>
              <Text style={styles.playText}>Start Task</Text>
            </TouchableOpacity>
          )}

          {/* Delete Button */}
          <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(index)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => <Items task={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    position: 'relative',
  },
  title: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 50,
  },
  deleteText: {
    color: 'white',
    fontSize: 15,
  },
  playButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  playText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200, // Fixed height for the video container
    overflow: 'hidden', // Ensure it doesn't overflow the container
    borderRadius: 8,
    marginTop: 10,
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
});
