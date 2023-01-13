import Alert from '../components/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAlert } from '../components/Alert';
import {
  selectCurrentClient,
  selectResponse,
  selectShowAlert
} from '../redux/client/ClientSelectors';
import { clientProfilePictureUpload } from '../redux/client/clientSlice';
import { IClient } from '../types/client';

const ProfilePictureUpload = () => {
  const user: IClient | null = useSelector(selectCurrentClient);
  let pfp_url = '';
  let pfp: File | null = null;
  const pictureSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      pfp = file;
      pfp_url = URL.createObjectURL(file);
    }
  };

  const showAlert: boolean = useSelector(selectShowAlert);
  const response: IAlert | null = useSelector(selectResponse);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (showAlert) setShow(true);
    else setShow(false);
  }, [showAlert]);

  const dispatch = useDispatch();
  const pictureUploadHandler = () => {
    if (user) {
      const formData = new FormData();
      console.log(pfp, '     ', pfp_url);
      pfp
        ? formData.append('profile_picture', pfp)
        : formData.append('profile_picture', '');
      dispatch(clientProfilePictureUpload({ pfp: { ...formData }, pfp_url }));
    }
  };
  return (
    <div id="picture-upload-page" className="h-screen p-10">
      {show && <Alert message={response?.message} error={response?.error} />}
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        onChange={pictureSelectedHandler}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG or JPG (MAX. 800x400px).
      </p>
      <button onClick={pictureUploadHandler}>Save Picture</button>
    </div>
  );
};

export default ProfilePictureUpload;
