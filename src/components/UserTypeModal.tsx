import React from 'react';
import { Modal } from 'flowbite-react';
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
    if (route === 'signup') {
      navigate(`${user}/${route}`);
      dispatch(ToggleState());
    } else {
      navigate(route);
      dispatch(ToggleState());
    }
  };

  return (
    <div>
      <React.Fragment>
        <Modal show={modalState} size="xl">
          <Modal.Header onClick={() => dispatch(ToggleState())}>
            Choose your user type
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6 p-6 flex flex-col items-center">
              <button
                className="w-10/12 shadow-md bg-[#3F83F7] hover:bg-[#3F89F7] font:bold rounded-sm text-left p-5 text-white flex justify-between"
                onClick={() => handleClick('client')}
              >
                <p>Client</p>
              </button>
              <button
                className="w-10/12 shadow-md bg-[#3F83F7] hover:bg-[#3F89F7] font:bold rounded-sm text-left p-5 text-white flex justify-between"
                onClick={() => handleClick('employee')}
              >
                Employee
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default UserTypeModal;
