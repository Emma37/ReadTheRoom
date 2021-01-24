import React from 'react';
import AttendancePieChart from '../components/AttendancePieChart';
import EmotionLeaderBoard from '../components/EmotionLeaderBoard';


const Teacher = () => {
    return (
        <>
        <div className="text-center mb-3 mb-lg-5">
            <h1>Class: Algebra 28/01/2021</h1>
            <div>Session key: silly-ferret-feet</div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <h2>Emotional Engagement</h2>
                <div>See what emotions your students are showing</div>
                <EmotionLeaderBoard />
            </div>
            <div class="col-lg-6 mt-5 mt-lg-0">
                <h2>Attendance</h2>
                <div>Check the class attendance</div>
                <AttendancePieChart />
            </div>
        </div>
        </>
    )
}

export default Teacher;
