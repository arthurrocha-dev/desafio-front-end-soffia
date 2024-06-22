import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

type PostModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PostModal: React.FC<PostModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Entypo name="cross" size={40} color="black" onPress={onClose} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nova publicação</Text>
          </View>
          <TextInput placeholder="Adicione um título" style={styles.input} />
          <TextInput
            placeholder="O que gostaria de compartilhar?"
            style={styles.textArea}
            multiline
          />
          <TouchableOpacity style={styles.button}>
            <Octicons
              name="paper-airplane"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  closeButton: {
    fontSize: 18,
    color: "#000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  textArea: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: "top",
    flex: 1,
  },
  button: {
    backgroundColor: "#1E90FF",
    borderRadius: 100,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    transform: [{ rotate: "-35deg" }],
  },
});

export default PostModal;
