import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

import { MyButton } from '../../_Main';

export default class FlightCard extends Component{
    

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
            <p className="my-searchresult-text"><i class="fa fa-briefcase" style={{color: "#31a4b4"}}></i></p>
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

    );
  }
}

FlightCard.onClick = (e) => {
    this.props.onClick(e);
}
