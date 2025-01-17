import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as dbRef, get, update } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import Button from '../components/Button';

const EditProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: '',
    fullname: { firstname: '', lastname: '' },
    gender: 'male',
    height: '',
    weight: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        loadUserData(user.uid);
      } else {
        navigation.replace('Login');
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      const snapshot = await get(dbRef(database, 'UserProfile/' + userId));
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Changes",
      "Are you sure you want to cancel? Any unsaved changes will be lost.",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          onPress: () => {
            setIsEditing(false);
          }
        }
      ]
    );
  };

  const handleSave = async () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save these changes?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          onPress: async () => {
            try {
              await update(dbRef(database, 'UserProfile/' + currentUser.uid), userData);
              setIsEditing(false);
              Alert.alert("Success", "Profile updated successfully!");
            } catch (error) {
              console.error("Error updating profile:", error);
              Alert.alert("Error", "Failed to update profile. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        {!isEditing ? (
          <View style={styles.profileInfo}>
            <Text style={styles.infoText}>Username: {userData.username}</Text>
            <Text style={styles.infoText}>Name: {`${userData.fullname.firstname} ${userData.fullname.lastname}`}</Text>
            <Text style={styles.infoText}>Gender: {userData.gender}</Text>
            <Text style={styles.infoText}>Height: {userData.height} cm</Text>
            <Text style={styles.infoText}>Weight: {userData.weight} kg</Text>
            <Button title="Edit Profile" onPress={handleEdit} style={styles.editButton} />
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={userData.username}
                onChangeText={(text) => setUserData({ ...userData, username: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.input}
                value={userData.fullname.firstname}
                onChangeText={(text) => setUserData({ ...userData, fullname: { ...userData.fullname, firstname: text } })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={styles.input}
                value={userData.fullname.lastname}
                onChangeText={(text) => setUserData({ ...userData, fullname: { ...userData.fullname, lastname: text } })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Gender:</Text>
              <Picker
                selectedValue={userData.gender}
                onValueChange={(itemValue) => setUserData({ ...userData, gender: itemValue })}
                style={styles.picker}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Height (cm):</Text>
              <TextInput
                style={styles.input}
                value={userData.height.toString()}
                onChangeText={(text) => setUserData({ ...userData, height: text })}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Weight (kg):</Text>
              <TextInput
                style={styles.input}
                value={userData.weight.toString()}
                onChangeText={(text) => setUserData({ ...userData, weight: text })}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Save Changes" onPress={handleSave} style={styles.saveButton} />
              <Button title="Cancel" onPress={handleCancel} style={styles.cancelButton} />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  header: {
    backgroundColor: '#82c4c3',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#82c4c3',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#82c4c3',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    flex: 1,
    marginLeft: 10,
  },
});

export default EditProfileScreen;

