import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import ButtonPrimary from './ButtonPrimary';

type MiniModalTypes = {
  modalVisible: boolean;
  closeModal: () => void;

  confirmAction: () => void;
};

function MiniModal({
  modalVisible,
  closeModal,
  confirmAction,
}: MiniModalTypes) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>Start Session?</Text>
          <View style={styles.buttonsContainer}>
            <ButtonPrimary
              title='Start'
              onButtonPress={confirmAction}
              width={80}
            />
            <ButtonPrimary
              title='Cancel'
              onButtonPress={closeModal}
              width={80}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MiniModal;
