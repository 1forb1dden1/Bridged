import React, { useState } from 'react';
import { useEvent } from 'expo';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useVideoPlayer, VideoView } from 'expo-video';

const videoSource = "";

export default function Lists() {
  
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  
  const [tasks, setTasks] = useState([{
    Task_Name: "How to Screw in a Nail on a Wooden Plank",
    Task_Description: "1. Hammer nail in plank\n2. Hammer",
    Task_Time: 30,
    Task_Video: require('../../assets/Videos/HowToScrew.mp4'),
    Expanded: false,
  }]);

  const [timeStart, setTimeStart] = useState(false);
  const [playingTaskIndex, setPlayingTaskIndex] = useState<number | null>(null);

  const removeTask = (index: number) => {
    let object = [...tasks];
    object.splice(index, 1);
    setTasks(object);
  };

  const handlePlay = (index: number) => {
    if (playingTaskIndex === index) {
      setTimeStart(false);
      setPlayingTaskIndex(null); // Stop playback
    } else {
      setTimeStart(true);
      setPlayingTaskIndex(index); // Start playback
    }
  };

  const toggleTaskExpansion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].Expanded = !updatedTasks[index].Expanded;
    setTasks(updatedTasks);
  };

  const Items = ({ task, index }: { task: any, index: number }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleTaskExpansion(index)}>
        <Text style={styles.title}>{task.Task_Name}</Text>
      </TouchableOpacity>

      {task.Expanded && (
        <View>
          <Text>{task.Task_Description}</Text>
          <Text>Time: {task.Task_Time} seconds</Text>
          <VideoView style={styles.video} player={useVideoPlayer(task.Task_Video)} allowsFullscreen allowsPictureInPicture />
          {timeStart && playingTaskIndex === index && (
            <View>
              <CountdownCircleTimer
                isPlaying
                duration={task.Task_Time}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }) => <Text>{remainingTime}</Text>}
              </CountdownCircleTimer>
              <TouchableOpacity onPress={() => handlePlay(index)} style={styles.playButton}>
                <Text style={styles.playText}>Stop Task</Text>
              </TouchableOpacity>
            </View>
          )}

          {!timeStart && playingTaskIndex !== index && (
            <TouchableOpacity onPress={() => handlePlay(index)} style={styles.playButton}>
              <Text style={styles.playText}>Start Task</Text>
            </TouchableOpacity>
          )}

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
    height: 200,
    overflow: 'hidden',
    borderRadius: 8,
    marginTop: 10,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
});
