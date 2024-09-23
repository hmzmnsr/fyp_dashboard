import React from "react";

const BSCSTable = ({ semester, roadmap, onEdit, onDelete }) => {
    return (
        <div className="my-5 bg-white p-4 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Semester {semester}</h4>
            {roadmap.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Course Code</th>
                            <th className="border px-4 py-2">Subject Name</th>
                            <th className="border px-4 py-2">Credit Hours</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roadmap.map((course) => (
                            <tr key={course._id}>
                                <td className="border px-4 py-2">{course.courseCode}</td>
                                <td className="border px-4 py-2">{course.subjectName}</td>
                                <td className="border px-4 py-2">{course.creditHours}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => onEdit(course)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
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
