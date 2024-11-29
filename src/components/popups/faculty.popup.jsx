import React, { useState, useEffect } from 'react';

const AddFacultyPopup = ({ onClose, onAdd, editingFaculty }) => {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [position, setPosition] = useState('Dean');
  const [email, setEmail] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [about, setAbout] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingFaculty) {
      setName(editingFaculty.name);
      setQualification(editingFaculty.qualification);
      setPosition(editingFaculty.position);
      setEmail(editingFaculty.email || '');
      setAreaOfInterest(editingFaculty.areaOfInterest || '');
      setAbout(editingFaculty.about || '');
      setStatus(editingFaculty.status || '');
      setImage(editingFaculty.image || null);
    }
  }, [editingFaculty]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('qualification', qualification);
    formData.append('position', position);
    formData.append('email', email);
    formData.append('areaOfInterest', areaOfInterest);
    formData.append('about', about);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }
    onAdd(formData);
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white px-20 py-10 rounded-lg w-3/6'>
        <h2 className='text-xl font-bold mb-4'>
          {editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Qualification
            </label>
            <input
              type='text'
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            >
              <option value="Dean">Dean</option>
              <option value="HOD">HOD</option>
              <option value="Department Incharge">Department Incharge</option>
              <option value="Professor">Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Incharge">Incharge</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            >
              <option value="Current">Current</option>
              <option value="Left">Left</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Area of Interest
            </label>
            <input
              type='text'
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Image
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              className="px-6 py-2 mr-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='submit'
              className="px-8 py-2 bg-secondary-color text-white rounded"
            >
              {editingFaculty ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFacultyPopup; 
