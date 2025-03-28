import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Camera = () => {
    const [loading, setLoading] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if (permission) {
        if (!permission.granted) {
            requestPermission();
        }
    }

    const takePicture = async () => {
        setLoading(true);
        const response = await cameraRef.current.takePictureAsync();
        playSound();
        console.log(response)
        setLoading(false);
    }

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync({
          uri: 'https://res.cloudinary.com/mouss/video/upload/v1742964704/music_test/mxvfvh432bjf0dgsempt.mp3'
        });
        sound.playAsync();
      }

  return (
    <>
        <View
            style={styles.cameraContainer}
        >
            <CameraView
                style={styles.cameraView}
                ref={cameraRef}
                autofocus='on'
                
            >
            </CameraView>
            <View
                style={styles.actions}
            >
                
                <TouchableHighlight
                    // activeOpacity={0}
                    underlayColor={"gray"}
                    style={styles.touchablePicture}
                    onPress={() => takePicture()}
                >
                    <MaterialIcons name='camera' size={50} color={'black'} />
                </TouchableHighlight>
            </View>
        </View>
    </>
  )
}

export default Camera;

const styles = StyleSheet.create({
    cameraContainer: {
        backgroundColor: 'black',
        flex: 1
    },
    cameraView: {
        flex: 1
    },
    actions: {
        height: 75,
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        width: '100%'
    },
    touchablePicture: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 5
    }
})
