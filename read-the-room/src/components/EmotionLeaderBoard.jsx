import React from 'react';

class EmotionLeaderBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // update with values from props
    // var data =
    //     { "😡 Anger": 1,
    //     "😒 Contempt": 1,
    //     "🤢 Disgust": 2,
    //     "😨 Fear": 0,
    //     "😄 Happiness": 8,
    //     "🙂 Neutral": 15,
    //     "😥 Sadness": 1,
    //     "😮 Surprise": 0
    // };

    var total = 0;

    for (const [key, value] of Object.entries(this.props.data)) {
        total += value;
      }

    var itemArray = Object.keys(this.props.data).map((key) => {
        return [key, this.props.data[key]];
      });

    itemArray.sort(function(first, second) {
    return second[1] - first[1];
    });

    console.log(itemArray)

    return (
      <div>
          <ul className="emotion-leaderboard">
          {/* {Object.keys(data).map((key, index) => (
          <li key={index} style={{fontSize: (Math.max(5, data[key])/total)*6 +'rem'}}>{key} ({data[key]})</li>
            ))
        } */}

            {itemArray.map((value, index) => {
                            return <li className="mb-3" style={{fontSize: Math.min(Math.max(value[1]+1 / (total + 1), 0.5) * 1.5, 6) +'rem'}}>{value[0]} ({value[1]})</li>
                        })}
          </ul>
      </div>
    )
  }
};

export default EmotionLeaderBoard;
