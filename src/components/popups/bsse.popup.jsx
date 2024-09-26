import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBSSE } from '../../redux/actions/bsse.action';

const BSSEPopup = ({ setShowPopup, addRoadmapEntry }) => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('fall');
    const [year, setYear] = useState('2023');
    const [semester, setSemester] = useState('');
    const [courseDetails, setCourseDetails] = useState({
        courseCode: '',
        subjectName: '',
        creditHours: ''
    });
    const [error, setError] = useState(null);

    const resetForm = () => {
        setTerm('fall');
        setYear('2023');
        setSemester('');
        setCourseDetails({
            courseCode: '',
            subjectName: '',
            creditHours: ''
        });
        setError(null);
    };

    const handleSubmit = async () => {
        if (!courseDetails.courseCode || !courseDetails.subjectName || !courseDetails.creditHours || !semester) {
            setError('All fields must be filled.');
            return;
        }

        try {
            const newCourseData = {
                term,
                year,
                semester,
                courses: [courseDetails],
            };
            const response = await dispatch(createBSSE(newCourseData));

            if (response?.type === 'bsse/create/fulfilled') {
                addRoadmapEntry(term, year, semester, courseDetails);
                resetForm();
                setShowPopup(false);
            } else {
                setError(response?.error?.message || 'Failed to create course.');
            }
        } catch (err) {
            console.error('Error in course creation:', err);
            setError(err.message || 'An error occurred while saving the course.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white px-20 py-10 rounded-lg w-3/6">
                <h2 className="text-2xl font-bold mb-4">Add Roadmap</h2>

                <label className="block mb-2">Select Term:</label>
                <select
                    className="w-full mb-4 p-2 border"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                >
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                </select>

                <label className="block mb-2">Select Year:</label>
                <select
                    className="w-full mb-4 p-2 border"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    {Array.from({ length: 28 }, (_, i) => (
                        <option key={i} value={2023 + i}>{2023 + i}</option>
                    ))}
                </select>

                <label className="block mb-2">Select Semester:</label>
                <select
                    className="w-full mb-4 p-2 border"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                >
                    <option value="">--Select Semester--</option>
                    {Array.from({ length: 8 }, (_, i) => (
                        <option key={i} value={i + 1}>Semester {i + 1}</option>
                    ))}
                </select>

                <label className="block mb-2">Course Code:</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border"
                    value={courseDetails.courseCode}
                    onChange={(e) => setCourseDetails({ ...courseDetails, courseCode: e.target.value })}
                />

                <label className="block mb-2">Subject Name:</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border"
                    value={courseDetails.subjectName}
                    onChange={(e) => setCourseDetails({ ...courseDetails, subjectName: e.target.value })}
                />

                <label className="block mb-2">Credit Hours:</label>
                <input
                    type="number"
                    className="w-full mb-4 p-2 border"
                    value={courseDetails.creditHours}
                    onChange={(e) => setCourseDetails({ ...courseDetails, creditHours: Number(e.target.value) })}
                />

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <div className="flex justify-end">
                    <button
                        className="px-5 py-2 bg-gray-300 text-black hover:bg-gray-400 rounded mr-4"
                        onClick={() => {
                            resetForm();
                            setShowPopup(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BSSEPopup;
