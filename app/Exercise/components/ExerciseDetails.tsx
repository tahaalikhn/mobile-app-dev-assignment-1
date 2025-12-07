import { Exercise } from "@/app/Redux/Exercise";
import React from "react";
import {
  Image,
  Modal,
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface ExerciseDetailModalProps {
  visible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
}

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  visible,
  onClose,
  exercise,
}) => {
  if (!exercise) return null;

  const imageSource: ImageSourcePropType | { uri: string } | null = 
    exercise.image
      ? typeof exercise.image === "string"
        ? { uri: exercise.image }
        : exercise.image
      : null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{exercise.name}</Text>

          {imageSource && (
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.description}>{exercise.desc}</Text>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 18,
  },
  descriptionContainer: {
    maxHeight: 180,
    marginBottom: 22,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    color: "#555",
  },
  closeButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ExerciseDetailModal;
