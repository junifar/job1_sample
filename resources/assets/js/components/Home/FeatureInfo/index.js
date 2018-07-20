import React, {Component} from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

export default class FeatureInfo extends Component {

  static propTypes = {
    departure_date: momentPropTypes.momentObj,
    arrival_date: momentPropTypes.momentObj,
    onChangeItineraries: PropTypes.func,
    onChangeRequesting: PropTypes.func
  }

  render(){
    return(
      <div className="garuda-featureinfo">

        <div className="garuda-featureinfo-header">
          <span className="garuda-featureinfo-header-title">
            Cara Menggunakan Antrian Penerbangan
          </span>
        </div>

        <div className="garuda-featureinfo-container">
          <div className="garuda-featureinfo-item">
            <div className="garuda-featureinfo-icon">
              <i className="material-icons">search</i>
            </div>
            <div className="garuda-featureinfo-text">
              <span className="garuda-featureinfo-title">Cari Penerbangan</span>
            </div>
          </div>

          <div className="garuda-featureinfo-item">
            <div className="garuda-featureinfo-icon">
              <i className="material-icons">group_add</i>
            </div>
            <div className="garuda-featureinfo-text">
              <span className="garuda-featureinfo-title">Masuk Antrian</span>
            </div>
          </div>

          <div className="garuda-featureinfo-item">
            <div className="garuda-featureinfo-icon">
              <i className="material-icons">poll</i>
            </div>
            <div className="garuda-featureinfo-text">
              <span className="garuda-featureinfo-title">Tunggu dan Amati</span>
            </div>
          </div>

          <div className="garuda-featureinfo-item">
            <div className="garuda-featureinfo-icon">
              <i className="material-icons">airline_seat_recline_extra</i>
            </div>
            <div className="garuda-featureinfo-text">
              <span className="garuda-featureinfo-title">Dapatkan Tawaran Kursi</span>
            </div>
          </div>

          <div className="garuda-featureinfo-item">
            <div className="garuda-featureinfo-icon">
              <i className="material-icons">payment</i>
            </div>
            <div className="garuda-featureinfo-text">
              <span className="garuda-featureinfo-title">Konfirmasi dan Bayar</span>
            </div>
          </div>

          <div className="garuda-featureinfo-item">
            <div className="garuda-featureinfo-icon">
              <i className="material-icons">loyalty</i>
            </div>
            <div className="garuda-featureinfo-text">
              <span className="garuda-featureinfo-title">Dapatkan Tiket Pesawat</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
