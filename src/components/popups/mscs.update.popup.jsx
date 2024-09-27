import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCourseInMSCS, fetchAllMSCS } from '../../redux/actions/mscs.action';

const UpdateCoursePopup = ({ setShowPopup, editingCourse, setEditingCourse, setRoadmap }) => {
    const dispatch = useDispatch();
    const [courseDetails, setCourseDetails] = useState({
        courseCode: '',
        subjectName: '',
        creditHours: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingCourse) {
            setCourseDetails(editingCourse);
        }
    }, [editingCourse]);

    const resetForm = () => {
        setCourseDetails({
            courseCode: '',
            subjectName: '',
            creditHours: ''
        });
        setError(null);
    };

    const handleSubmit = async () => {
        try {
            const { roadmapId, _id: courseId } = editingCourse;
            const response = await dispatch(updateCourseInMSCS({ roadmapId, courseId, courseData: courseDetails }));

            if (response.type === 'mscs/updateCourse/fulfilled') {
               
                const fetchResponse = await dispatch(fetchAllMSCS());
                if (fetchResponse.type === 'mscs/fetchAll/fulfilled') {
                    const roadmapData = fetchResponse.payload.reduce((acc, entry) => {
                        const key = `${entry.term} ${entry.year}`;
                        if (!acc[key]) acc[key] = {};
                        
                        entry.courses.forEach(course => {
                            if (!acc[key][entry.semester]) acc[key][entry.semester] = [];
                            acc[key][entry.semester].push({ ...course, roadmapId: entry._id });
                        });

                        return acc;
                    }, {});
                    
                    setRoadmap(roadmapData);
                }

                resetForm();
            } else {
                setError('Failed to update course.');
            }
        } catch (err) {
            console.error('Error updating course:', err);
            setError('An error occurred while updating the course.');
        }

        setShowPopup(false);
        setEditingCourse(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white px-20 py-10 rounded-lg w-3/6">
                <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

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
                    onChange={(e) => setCourseDetails({ ...courseDetails, creditHours: e.target.value })}
                />

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <div className="flex justify-end">
                    <button
                        className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-4"
                        onClick={() => {
                            resetForm();
                            setShowPopup(false);
                            setEditingCourse(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-8 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCoursePopup;
