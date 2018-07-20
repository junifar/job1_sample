import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class DetailFlight extends Component{

  static propTypes = {
    itinerary: PropTypes.object
  };

  render(){
    var departure_time = moment(this.props.itinerary.departs_at);
    var arrival_time = moment(this.props.itinerary.arrives_at);
    var duration = moment.duration(arrival_time.diff(departure_time));
    return(
      <div className="my-booking-detail">
        <div className="my-booking-detail-title">
          <p><i className="material-icons">flight</i>Penerbangan</p>
        </div>
        <div className="my-booking-detail-content">
          <div className="my-booking-detail-content-header">
            <div className="my-booking-detail-content-header-title">
              <p>{this.props.itinerary.airport_origin.city} <i className="material-icons">arrow_forward</i> {this.props.itinerary.airport_destination.city}</p>
            </div>
            <div className="my-booking-detail-content-header-date">
              {moment(this.props.itinerary.departs_at).locale('id').format("dddd, D MMMM YYYY")}
            </div>
          </div>
          <div className="my-booking-detail-content-body">
            <div className="my-booking-detail-inner">
              <div className="my-booking-detail-wrap">
                <div className="my-booking-detail-time">{moment(this.props.itinerary.departs_at).format("HH:mm")}</div>
                <div className="my-booking-detail-airport">{this.props.itinerary.airport_origin.name}</div>
                {/* <div className="my-booking-detail-terminal">Terminal 3</div> */}
              </div>
              <div className="my-booking-detail-wrap">
                <div className="my-booking-detail-time">{moment(this.props.itinerary.arrives_at).format("HH:mm")}</div>
                <div className="my-booking-detail-airport">{this.props.itinerary.airport_destination.name}</div>
                {/* <div className="my-booking-detail-terminal">Terminal 1</div> */}
              </div>
            </div>
            <div className="my-booking-detail-inner">
              <div className="my-booking-detail-info-container">
                <table>
                  <tbody>
                    <tr className="my-booking-detail-info">
                      <th>Durasi</th>
                      <td>{`${duration.get('hours')}j ${duration.get('minutes')}m`}</td>
                    </tr>
                    <tr className="my-booking-detail-info">
                      <th>Maskapai</th>
                      <td>Garuda Indonesia (GA)</td>
                    </tr>
                    <tr className="my-booking-detail-info">
                      <th>Pesawat</th>
                      <td>{this.props.itinerary.aircraft.description}</td>
                    </tr>
                    <tr className="my-booking-detail-info">
                      <th>Tarif</th>
                      <td>Normal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
