import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Behaviouranalysis.css'; // Import your custom CSS file

// Helper function for overall analysis
const getOverallAnalysis = (studyHours, classParticipation, extracurricular, wayOfStudy) => {
    // Placeholder conditions (customize based on your analysis criteria)
    if (
        studyHours >= 7 &&
        classParticipation === 'Highly-Active-Participation' &&
        extracurricular === 'Coding-Competitions' &&
        wayOfStudy === 'Self-Study'
    ) {
        return (
            'Outstanding overall behavior! Your commitment to academic excellence is commendable. ' +
            'Participating in coding competitions, maintaining good study hours, actively engaging in class, and choosing self-study reflect a well-rounded approach.'
        );
    } else if (
        studyHours >= 4 &&
        classParticipation === 'Moderate-Participation' &&
        extracurricular === 'Sports' &&
        wayOfStudy === 'Group-Study'
    ) {
        return (
            'Good overall behavior! Balancing studies with sports participation indicates a well-rounded approach. ' +
            'Your preference for group study sessions adds a collaborative aspect to your learning, providing diverse perspectives and shared understanding.'
        );
    } else if (
        studyHours >= 4 &&
        classParticipation === 'Limited-Participation' &&
        extracurricular === 'Music' &&
        wayOfStudy === 'Online-Courses'
    ) {
        return (
            'Moderate overall behavior! While your involvement in music is appreciated, consider increasing study hours ' +
            'and engaging more actively in class discussions. Taking advantage of online courses can further enhance your academic growth.'
        );
    } else if (
        studyHours < 4 ||
        classParticipation === 'Limited-Participation' ||
        extracurricular === 'other'
    ) {
        return (
            'Consider increasing study hours and engaging more actively in class discussions. ' +
            'Participation in extracurricular activities can significantly contribute to your overall development.'
        );
    } else {
        return 'Overall analysis summary goes here.';
    }
};

// Helper function to provide individual descriptions for extracurricular activities
const getExtracurricularDescription = (activity) => {
    switch (activity) {
        case 'Coding-Competitions':
            return 'Participating in coding competitions is an excellent way to enhance your problem-solving skills and stay updated on programming challenges.';
        case 'Hackathons-and-coding-marathons':
            return 'Engaging in hackathons and coding marathons allows you to work on real-world projects, collaborate with peers, and showcase your coding skills.';
        case 'AI-and-machine-learning-projects':
            return 'Exploring AI and machine learning projects opens up opportunities to dive into cutting-edge technologies and contribute to advancements in the field.';
        case 'Tech-meetups-and-networking-events':
            return 'Attending tech meetups and networking events provides valuable insights, connects you with industry professionals, and broadens your knowledge of the tech landscape.';
        case 'Sports':
            return 'Participating in sports activities promotes physical well-being, teamwork, and discipline.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
            
        case 'Music':
            return 'Involvement in music activities fosters creativity, expression, and appreciation for the arts.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'Art':
            return 'Engaging in art activities allows for self-expression and the development of artistic skills.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'Leadership':
            return 'Taking on leadership roles helps build essential skills such as decision-making, communication, and teamwork.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'Volunteering':
            return 'Volunteering is a meaningful way to contribute to the community, develop empathy, and gain valuable life experiences.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'Open-source-contributions':
            return 'Contributing to open-source projects allows you to collaborate with a global community and enhance your programming skills.';
        case 'Online-courses-and-certifications':
            return 'Pursuing online courses and certifications provides opportunities for continuous learning and skill development.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'Debate-and-public-speaking-literary-clubs':
            return 'Participating in debate, public speaking, and literary clubs hones your communication and critical thinking abilities.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'App-and-software-development':
            return 'Engaging in app and software development activities lets you apply your programming skills to create practical solutions.';
        case 'Photography-or-media-related-activities':
            return 'Involvement in photography or media-related activities allows you to express creativity through visual storytelling.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
        case 'Outdoor-activities-hiking-or-adventure-clubs':
            return 'Participating in outdoor activities, hiking, or adventure clubs promotes physical fitness and a connection with nature.Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
      case 'other':
            return 'Consider providing specific details about your other extracurricular activities to receive personalized feedback and suggestions.';
    
            default:
                if (!isCSActivity(activity)) {
                    return 'Engaging in computer science-related activities can contribute significantly to your academic improvement. Consider participating in coding competitions, hackathons, and other CS-related events.';
                }
    }
};

// Function to check if an activity is computer science-related
const isCSActivity = (activity) => {
    const csRelatedActivities = [
        'Coding-Competitions',
        'Hackathons-and-coding-marathons',
        'AI-and-machine-learning-projects',
        'Tech-meetups-and-networking-events',
        'Open-source-contributions',
        'App-and-software-development',
    ];

    return csRelatedActivities.includes(activity);
};

function BehaviourAnalysis() {
    const [behaviorData, setBehaviorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBehaviorData = async () => {
            try {
                const studentId = localStorage.getItem('loggedInID');
                const response = await axios.get(`http://localhost:8081/getBehaviour/${studentId}`);
                setBehaviorData(response.data);
            } catch (error) {
                console.error('Error fetching behavior data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBehaviorData();
    }, []);

    if (loading) {
        return <p>Loading behavior data...</p>;
    }

    if (!behaviorData) {
        return <p>No behavior data available for the current student.</p>;
    }

    // Perform analysis based on the received behaviorData
    const { study_hours, way_of_study, class_participation, extracurricular } = behaviorData;

    // Example analysis logic
    const studyHoursAnalysis =
        study_hours >= 7
            ? 'Great job on allocating sufficient study hours!'
            : study_hours >= 4 && study_hours < 7
            ? 'You are putting in a decent effort. Consider increasing study hours for even better results.'
            : 'Consider dedicating more time to your studies for improved performance.';

    const participationAnalysis =
        class_participation === 'Highly-Active-Participation'
            ? 'Your active participation in class is commendable!'
            : class_participation === 'Moderate-Participation'
            ? 'Keep up the good work with your moderate class participation.'
            : class_participation === 'Limited-Participation'
            ? 'Consider engaging more actively in class discussions and activities.'
            : 'No participation information available.';

    const wayOfStudyAnalysis =
        way_of_study === 'Self-Study'
            ? 'You have chosen self-study as your way of learning. This independent approach allows you to tailor your study sessions to your preferences and pace.'
            : way_of_study === 'Group-Study'
            ? 'You prefer learning through group study sessions. Collaborative learning can provide diverse perspectives and shared understanding of the subject matter.'
            : way_of_study === 'Online-Courses'
            ? 'You are taking advantage of online courses for your studies. Online courses offer flexibility and the opportunity to explore a variety of topics.'
            : 'No information available on the way of study.';

    const extracurricularAnalysis = getExtracurricularDescription(extracurricular);

    const overallAnalysis = getOverallAnalysis(study_hours, class_participation, extracurricular, way_of_study);

    return (
        <div className="behaviour-analysis-container">
            <h2 className="behaviour-analysis-heading">Submitted Behavior Information</h2>
            <div className="behaviour-analysis-item">
                <strong>Study Hours:</strong> {study_hours} hours
            </div>
            <div className="behaviour-analysis-item">
                <strong>Way of Study:</strong> {way_of_study}
            </div>
            <div className="behaviour-analysis-item">
                <strong>Class Participation:</strong> {class_participation}
            </div>
            <div className="behaviour-analysis-item">
                <strong>Extracurricular Activities:</strong> {extracurricular}
            </div>

            <h2 className="behaviour-analysis-heading">Behavior Analysis</h2>
            <div className="behaviour-analysis-item">
                <strong>Study Hours Analysis:</strong> {studyHoursAnalysis}
            </div>
            <div className="behaviour-analysis-item">
                <strong>Participation Analysis:</strong> {participationAnalysis}
            </div>
            <div className="behaviour-analysis-item">
                <strong>Way of Study Analysis:</strong> {wayOfStudyAnalysis}
            </div>
            <div className="behaviour-analysis-item">
                <strong>Extracurricular Analysis:</strong> {extracurricularAnalysis}
            </div>
            <div className="behaviour-analysis-summary">
                <strong>Overall Analysis:</strong> {overallAnalysis}
            </div>
            <Link to="/home" className="back-btn">
              Back to Home &larr;
           </Link>
        </div>
    );
}


export default BehaviourAnalysis;