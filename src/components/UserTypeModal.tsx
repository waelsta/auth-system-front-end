import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectEndpoint, selectModalState } from '../redux/ui/uiSelectors';
import { setParam, ToggleState } from '../redux/ui/uiSlice';

const UserTypeModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const route = useSelector(selectEndpoint);
  const modalState = useSelector(selectModalState);

  const handleClick = (user: string) => {
    dispatch(setParam(user));
    navigate(route);
    dispatch(ToggleState());
  };

  return (
    <div>
      <React.Fragment>
        <Modal show={modalState} size="xl">
          <Modal.Body>
            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Select your user type:
              </p>
              <Button onClick={() => handleClick('client')}> Client</Button>
              <Button onClick={() => handleClick('employee')}>Employee</Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default UserTypeModal;
