import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function Transcript() {
    const [transcriptData, setTranscriptData] = useState([]);

    useEffect(() => {
        const fetchTranscriptData = async () => {
            try {
                const studentId = localStorage.getItem('loggedInID');
                const response = await axios.get(`http://localhost:8081/transcript/${studentId}`);
                setTranscriptData(response.data.transcript);
            } catch (error) {
                console.error('Failed to fetch transcript data:', error);
            }
        };

        fetchTranscriptData();
    }, []);

    // Prepare data for Chart.js
    const chartData = {
        labels: transcriptData.map((data) => `Semester ${data.semester}`),
        datasets: [
            {
                label: 'SGPA',
                data: transcriptData.map((data) => data.sgpa),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 4.0, // Assuming SGPA is on a scale of 0 to 4.0
            },
        },
    };

    return (
        <div className="container mt-5">
            <h2>Transcript</h2>
            {transcriptData.length > 0 ? (
                <div className="mb-5">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            ) : (
                <p>No transcript data available.</p>
            )}
        </div>
    );
}

export default Transcript;
