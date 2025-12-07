import React, { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { addExercise, Exercise } from "@/app/Redux/Exercise";

interface AddExerciseModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get("window");

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ visible, onClose }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    if (!exerciseName.trim()) return;

    const newExercise: Exercise = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: exerciseName.trim(),
      desc: exerciseDescription.trim(),
      image: selectedImageUri,
    };

    dispatch(addExercise(newExercise));

    setExerciseName("");
    setExerciseDescription("");
    setSelectedImageUri(null);
    onClose();
  }, [exerciseName, exerciseDescription, selectedImageUri, dispatch, onClose]);

  const handleImageSelection = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setSelectedImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  }, []);

  const handleCancel = useCallback(() => {
    setExerciseName("");
    setExerciseDescription("");
    setSelectedImageUri(null);
    onClose();
  }, [onClose]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Add New Exercise</Text>

            <TextInput
              placeholder="Exercise Name"
              value={exerciseName}
              onChangeText={setExerciseName}
              style={styles.input}
              autoCapitalize="words"
              placeholderTextColor="#999"
            />

            <TextInput
              placeholder="Description"
              value={exerciseDescription}
              onChangeText={setExerciseDescription}
              style={[styles.input, styles.descriptionInput]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.imagePickerButton} onPress={handleImageSelection}>
              <Text style={styles.imagePickerText}>
                {selectedImageUri ? "Change Image" : "Pick Image"}
              </Text>
            </TouchableOpacity>

            {selectedImageUri && (
              <Image source={{ uri: selectedImageUri }} style={styles.previewImage} />
            )}

            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 18,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 18,
    backgroundColor: "#f8f8f8",
    marginBottom: 12,
  },
  descriptionInput: {
    height: 110,
    paddingTop: 10,
  },
  imagePickerButton: {
    backgroundColor: "#4a4bff",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: width * 0.4,
    borderRadius: 14,
    marginBottom: 16,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: "green",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    elevation: 2,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default AddExerciseModal;
