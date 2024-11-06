import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

const ScanTestScreen = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [hasCamera, setHasCamera] = useState(null);

    useEffect(() => {
        checkCameraAvailability();
    }, []);

    const checkCameraAvailability = async () => {
        try {
            if (Platform.OS === 'web') {
                console.log('Checking web camera availability...');
                const browserSupport = await checkBrowserSupport();
                console.log('Browser camera support result:', browserSupport);
                setHasCamera(browserSupport);
            } else {
                const cameraExists = await Camera.isAvailableAsync();
                console.log('Native camera check result:', cameraExists);
                setHasCamera(cameraExists);
            }
        } catch (error) {
            console.error('Camera check error:', error);
            setHasCamera(false);
        }
    };

    const checkBrowserSupport = async () => {
        try {
            // Check if we're in a secure context (HTTPS or localhost)
            if (!window.isSecureContext) {
                console.log('Not in secure context - camera requires HTTPS');
                return false;
            }

            // Check if navigator exists
            if (!navigator) {
                console.log('Navigator API not available');
                return false;
            }

            // Check for mediaDevices API
            if (!navigator.mediaDevices) {
                console.log('MediaDevices API not available');
                
                // Check for older APIs
                const oldAPI = navigator.getUserMedia || 
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia;
                
                if (!oldAPI) {
                    console.log('No camera APIs available on this browser');
                    return false;
                }

                // If we have an old API, we can use it
                navigator.mediaDevices = {
                    getUserMedia: function(constraints) {
                        return new Promise((resolve, reject) => {
                            oldAPI.call(navigator, constraints, resolve, reject);
                        });
                    }
                };
            }

            // Try enumerating devices first (this might work even if getUserMedia fails)
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const hasVideoInput = devices.some(device => device.kind === 'videoinput');
                console.log('Video input available:', hasVideoInput);
                if (hasVideoInput) {
                    console.log('Camera access successful');
                    return true;
                }
            } catch (err) {
                // If enumerating devices fails, try getUserMedia
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        console.log('Camera access successful');
                        return true;
                    }
                } catch (err) {
                    console.error('Camera access failed:', err);
                    return false;
                }
            }

            return false;
        } catch (err) {
            // Different error types indicate different situations
            if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                console.log('No camera detected on this device');
                return false;
            } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                console.log('Camera permission denied');
                setHasPermission(false);
                return true; // Camera exists but permission denied
            } else {
                console.error('Browser camera check error:', err);
                return false;
            }
        }
    };

    const checkCameraPermissions = async () => {
        if (hasCamera) {
            try {
                if (Platform.OS === 'web') {
                    // On web, if we got here, we already have permissions from checkBrowserSupport
                    setHasPermission(true);
                } else {
                    const { status } = await Camera.requestCameraPermissionsAsync();
                    setHasPermission(status === 'granted');
                }
            } catch (error) {
                console.error('Permission check error:', error);
                setHasPermission(false);
            }
        }
    };

    useEffect(() => {
        if (hasCamera) {
            checkCameraPermissions();
        }
    }, [hasCamera]);

    const scanTest = async () => {
        if (hasCamera === false) {
            Alert.alert('No Camera Available', 
                'This device does not have a camera available for scanning.');
            return;
        }

        if (hasPermission === null) {
            return;
        }

        if (hasPermission === false) {
            Alert.alert('Camera Permission Required', 
                'We require camera access to scan codes. Please enable camera permissions in your device settings.');
            return;
        }

        navigation.navigate('ScanResults' as never);
    };

    const renderContent = () => {
        console.log('Render state:', { hasCamera, hasPermission });

        if (hasCamera === null) {
            return (
                <View style={styles.cameraContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Checking camera availability...</Text>
                    </View>
                </View>
            );
        }

        if (hasCamera === false) {
            return (
                <View style={styles.cameraContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>No Camera Available</Text>
                        <Text style={styles.messageSubtext}>This device does not have a camera for scanning</Text>
                    </View>
                </View>
            );
        }

        if (hasPermission === null) {
            return (
                <View style={styles.cameraContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Checking camera permissions...</Text>
                    </View>
                </View>
            );
        }
        
        if (hasPermission === false) {
            return (
                <View style={styles.cameraContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Camera Access Required</Text>
                        <Text style={styles.messageSubtext}>Please enable camera permissions in your device settings</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    barCodeScannerSettings={{
                        barCodeTypes: ['qr', 'pdf417'],
                    }}
                >
                    <View style={styles.overlay}>
                        <View style={styles.scanArea} />
                    </View>
                </Camera>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Scan Code</Text>
                
                {renderContent()}

                <View style={styles.bottomSection}>
                    <Text style={styles.instructions}>
                        Hold camera over the code
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C026D3',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        padding: 16,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: '#C026D3',
    },
    camera: {
        flex: 1,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    messageText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    messageSubtext: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    instructions: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanArea: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 1,
    },
});

export default ScanTestScreen;
