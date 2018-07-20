import React, {Component} from 'react';
import { Button } from 'reactstrap';

export default class ConstraintInfo extends Component {

  constructor(props){
    super(props);

    this.state = {
      show: true,
    };
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  }

  render(){

    if (this.state.show){
      return(
        <div className="garuda-constraintinfo">
          <div className="garuda-constraintinfo-title">
            <i className="material-icons">info</i>
            <span>Fitur antrian hanya dapat digunakan pada kondisi sebagai berikut:</span>
            <i onClick={this.toggleShow} className="material-icons garuda-constraintinfo-exit">close</i>
          </div>
          <div className="garuda-constraintinfo-lists">
            <ul>
              <li><i className="material-icons">check_circle</i><span>Terbatas hanya untuk kelas ekonomi</span></li>
              <li><i className="material-icons">check_circle</i><span>Hanya untuk penerbangan satu-arah (No return)</span></li>
              <li><i className="material-icons">check_circle</i><span>Hanya untuk penerbangan nonstop (No transit)</span></li>
              <li><i className="material-icons">check_circle</i><span>Tidak ada kepastian anda akan mendapatkan kursi</span></li>
              <li><i className="material-icons">check_circle</i><span>Pembayaran hanya diperlukan ketika kursi sudah anda dapatkan</span></li>
            </ul>
          </div>
          <div className="garuda-constraintinfo-button">
            <Button className="garuda-constraintinfo-button-button">Saya Memiliki Pertanyaan</Button>
          </div>
        </div>
      );
    }else{
      return(
        <div></div>
      );
    }
  }
}
