import React from "react";

const BSCSTable = ({ semester, roadmap, onEdit, onDelete }) => {
    return (
        <div className="my-5 bg-white p-4 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-4 pl-2 text-primary-color">Semester {semester}</h4>
            {roadmap.length > 0 ? (
                <table className="min-w-full table-auto border-collapse text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Course Code</th>
                            <th className="border px-4 py-2">Subject Name</th>
                            <th className="border px-4 py-2">Credit Hours</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roadmap.map((course, index) => (
                            <tr key={course._id || index}>
                                <td className="border px-4 py-2">{course.courseCode}</td>
                                <td className="border px-4 py-2">{course.subjectName}</td>
                                <td className="border px-4 py-2">{course.creditHours}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="mr-2 px-6 py-2 bg-secondary-color hover:bg-blue-800 text-white rounded"
                                        onClick={() => onEdit(course)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                                        onClick={() => onDelete(course)}
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
