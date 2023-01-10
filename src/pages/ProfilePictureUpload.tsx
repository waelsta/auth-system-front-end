import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentClient } from '../redux/client/ClientSelectors';
import { IClient } from '../types/client';

const ProfilePictureUpload = () => {
  const user: IClient | null = useSelector(selectCurrentClient);

  const pictureSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    // if (file && user) {
    //   user.profile_picture = file;
    // }
  };
  const dispatch = useDispatch();
  const pictureUploadHandler = () => {
    if (user) {
      const formData = new FormData();
      formData.append('profile_picture', user.profile_picture_url);
      dispatch(clientUpdateProfilePicture(formData));
    }
  };
  return (
    <div>
      <label
        onChange={() => pictureSelectedHandler}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
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

function clientUpdateProfilePicture(formData: FormData): any {
  throw new Error('Function not implemented.');
}
