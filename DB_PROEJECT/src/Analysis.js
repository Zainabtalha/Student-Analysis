import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Analysis() {
    const [analysisData, setAnalysisData] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [suggestedCourses, setSuggestedCourses] = useState([]);
    //const studentId = localStorage.getItem('loggedInID');
    const [transcript, setTranscript] = useState([]);
    const [transcriptData, setTranscriptData] = useState([]);

    useEffect(() => {
        // Fetch semester-wise course SGPA data
        const fetchAnalysisData = async () => {
            try {
                const studentId = localStorage.getItem('loggedInID');
                const response = await axios.get(`http://localhost:8081/semesterAnalysis/${studentId}`);
                const semesterData = response.data;

                // Fetch course categories
                const categoryResponse = await axios.get('http://localhost:8081/courseCategories');
                const categories = categoryResponse.data;

                // Fetch course GPAs
                const gpaResponse = await axios.get(`http://localhost:8081/courseGPA/${studentId}`);
                const gpas = gpaResponse.data;

                // Combine data
                const combinedData = semesterData.map((semester) =>
                    semester.map((course) => {
                        const category = categories.find((cat) => cat.course_id === course.course_id)?.category || 'Unknown';
                        const courseGPA = gpas.find((gpa) => gpa.course_id === course.course_id)?.course_gpa || 0;
                        return { ...course, category, course_gpa: courseGPA };
                    })
                );

                setAnalysisData(combinedData);

                // Set course details
                const details = combinedData.flat();
                setCourseDetails(details);
            } catch (error) {
                console.error('Failed to fetch analysis data:', error);
            }
        };

        fetchAnalysisData();
    }, []);

    useEffect(() => {
        const fetchCurrentSemester = async () => {
            try {
                const studentId = localStorage.getItem('loggedInID');
                const response = await axios.get(`http://localhost:8081/getCurrentSemester/${studentId}`);
                const currentSemester = response.data;
                //currentSemester = parseInt(currentSemester);
                console.log('semester: ',currentSemester);

                // Fetch transcript data for each semester until currentSemester - 1
                const transcriptData = await Promise.all(
                    Array.from({ length: currentSemester}, (_, semester) => {
                        console.log('here')
                        // Add 1 to semester because it starts from 0
                        semester += 1;
                        return axios.get(`http://localhost:8081/getTranscript/${studentId}/${semester}`);
                    })
                );

                console.log('Transcript Data:', transcriptData.map(response => response.data));
                setTranscriptData(transcriptData); // Update transcriptData
            } catch (error) {
                console.error('Error fetching current semester:', error);
            }
        };

        fetchCurrentSemester();
    }, []);

    useEffect(() => {
        // Create a bar chart for each semester
        analysisData.forEach((semesterData, index) => {
            if (!Array.isArray(semesterData) || semesterData.length === 0) {
                // Handle the case when semesterData is not an array or is empty
                console.error(`Invalid data for semester ${index + 2}`);
                return;
            }

            const labels = semesterData.map((data) => `${data.course_id} (${data.category})`);
            const data = semesterData.map((data) => data.course_gpa);

            const canvasId = `myChart-${index}`;
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');

            // Destroy existing Chart instance
            Chart.getChart(canvasId)?.destroy();

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Semester ${index + 1}`, // Adjusted here
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                        hoverBorderColor: 'rgba(75,192,192,1)',
                        data: data,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // This option ensures the chart does not maintain an aspect ratio
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        });

        // Cleanup all Chart instances when the component unmounts
        return () => {
            analysisData.forEach((_, index) => {
                const canvasId = `myChart-${index}`;
                const canvas = document.getElementById(canvasId);

                // Destroy existing Chart instance
                Chart.getChart(canvasId)?.destroy();
            });
        };
    }, [analysisData]);

    useEffect(() => {
        // Analyze feedback and suggest next semester courses
        analyzeFeedback(courseDetails);
    }, [courseDetails]);
    useEffect(() => {
        // Watch for changes in transcriptData and update transcript accordingly
        setTranscript(transcriptData.map(response => response.data));
    }, [transcriptData]);

    const analyzeFeedback = async (details) => {
        // Calculate average GPA for each category
        const categoryGPA = details.reduce((acc, course) => {
            if (!acc[course.category]) {
                acc[course.category] = { totalGPA: 0, count: 0 };
            }
            acc[course.category].totalGPA += course.course_gpa;
            acc[course.category].count += 1;
            return acc;
        }, {});

        // Calculate average GPA and prioritize categories
        const categoryPriority = Object.keys(categoryGPA).map((category) => ({
            category,
            averageGPA: categoryGPA[category].totalGPA / categoryGPA[category].count,
        })).sort((a, b) => b.averageGPA - a.averageGPA);

        // Generate feedback
        let feedbackMessage = 'Feedback: ';

        if (categoryPriority.length > 0) {
            feedbackMessage += 'You excel in the following categories:';
            categoryPriority.forEach((item) => {
                feedbackMessage += ` ${item.category} (Average GPA: ${item.averageGPA.toFixed(2)}),`;
            });
            // Remove the trailing comma
            feedbackMessage = feedbackMessage.slice(0, -1);
        }

        // Set feedback
        setFeedback(feedbackMessage);

        // Suggest next semester courses based on top two categories
        try {
            const studentId = localStorage.getItem('loggedInID');
            const response = await axios.get(`http://localhost:8081/nextSemesterCourses/${studentId}`);


            console.log('API Response:', response.data);
            const suggestedCourses = response.data;

            // Log the suggested courses
            console.log('Suggested Courses for Next Semester:', suggestedCourses);

            // Set suggested courses state
            setSuggestedCourses(suggestedCourses);
        } catch (error) {
            console.error('Failed to fetch suggested courses for the next semester:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Grades Analysis</h2>
            {analysisData.map((_, index) => (
                <div key={index} className="mb-5">
                    <canvas id={`myChart-${index}`} width="400" height="200"></canvas>
                </div>
            ))}
            <div className="mt-5">
                <h3>Course Details:</h3>
                <ul>
                    {courseDetails.map((data, dataIndex) => (
                        <li key={dataIndex}>
                            {`Course: ${data.course_id}, Category: ${data.category}, GPA: ${data.course_gpa}`}
                        </li>
                    ))}
                </ul>
                <p>{feedback}</p>
                {suggestedCourses.length > 0 && (
                    <div>
                        <h3>Suggested Courses for Next Semester:</h3>
                        <ul>
                            {suggestedCourses.map((course, index) => (
                                <li key={index}>{`Course: ${course.course_id}, Category: ${course.category}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {transcript.length === 0 ? (
                <p>No transcript data available.</p>
            ) : (
                transcript.map((semesterInfo, index) => (
                    <div key={index}>
                        <h2>Semester {semesterInfo.semester}</h2>
                        <ul>
                            {semesterInfo.courses.map((course) => (
                                <li key={course.course_id}>
                                    {course.course_name} - GPA: {course.course_gpa}
                                </li>
                            ))}
                        </ul>
                        <p>Semester GPA: {semesterInfo.sgpa}</p>
                        <p>CGPA: {semesterInfo.cgpa}</p>
                    </div>
                ))
            )}



        </div>
    );
}
export default Analysis;