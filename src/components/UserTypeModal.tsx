import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUserType } from '../redux/rootSelectors';
import { selectModalRoute, selectModalState } from '../redux/ui/uiSelectors';
import { closeModal, clearModalRoute, toggleModal } from '../redux/ui/uiSlice';

const UserTypeModal: React.FC = () => {
  const [userType, setUserType] = useState<string>(
    useSelector(selectCurrentUserType)
  );
  const navigate = useNavigate();

  const handleUserTypeSelection = (user: string) => {
    setUserType(user);
    dispatch(toggleModal());
  };

  const modalRoute = useSelector(selectModalRoute);
  const modalState = useSelector(selectModalState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userType !== '') {
      navigate(`${modalRoute}/${userType}`);
    }
  }, [userType, modalRoute, modalState]);

  return (
    <div>
      <React.Fragment>
        <Modal show={modalState} size="xl" onClose={dispatch(closeModal)}>
          <Modal.Body>
            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Select your user type:
              </p>
              <Button onClick={() => handleUserTypeSelection('client')}>
                Client
              </Button>
              <Button onClick={() => handleUserTypeSelection('employee')}>
                Employee
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default UserTypeModal;
