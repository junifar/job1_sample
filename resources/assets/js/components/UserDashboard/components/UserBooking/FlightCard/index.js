import React, { Component } from 'react';

export default class FlightCard extends Component{
  render(){
    return(
      <div onClick={this.props.onClick}>
        <div className="my-userdashboard-flightcard">
          <div className="my-userdashboard-flightcard-col">
            <div className="my-userdashboard-flightcard-item">
              <div className="my-userdashboard-flightcard-item-label">
                KEBERANGKATAN
              </div>
              <div className="my-userdashboard-flightcard-item-value">
                {this.props.origin_name} ({this.props.origin_code})
              </div>
            </div>

            <div className="my-userdashboard-flightcard-item">
              <div className="my-userdashboard-flightcard-item-label">
                TUJUAN
              </div>
              <div className="my-userdashboard-flightcard-item-value">
                {this.props.destination_name} ({this.props.destination_code})
              </div>
            </div>
          </div>
          <div className="my-userdashboard-flightcard-col">
            <div className="my-userdashboard-flightcard-item">
              <div className="my-userdashboard-flightcard-item-label">
                TANGGAL
              </div>
              <div className="my-userdashboard-flightcard-item-value">
                {this.props.departure_date.locale('id').format("dddd, D MMMM YYYY")}
              </div>
            </div>

            <div className="my-userdashboard-flightcard-item">
              <div className="my-userdashboard-flightcard-item-label">
                WAKTU
              </div>
              <div className="my-userdashboard-flightcard-item-value">
                {this.props.departure_date.format("HH:mm")}
              </div>
            </div>

            <div className="my-userdashboard-flightcard-item">
              <div className="my-userdashboard-flightcard-item-label">
                MASKAPAI
              </div>
              <div className="my-userdashboard-flightcard-item-value">
                Garuda
              </div>
            </div>
          </div>

          <div className={`my-userdashboard-flightcard-status status-${this.props.status.id}`}>
            <div className="my-userdashboard-flightcard-status-value">
              {this.props.status.name}
            </div>
            { (this.props.status.id == 1) && (this.props.time_limit) &&
              <div className="my-userdashboard-flightcard-status-info">
                {this.props.time_limit.format("YYYY-MM-DD HH:mm")}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
