import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import FlexContainer from "../../components/containers/flex.container";
import ADPCSPopup from "../../components/popups/adpcs.popup";
import UpdateCoursePopup from "../../components/popups/adpcs.update.popup";
import ADPCSTable from "../../components/tables/adpcs.table";
import { fetchAllADPCS, deleteADPCS } from "../../redux/actions/adpcs.action";

const ADPCS = () => {
    const dispatch = useDispatch();
    const [roadmap, setRoadmap] = useState({});
    const [roadmapIds, setRoadmapIds] = useState({});
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(fetchAllADPCS());
                if (response.type === 'adpcs/fetchAll/fulfilled') {
                    const roadmapData = response.payload.reduce((acc, entry) => {
                        const key = `${entry.term} ${entry.year}`;
                        if (!acc[key]) acc[key] = {};
                        
                        entry.courses.forEach(course => {
                            if (!acc[key][entry.semester]) acc[key][entry.semester] = [];
                            acc[key][entry.semester].push({ ...course, roadmapId: entry._id });
                        });

                        if (!acc[key].roadmapId) {
                            acc[key].roadmapId = entry._id;
                        }

                        return acc;
                    }, {});

                    const roadmapIdData = response.payload.reduce((acc, entry) => {
                        const key = `${entry.term} ${entry.year}`;
                        acc[key] = entry._id;
                        return acc;
                    }, {});

                    setRoadmap(roadmapData);
                    setRoadmapIds(roadmapIdData);
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
        setShowAddPopup(true);
    };

    const handleEditCourse = (termYear, semester, course) => {
        setEditingCourse(course);
        setShowEditPopup(true);
    };

    const handleDeleteRoadmap = async (roadmapId) => {
        try {
            const response = await dispatch(deleteADPCS(roadmapId));
            if (response.type === 'adpcs/delete/fulfilled') {
                setRoadmap(prevRoadmap => {
                    const updatedRoadmap = { ...prevRoadmap };
                    Object.keys(updatedRoadmap).forEach(termYear => {
                        if (roadmapIds[termYear] === roadmapId) {
                            delete updatedRoadmap[termYear];
                        }
                    });
                    return updatedRoadmap;
                });
            } else {
                setError("Failed to delete roadmap.");
            }
        } catch (error) {
            setError("Error deleting roadmap.");
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
                            <div className="grid grid-cols-12 border-b-4 border-red-500 items-center">
                                <h3 className="text-2xl font-bold pb-4 pt-5 text-primary-color col-span-8">
                                    {termYear.charAt(0).toUpperCase() + termYear.slice(1)}
                                </h3>
                                <div className="col-span-4 flex justify-end mr-2">
                                    <button
                                        className="h-10 w-24 rounded bg-red-500 text-white"
                                        onClick={() => handleDeleteRoadmap(roadmapIds[termYear])}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
    
                            {Object.keys(roadmap[termYear]).map((sem) => (
                                roadmap[termYear][sem] && Array.isArray(roadmap[termYear][sem]) ? (
                                    <ADPCSTable
                                        key={sem}
                                        semester={sem}
                                        roadmap={roadmap[termYear][sem]}
                                        onEdit={(course) => handleEditCourse(termYear, sem, course)}
                                        setRoadmap={setRoadmap}
                                        termYear={termYear}
                                    />
                                ) : null
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
                <ADPCSPopup
                    setShowPopup={setShowAddPopup}
                    addRoadmapEntry={addRoadmapEntry}
                />
            )}

            {showEditPopup && (
                <UpdateCoursePopup
                    setShowPopup={setShowEditPopup}
                    editingCourse={editingCourse}
                    addRoadmapEntry={addRoadmapEntry}
                    setEditingCourse={setEditingCourse}
                    setRoadmap={setRoadmap}
                />
            )}

            <div className='pb-2'></div>
        </FlexContainer>
    );
};

export default ADPCS;
