import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCourseInBSCS } from '../../redux/actions/bscs.action';

const UpdateCoursePopup = ({ setShowPopup, editingCourse, addRoadmapEntry, setEditingCourse, setRoadmap }) => {
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
            const response = await dispatch(updateCourseInBSCS({ roadmapId, courseId, courseData: courseDetails }));
        
            if (response.type === 'bscs/updateCourse/fulfilled') {
                setRoadmap((prevRoadmap) => {
                    const termYear = `${editingCourse.term} ${editingCourse.year}`;
                    const semester = editingCourse.semester;
    
                    // Check if the termYear and semester exist in the roadmap
                    if (prevRoadmap[termYear] && prevRoadmap[termYear][semester]) {
                        // Map over the courses to find the one to update
                        const updatedCourses = prevRoadmap[termYear][semester].map((course) =>
                            course._id === courseId ? { ...course, ...courseDetails } : course
                        );
    
                        // Return the updated roadmap with the updated courses
                        return {
                            ...prevRoadmap,
                            [termYear]: {
                                ...prevRoadmap[termYear],
                                [semester]: updatedCourses
                            }
                        };
                    }
    
                    // If for some reason the termYear or semester doesn't exist, just return the previous state
                    return prevRoadmap;
                });
    
                resetForm();
            } else {
                setError('Failed to update course.');
            }
        } catch (err) {
            console.error('Error in updating course:', err);
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
