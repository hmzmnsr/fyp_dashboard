import React from 'react';

const ProfileTable = ({ profiles, onEdit, onDelete }) => {
  return (
    <div className='py-5'>
      <table className='min-w-full table-fixed bg-white'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='w-1/6 px-4 py-2'>Profile Name</th>
            <th className='w-1/6 px-4 py-2'>Qualification</th>
            <th className='w-1/6 px-4 py-2'>Email</th>
            <th className='w-1/6 px-4 py-2'>Area of Interest</th>
            <th className='w-1/6 px-4 py-2'>About</th>
            <th className='w-1/6 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <tr key={index} className='border-b'>
                <td className='px-4 py-2'>{profile.name}</td>
                <td className='px-4 py-2'>{profile.qualification}</td>
                <td className='px-4 py-2'>{profile.email}</td>
                <td className='px-4 py-2'>{profile.areaOfInterest}</td>
                <td className='px-4 py-2'>{profile.about}</td>
                <td className='px-4 py-2'>
                  <button
                    className='mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded'
                    onClick={() => onEdit(profile)}
                  >
                    Edit
                  </button>
                  <button
                    className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded'
                    onClick={() => onDelete(profile)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6' className='py-4 text-center'>
                No profiles available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
