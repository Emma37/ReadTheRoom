import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

class AttendancePieChart extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    //   const data = {};

    //   data.dataset = [
    //     {label: 'not attending', quantity: 5},
    //     {label: 'present', quantity: 26},
    //     {label: 'away', quantity: 2},
    //   ]

    //   data.colors = ["blue", "orange", "purple"];

    //   data.arcClass = 'arc';

    // pass in real values in props
    // const mockData = [
    //     { title: 'Absent', value: 5, color: '#696773' },
    //     { title: 'Present', value: 26, color: '#009fb7' },
    //     { title: 'Away', value: 2, color: ' #fed766' },
    // ];


    return (
      <div>
          <PieChart
            data={this.props.attendanceData}
            radius={40}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
                fontSize: 0.25+'rem',
                textAlign: 'right',
              }}
          />
      </div>
    )
  }
};

export default AttendancePieChart;
