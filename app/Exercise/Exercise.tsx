import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ListRenderItem,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Exercise } from "../Redux/Exercise";
import AddExerciseModal from "./components/AddExerciseModal";
import ExerciseDetailModal from "./components/ExerciseDetails";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 66) / 2; // 2-column layout with margins

const ExerciseScreen: React.FC = () => {
  const [modalState, setModalState] = useState({
    addOpen: false,
    detailOpen: false,
    currentExercise: null as Exercise | null,
  });

  const exercises = useSelector((state: any) => state.exercise.items);

  const openAddModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, addOpen: true }));
  }, []);

  const closeAddModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, addOpen: false }));
  }, []);

  const openDetailModal = useCallback((exercise: Exercise) => {
    setModalState({ addOpen: false, detailOpen: true, currentExercise: exercise });
  }, []);

  const closeDetailModal = useCallback(() => {
    setModalState({ addOpen: false, detailOpen: false, currentExercise: null });
  }, []);

  const renderExerciseItem: ListRenderItem<Exercise> = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => openDetailModal(item)}
      >
        {item.image && <Image source={item.image as any} style={styles.cardImage} />}
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    ),
    [openDetailModal]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Exercises</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExerciseItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addButtonText}>+ Add Exercise</Text>
      </TouchableOpacity>

      <AddExerciseModal visible={modalState.addOpen} onClose={closeAddModal} />
      <ExerciseDetailModal
        visible={modalState.detailOpen}
        onClose={closeDetailModal}
        exercise={modalState.currentExercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    paddingTop: 60,
    backgroundColor: "#0e0f24",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1c1d3a",
    borderRadius: 16,
    width: CARD_WIDTH,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardTextContainer: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4a4bff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ExerciseScreen;
