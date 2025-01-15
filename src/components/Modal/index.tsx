import { Portal, Modal as PaperModal } from "react-native-paper";

interface Props {
  visible: boolean;
  hideModal: () => void;
  contentContainerStyle: object;
  children: React.ReactNode;
  closeOnTouchOutside?: boolean;
}

export const Modal = ({
  contentContainerStyle,
  hideModal,
  visible,
  children,
  closeOnTouchOutside = true,
}: Props) => {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={contentContainerStyle}
        dismissable={closeOnTouchOutside}
      >
        {children}
      </PaperModal>
    </Portal>
  );
};
