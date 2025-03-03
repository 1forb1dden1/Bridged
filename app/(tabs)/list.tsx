import React, { useState, useEffect } from 'react';
import { useEvent } from 'expo';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Button, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';


//https://platform.openai.com/docs/overview
import OpenAI from "openai";

const openai = new OpenAI({
  //apiKey:
  dangerouslyAllowBrowser: true
});


const videoSource = "";

export default function lists() {
  
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  
  const [tasks, setTasks] = useState([
  {
    Task_Name: "How to Steam Milk",
    Task_Description: "1. Pour cold milk into a steaming pitcher.\n2. Place the steam wand just below the milk's surface.\n3. Turn on the steam and create a vortex.\n4. Heat until it reaches about 150°F (65°C).\n5. Tap the pitcher to remove bubbles and swirl before pouring.",
    Task_Time: 30,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
  },
  {
    Task_Name: "How to prepare Espresso",
    Task_Description: "1. Grind fresh coffee beans to a fine consistency.\n2. Tamp the grounds evenly into the portafilter.\n3. Lock the portafilter into the espresso machine.\n4. Start the extraction process and brew for about 25-30 seconds.\n5. Serve immediately.",
    Task_Time: 30,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
  },
  {
    Task_Name: "How to prepare Tapioca",
    Task_Description: "1. Boil water in a pot.\n2. Add tapioca pearls and stir gently.\n3. Cook for about 15-20 minutes until translucent.\n4. Remove from heat and let sit for 5 minutes.\n5. Rinse under cold water and soak in syrup if desired.",
    Task_Time: 30,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
  },

  {
    Task_Name: "How to make French Press Coffee",
    Task_Description: "1. Boil water and let it cool for about 30 seconds.\n2. Grind coffee beans to a coarse consistency.\n3. Add coffee grounds to the French Press (about 1:15 coffee-to-water ratio).\n4. Pour in hot water and stir gently.\n5. Place the lid on the press and let it steep for 4 minutes.\n6. Slowly press the plunger down and serve immediately.",
    Task_Time: 30,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to Froth Milk",
    Task_Description: "1. Pour cold milk into a frothing pitcher.\n2. Place the steam wand just below the surface of the milk.\n3. Turn on the steam and create a swirling motion.\n4. Keep frothing until the milk reaches around 150°F (65°C).\n5. Tap the pitcher to remove large bubbles and swirl the milk before serving.",
    Task_Time: 15,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to make Iced Latte",
    Task_Description: "1. Brew a shot of espresso and let it cool.\n2. Fill a glass with ice.\n3. Pour the cooled espresso over the ice.\n4. Add cold milk to fill the glass and stir gently.\n5. Optional: Add flavored syrup or sweetener of your choice.",
    Task_Time: 10,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to make Matcha Latte",
    Task_Description: "1. Sift matcha powder into a bowl.\n2. Add a small amount of hot water and whisk until smooth.\n3. Heat milk in a saucepan or with a frothing wand.\n4. Pour the matcha mixture into a cup and top with the hot milk.\n5. Stir gently and enjoy.",
    Task_Time: 15,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to make Chai Latte",
    Task_Description: "1. Brew chai tea using tea bags or loose tea.\n2. Heat milk in a saucepan until warm but not boiling.\n3. Mix the brewed tea with the warm milk.\n4. Add sweetener or spices to taste (like cinnamon or ginger).\n5. Stir and serve immediately.",
    Task_Time: 15,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to prepare Cold Brew Coffee",
    Task_Description: "1. Coarsely grind coffee beans.\n2. Combine coffee grounds with cold water in a large jar (1:4 coffee-to-water ratio).\n3. Stir and let the mixture sit at room temperature for 12-24 hours.\n4. Strain the coffee using a fine mesh sieve or cheesecloth.\n5. Serve over ice with milk or sweetener if desired.",
    Task_Time: 30,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to make Hot Chocolate",
    Task_Description: "1. Heat milk or water in a saucepan over medium heat.\n2. Add cocoa powder and sugar, stirring until dissolved.\n3. Bring to a gentle boil, then reduce the heat and simmer for a few minutes.\n4. Pour into a cup and top with whipped cream or marshmallows if desired.",
    Task_Time: 15,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
{
    Task_Name: "How to Make Iced Tea",
    Task_Description: "1. Boil water and steep your choice of tea bags for 5 minutes.\n2. Let the tea cool to room temperature.\n3. Pour over ice in a glass.\n4. Optional: Add lemon, mint, or sweetener to taste.",
    Task_Time: 15,
    Task_Video: require('../../assets/Videos/HowToMakeTea.mp4'),
    Expanded: false,
},
]);

  const [timeStart, setTimeStart] = useState(false);
  const [playingTaskIndex, setPlayingTaskIndex] = useState<number | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatGPTOutput, setChatGPTOutput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const removeTask = (input: string) => {
    const updatedTasks = [...tasks];
    for (let i = 0; i < updatedTasks.length; i++) {
      if (updatedTasks[i].Task_Name === input) {
        updatedTasks.splice(i, 1); // Removes the task at the given index
        break; // Exit the loop after removal
      }
    }
    setTasks(updatedTasks);
  };
  
  // Start Timer
  const handlePlay = (index: number) => {
    if (playingTaskIndex === index) {
      setTimeStart(false);
      setPlayingTaskIndex(null); // Stop playback
    } else {
      setTimeStart(true);
      setPlayingTaskIndex(index); // Start playback
    }
  };

  const toggleTaskExpansion = (input: string) => {
    console.log(input);
    const updatedTasks = [...tasks];
    for (let i = 0; i < updatedTasks.length; i++) {
      if (updatedTasks[i].Task_Name === input) {
        updatedTasks[i].Expanded = !updatedTasks[i].Expanded;
      }
    }
    setTasks(updatedTasks);
  };

  const addNewTask = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        alert("You need to enable permission to access the library!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        // Convert input time to number, default to 30 if invalid
        const taskTime = parseInt(newTaskTime) || 30;
        
        const newTask = {
          Task_Name: newTaskName || "New Video Task",
          Task_Description: newTaskDescription || "Add description here",
          Task_Time: taskTime,
          Task_Video: result.assets[0].uri,
          Expanded: false,
        };
        
        setTasks([...tasks, newTask]);
        setNewTaskName("");
        setNewTaskDescription("");
        setNewTaskTime("");
        setIsAddingTask(false);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video");
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.Task_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.Task_Description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const Items = ({ task, index }: { task: any, index: number }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleTaskExpansion(task.Task_Name)}>
        <Text style={styles.title}>{task.Task_Name}</Text>
      </TouchableOpacity>

      {task.Expanded && (
        <View>
          <Text>{task.Task_Description}</Text>
          <Text>Time: {task.Task_Time} seconds</Text>
          <VideoView 
            style={styles.video} 
            player={useVideoPlayer(task.Task_Video, player => {
              player.loop = true;
              player.play();
            })} 
            allowsFullscreen 
            allowsPictureInPicture 
          />
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

          <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(task.Task_Name)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleChatGPTQuery = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            role: "user",
            content: `These are all of our tasks: ${JSON.stringify(tasks)}, the user is providing this prompt: "${searchQuery}". Return the Task_Name of the best task to specify their needs. Only respond with the task name, do not reply with no relevent task. Must return something.`,
          },
        ],
      });
  
      const responseText = completion.choices[0]?.message?.content ?? '';
      setChatGPTOutput(responseText);
      setSearchQuery(responseText);
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
    }
  };  
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, isListening && styles.searchInputListening]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search tasks..."
            placeholderTextColor="#666"
            onSubmitEditing={handleChatGPTQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          )}
          {/*
          <TouchableOpacity 
            style={[
              styles.voiceButton, 
              isListening && styles.voiceButtonActive
            ]}
            onPress={isListening ? stopVoiceSearch : startVoiceSearch}
          >
            <Ionicons 
              name={isListening ? "mic" : "mic-outline"} 
              size={24} 
              color={isListening ? "#4CAF50" : "#666"} 
            />
          </TouchableOpacity>
        */}
        </View>
        <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => setIsAddingTask(true)}
          >
            <Text style={styles.uploadButtonText}>Add New Task</Text>
          </TouchableOpacity>
        {isAddingTask ? (
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.input}
              value={newTaskName}
              onChangeText={setNewTaskName}
              placeholder="Enter task name"
              placeholderTextColor="#666"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              placeholder="Enter task description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />
            <TextInput
              style={styles.input}
              value={newTaskTime}
              onChangeText={setNewTaskTime}
              placeholder="Enter task time (in seconds)"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.uploadButton]}
                onPress={addNewTask}
              >
                <Text style={styles.buttonText}>Upload Video</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsAddingTask(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => handleChatGPTQuery()}
          >
            <Text style={styles.uploadButtonText}>Advanced Search</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={filteredTasks}
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
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addTaskContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingRight: 80,
  },
  searchInputListening: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 60,
    top: 24,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#e8f5e9',
  },
  clearButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
});
