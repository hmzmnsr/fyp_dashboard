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
            const { roadmapId, _id: courseId } = editingCourse; // Extract roadmap and course IDs
            const response = await dispatch(updateCourseInBSCS({ roadmapId, courseId, courseData: courseDetails }));
        
            if (response.type === 'bscs/updateCourse/fulfilled') {
                // Update the course in the existing roadmap entry
                setRoadmap((prevRoadmap) => {
                    // Find the termYear and semester using the editingCourse object (not the updated courseDetails)
                    const termYear = `${editingCourse.term} ${editingCourse.year}`;
                    const semester = editingCourse.semester;
    
                    // Update the existing course in the roadmap
                    const updatedCourses = prevRoadmap[termYear]?.[semester]?.map((course) =>
                        course._id === courseId ? { ...course, ...courseDetails } : course
                    );
    
                    // Return the updated roadmap with the modified course
                    return {
                        ...prevRoadmap,
                        [termYear]: {
                            ...prevRoadmap[termYear],
                            [semester]: updatedCourses
                        }
                    };
                });
        
                resetForm(); // Reset form on successful update
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

                {/* Always show these fields for updating */}
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
