import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexContainer from "../../components/containers/flex.container";
import BSCSPopup from "../../components/popups/bscspopup";  // Add Popup
import UpdateCoursePopup from "../../components/popups/updatecoursepopup";
import BSCSTable from "../../components/tables/bscs.table";
import { fetchAllBSCS, deleteCourseInBSCS } from "../../redux/actions/bscs.action";

const BSCS = () => {
    const dispatch = useDispatch();
    const [roadmap, setRoadmap] = useState({});
    const [showAddPopup, setShowAddPopup] = useState(false);  // For Add Popup
    const [showEditPopup, setShowEditPopup] = useState(false);  // For Edit Popup
    const [editingCourse, setEditingCourse] = useState(null);
    const [error, setError] = useState(null);

    useSelector((state) => state.bscsData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(fetchAllBSCS());
                if (response.type === 'bscs/fetchAll/fulfilled') {
                    const roadmapData = response.payload.reduce((acc, entry) => {
                        const key = `${entry.term} ${entry.year}`;
                        if (!acc[key]) acc[key] = {};
                        
                        entry.courses.forEach(course => {
                            if (!acc[key][entry.semester]) acc[key][entry.semester] = [];

                            if (!acc[key][entry.semester].some(c => c.courseCode === course.courseCode)) {
                                acc[key][entry.semester].push({ ...course, roadmapId: entry._id });
                            }
                        });
                        return acc;
                    }, {});
                    setRoadmap(roadmapData);
                } else {
                    setError("Failed to load roadmap data.");
                }
            } catch (error) {
                setError("Error fetching roadmap data.");
            }
        };
    
        fetchData();
    }, [dispatch]);

    const addRoadmapEntry = (term, year, semester, courseDetails) => {
        const termYear = `${term} ${year}`;
        setRoadmap(prevRoadmap => ({
            ...prevRoadmap,
            [termYear]: {
                ...prevRoadmap[termYear],
                [semester]: [...(prevRoadmap[termYear]?.[semester] || []), courseDetails]
            }
        }));
    };

    const handleAddRoadmap = () => {
        setEditingCourse(null); 
        setShowAddPopup(true);  // Show add popup
    };

    const handleEditCourse = (termYear, semester, course) => {
        setEditingCourse(course);
        setShowEditPopup(true);  // Show edit popup
    };

    const handleDeleteCourse = async (termYear, semester, course) => {
        const courseId = course._id;
        const roadmapId = course.roadmapId;
        try {
            const response = await dispatch(deleteCourseInBSCS({ roadmapId, courseId }));
            if (response.type === 'bscs/deleteCourse/fulfilled') {
                const updatedCourses = roadmap[termYear][semester].filter(c => c._id !== courseId);
                setRoadmap(prevRoadmap => ({
                    ...prevRoadmap,
                    [termYear]: {
                        ...prevRoadmap[termYear],
                        [semester]: updatedCourses,
                    },
                }));
            } else {
                setError("Failed to delete course.");
            }
        } catch (error) {
            setError("Failed to delete course.");
        }
    };

    const renderRoadmapContent = () => {
        return (
            <>
                {Object.keys(roadmap).length === 0 ? (
                    <div className="text-center py-4">No roadmap data available</div>
                ) : (
                    Object.keys(roadmap).map((termYear) => (
    <div key={termYear} className='my-10 px-10 py-5 bg-gray-200'>
        <h3 className="text-2xl font-bold mb-8 pb-4 pt-5 text-primary-color border-b-4 border-red-500">
            {termYear.charAt(0).toUpperCase() + termYear.slice(1)}
        </h3>
        {Object.keys(roadmap[termYear]).map((sem) => (
            roadmap[termYear][sem] && Array.isArray(roadmap[termYear][sem]) ? (
                <BSCSTable
                    key={sem}
                    semester={sem}
                    roadmap={roadmap[termYear][sem]}
                    onEdit={(course) => handleEditCourse(termYear, sem, course)}
                    onDelete={(course) => handleDeleteCourse(termYear, sem, course)}
                />
            ) : (
                <p key={sem}>No courses available for this semester.</p>
            )
        ))}
                        </div>
                    ))
                )}
            </>
        );
    };

    return (
        <FlexContainer className="flex-col w-full">
            <div className="grid grid-cols-12 mt-10">
                <div className="col-span-9">
                    <h2 className="text-2xl font-semibold text-primary-color">Semesters Roadmap</h2>
                </div>
                <div className="col-span-3 flex justify-end">
                    <button
                        className="px-6 py-3 bg-secondary-color rounded-xl text-white"
                        onClick={handleAddRoadmap}
                    >
                        Add Roadmap
                    </button>
                </div>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            {renderRoadmapContent()}

            {showAddPopup && (
                <BSCSPopup
                    setShowPopup={setShowAddPopup}  // Use setShowAddPopup
                    addRoadmapEntry={addRoadmapEntry}
                />
            )}

            {showEditPopup && (
                <UpdateCoursePopup
                    setShowPopup={setShowEditPopup}  // Use setShowEditPopup
                    editingCourse={editingCourse}
                    addRoadmapEntry={addRoadmapEntry}
                    setEditingCourse={setEditingCourse}
                    setRoadmap={setRoadmap}  // Pass setRoadmap as a prop
                />
            )}

            <div className='pb-2'></div>
        </FlexContainer>
    );
};

export default BSCS;
