import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import PropTypes from 'prop-types';

import { MyButton } from '../../_Main';

export default class FlightCard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            detail_flight: false
        };
    }

    onClick = (e) => {
        this.props.onClick(e);
    }

    sort(key) {
        const columnState = !this.state[`toggle-${key}`];

        this.setState({
            [`toggle-${key}`]: columnState,
            data: orderBy(
                this.state.data,
                [key],
                columnState ? 'desc' : 'asc'
            )
        });
    }

    detailFLight = () => {
        this.setState({
            detail_flight: !this.state.detail_flight
        });
    }

    render(){
    var departure_time = moment(this.props.departure_date);
    var arrival_time = moment(this.props.arrival_date);
    var disc = 0;
    var wlpsfare = (this.props.wlps_fare ? this.props.wlps_fare : 0);
    var normalfare = (this.props.normal_fare ? this.props.normal_fare : 0);
    if (normalfare != null && wlpsfare > 0) {
        disc = 100 - (wlpsfare / normalfare * 100);
        disc = +disc.toFixed(2);
    }

    return(
<tbody>
      <ReactCSSTransitionGroup
        className="my-searchresult-row"
        component="tr"
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        >
        <td className="my-searchresult-column airlinelogo" style={{width: "10%"}}>
          <img src="https://www.gstatic.com/flights/airline_logos/70px/GA.png" className="img-fluid flight-result-card__img" alt="Responsive" />
            <span onClick={this.detailFLight} className="my-booking-button-edit garuda-button">
                Detail Flight
            </span>
        </td>
        <td className="my-searchresult-column" style={{width: "15%"}}>
            <p className="my-searchresult-text">{departure_time.format("HH:mm")}</p>
            <p className="my-searchresult-subtext">{`${this.props.origin} (${this.props.origin_iata})`}</p>
        </td>
        <td className="my-searchresult-column" style={{width: "15%"}}>
            <p className="my-searchresult-text">{arrival_time.format("HH:mm")}</p>
            <p className="my-searchresult-subtext">{`${this.props.destination} (${this.props.destination_iata})`}</p>
        </td>
        <td className="my-searchresult-column" style={{width: "15%"}}>
            <p className="my-searchresult-text">{this.props.duration}</p>
            <p className="my-searchresult-subtext">{this.props.trip}</p>
        </td>
        <td className="my-searchresult-column" style={{width: "10%"}}>
            <p className="my-searchresult-text"><i className="fa fa-briefcase" style={{color: "#31a4b4"}}></i></p>
        </td>
        { this.props.seat_class == 'Economy Class' &&
        <td className="my-searchresult-column pricetag" style={{width: "20%"}}>
            { wlpsfare == 0 &&
            <div>
                <div className="my-currency-disabled"> { `${this.props.currency}` } </div>
                <div className="my-searchresult-column-price-disabled"> { `${Number(wlpsfare).toLocaleString()}` } </div>
                <MyButton disabled>
                    <div className="my-searchresult-button-title">Queue</div>
                </MyButton>
                <div className="my-searchresult-button-subtext-disabled">Unavailable</div>
            </div>
            }

            { wlpsfare > 0 &&
                <div>
                    <div className="my-currency"> { `${this.props.currency}` } </div>
                    <div className="my-searchresult-column-price"> { `${Number(wlpsfare).toLocaleString()}` } </div>
                    <MyButton accent onClick={() => this.onClick("QUEUE")}>
                        <div className="my-searchresult-button-title">Queue</div>
                    </MyButton>
                    <div className="my-searchresult-button-subtext">{disc}% Lower than normal fare</div>
                </div>
            }
        </td>
        }
          { this.props.seat_class == 'Economy Class' &&
          <td className="my-searchresult-column pricetag" style={{width: "15%"}}>
              <div className="my-currency"> { `${this.props.currency}` } </div>
              <div className="my-searchresult-column-price"> { `${Number(normalfare).toLocaleString()}` } </div>
              <MyButton outline accent queue onClick={() => this.onClick("")}>
                  <div className="my-searchresult-button-title">Buy now</div>
              </MyButton>
          </td>
          }
          { this.props.seat_class != 'Economy Class' &&
          <td className="my-searchresult-column pricetag" style={{width: "35%"}}>
              <div className="my-currency"> { `${this.props.currency}` } </div>
              <div className="my-searchresult-column-price"> { `${Number(normalfare).toLocaleString()}` } </div>
              <MyButton outline accent queue onClick={() => this.onClick("")}>
                  <div className="my-searchresult-button-title">Buy now</div>
              </MyButton>
          </td>
          }
      </ReactCSSTransitionGroup>
      { this.state.detail_flight &&
         <tr><td colSpan="7">
      <tbody>
      <tr>
        <td colSpan="6" style={{ paddingLeft: "110px"}}><hr/></td>
        </tr>
        <tr>
        <td colSpan="2">
            <table>
            <tr>
            <td style={{padding: "0px 10px 20px 10px"}}>
    <span style={{display: "flex", width: "25px", height: "25px"}}>
    <img src="https://www.gstatic.com/flights/airline_logos/70px/GA.png" className="img-fluid flight-result-card__img" alt="Responsive" />
            </span>
            <span style={{display: "flex"}}>Garuda</span>
        <span style={{display: "flex"}}>{this.props.seat_class}</span>
    </td>
        <td>
        </td>
    </tr>
    </table>
    </td>
        <td>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(this.props.departure_date).format("HH:mm")}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(this.props.departure_date).format("dddd, DD MMM")}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{this.props.duration}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(this.props.arrival_date).format("HH:mm")}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{moment(this.props.arrival_date).format("dddd, DD MMM")}</span>
        </td>
        <td colSpan="2">
            <span className="my-booking-detail-time" style={{display: "flex"}}>{`${this.props.origin_city} (${this.props.origin_iata})`}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{this.props.origin}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}></span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{`${this.props.destination_city} (${this.props.destination_iata})`}</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>{this.props.destination}</span>
        </td>
        <td colSpan="2">
            <span className="my-booking-detail-time" style={{display: "flex"}}>Model Boeing-737</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>Seat layout 3-3</span>
            <span className="my-booking-detail-time" style={{display: "flex"}}>Cabin Baggage 7kg</span>
        </td>
    </tr>
      </tbody>
              </td></tr>
          }
    </tbody>
    );
  }
}
