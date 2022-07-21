import { FunctionComponent, ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Image from 'next/image';

export interface CreateGroupModalProps {
  isOpen: boolean;
  onRequestClose: () => unknown;
  onCreateGroup: (peerAddresses: string[]) => unknown;
}

export const CreateGroupModal: FunctionComponent<CreateGroupModalProps> = ({
  isOpen,
  onRequestClose,
  onCreateGroup,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [peerAddresses, setPeerAddresses] = useState<Set<string>>(new Set());

  const addPeerAddress = (peerAddress: string) => {
    setPeerAddresses((prev) => {
      const result = new Set(prev);
      result.add(peerAddress);
      return result;
    });
  };

  const removePeerAddress = (peerAddress: string) => {
    setPeerAddresses((prev) => {
      const result = new Set(prev);
      result.delete(peerAddress);
      return result;
    });
  };

  const handleClose = () => {
    onRequestClose();
    setPeerAddresses(new Set());
    setInputValue('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="_"
      overlayClassName="_"
      contentElement={(props, children) => (
        <ModalStyle {...props}>{children}</ModalStyle>
      )}
      overlayElement={(props, contentElement) => (
        <OverlayStyle {...props}>{contentElement}</OverlayStyle>
      )}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}>
      <ModalHeader>
        <ModalTitle>Create a Group</ModalTitle>
        <ModalClose onClick={handleClose}>
          <Image
            src="/assets/images/MobileX.svg"
            alt="plus"
            height={16}
            width={16}
          />
        </ModalClose>
      </ModalHeader>
      <ModalFormTitle>ADD ADDRESSES</ModalFormTitle>
      <ModalForm
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          inputValue.length > 0 && addPeerAddress(inputValue);
          setInputValue('');
        }}>
        <ModalFormItem>
          <AddAddressInput
            // type="submit"
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(e);
              console.log('changed');
              setInputValue(e.target.value);
            }}
            placeholder="Enter an address..."
            spellCheck={false}
          />
          <Image
            src="/assets/images/plus-grey.svg"
            alt="plus"
            height={16}
            width={16}
          />
        </ModalFormItem>
      </ModalForm>
      {peerAddresses.size > 0 && (
        <AddressesList>
          {Array.from(peerAddresses)
            .reverse()
            .map((peerAddress) => {
              return (
                <ModalFormItem key={peerAddress}>
                  <AddressItem>{peerAddress}</AddressItem>
                  <RemoveAddress onClick={() => removePeerAddress(peerAddress)}>
                    <Image
                      src="/assets/images/MobileTrashCan.svg"
                      alt="plus"
                      height={16}
                      width={16}
                    />
                  </RemoveAddress>
                </ModalFormItem>
              );
            })}
        </AddressesList>
      )}
      <Buttons>
        <ModalButton
          onClick={() => onCreateGroup(Array.from(peerAddresses))}
          disabled={peerAddresses.size < 1}>
          Create Group
        </ModalButton>
        <ModalCancel onClick={handleClose}>Cancel</ModalCancel>
      </Buttons>
    </Modal>
  );
};

const AddressesList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow-y: scroll;
`;

const RemoveAddress = styled.button`
  border: 0;
  outline: 0;
  margin: 0;
  padding: 0;
  background: none;
  cursor: pointer;
`;

const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  width: 467px;
  background: white;
  border: 2px solid #402b5b;
  border-radius: 8px;
`;

const OverlayStyle = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3500;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h3`
  height: 24px;
  font-weight: 700;
  font-size: 1rem;
  line-height: 24px;
  color: #252727;
  margin-left: auto;
`;

const ModalClose = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  margin-left: auto;
`;

const ModalForm = styled.form``;

const ModalFormItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  border: 2px solid #271d47;
  border-radius: 8px;
  margin: 12px 0;
  margin-bottom: 12px;
  color: #75668c;
  padding: 12px 16px;
`;

const AddAddressInput = styled.input`
  outline: none;
  border: none;
  background: none;
  color: #252727;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  ::placeholder {
    color: #75668c;
  }
`;

const ModalFormTitle = styled.h1`
  height: 16px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #252727;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const AddressItem = styled.h6`
  color: #252727;
  font-size: 14px;
`;

const ModalButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  height: 3rem;
  border-radius: 8px;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #5a46c6;

  :disabled {
    color: #75668c;
    background: #31243c;
    cursor: default;
  }
  margin-bottom: 12px;
`;

const ModalCancel = styled(ModalButton)`
  background: none;
  border: 2px solid #1c1026;
  color: #252727;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  width: 100%;
  margin-bottom: -12px;
`;
