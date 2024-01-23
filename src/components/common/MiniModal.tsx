import { View, StyleSheet, Modal } from 'react-native';
import Icon from './Icon';

type MiniModalTypes = {
    modalVisible: boolean;
    closeModal?: () => void;
    children?: React.ReactNode;
    confirmAction?: () => void;
};

function MiniModal({
    modalVisible,
    closeModal,
    children,
    confirmAction,
}: Readonly<MiniModalTypes>) {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>{children}</View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 60,
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default MiniModal;
