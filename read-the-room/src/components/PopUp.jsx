import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Abandoned

// class PopUp extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   render() {

//     var message = this.props.message;

//     return (
//       <>
//         {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
//           Launch demo modal
//         </button>

//         <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//         <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content">
//             <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//             </button>
//             </div>
//             <div className="modal-body">
//             {message}
//             </div>
//             <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary">Save changes</button>
//             </div>
//         </div>
//         </div>
//         </div> */}
//       </>
//     )
//   }
// };

// export default PopUp;

export default () => (
    <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
    </Popup>
  );