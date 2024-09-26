import React from "react";
import { useDispatch } from "react-redux";
import { deleteCourseInBSCS } from "../../redux/actions/bscs.action";

const BSCSTable = ({ semester, roadmap, onEdit, setRoadmap, termYear }) => {
    const dispatch = useDispatch();

    const handleDeleteCourse = async (course) => {
        const courseId = course._id;
        const roadmapId = course.roadmapId;

        try {
            const response = await dispatch(deleteCourseInBSCS({ roadmapId, courseId }));

            if (response.type === 'bscs/deleteCourse/fulfilled') {
                setRoadmap(prevRoadmap => {
                    const updatedCourses = prevRoadmap[termYear][semester].filter(c => c._id !== courseId);
                    return {
                        ...prevRoadmap,
                        [termYear]: {
                            ...prevRoadmap[termYear],
                            [semester]: updatedCourses,
                        },
                    };
                });
            } else {
                console.error("Failed to delete course.");
            }
        } catch (error) {
            console.error("Failed to delete course.", error);
        }
    };

    return (
        <div className="my-5 bg-white p-4 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-4 pl-2 text-primary-color">Semester {semester}</h4>
           
            {roadmap.length > 0 ? (
                <table className="min-w-full table-auto border-collapse text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2" style={{ width: '150px' }}>Course Code</th>
                            <th className="border px-4 py-2" style={{ width: '250px' }}>Subject Name</th>
                            <th className="border px-4 py-2" style={{ width: '150px' }}>Credit Hours</th>
                            <th className="border px-4 py-2" style={{ width: '200px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roadmap.map((course, index) => (
                            <tr key={course._id || index}>
                                <td className="border px-4 py-2" style={{ width: '150px' }}>{course.courseCode}</td>
                                <td className="border px-4 py-2" style={{ width: '250px' }}>{course.subjectName}</td>
                                <td className="border px-4 py-2" style={{ width: '150px' }}>{course.creditHours}</td>
                                <td className="border px-4 py-2" style={{ width: '200px' }}>
                                    <button
                                        className="mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded"
                                        onClick={() => onEdit(course)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                                        onClick={() => handleDeleteCourse(course)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No courses available for this semester.</p>
            )}
        </div>
    );
};

export default BSCSTable;
