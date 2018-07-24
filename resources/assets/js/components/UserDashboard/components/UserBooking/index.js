import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { MyButton } from '../../../_Main';
import moment from 'moment';

export default class UserBooking extends Component{
    constructor(props){
        super(props);

        this.state = {
            booking: null,
            noauth: false,
            token: localStorage.getItem("token")
        }
    }

    componentWillMount(){
        this.requestMyBooking();
    }

    requestMyBooking = () => {
        const url = '/v1/flight/my/booking';

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'WLPS_TOKEN': this.state.token
            }};

        axios.post(url,"",axiosConfig).then((res) => {
            if (res.data.status && res.data.data.length > 0) {
                this.setState({
                    booking: res.data.data
                });
            }

        }).catch((error) => {
            switch (+error) {
                case 401: // Unauthorized
                    this.props.openModal("Your session is expired, please do relogin.");
                    this.props.history.push('/');
                    break;
                default:
                    this.props.openModal("Maaf terdapat kesalahan pada server.");

                    this.props.history.push('/');
                    window.scrollTo(0,0);
            }
        });

    }

    forwardPage= (h) => {
        this.props.history.push({
            pathname: '/User/bookingdetail',
            state: {
                itinerary: h
            }
        });
        window.scroll(0,0);
    }
    render() {
        if (this.state.booking === null) {
            return (
                <div className="my-userdashboard-emptybody">
                    No Booking Available
                </div>
            );
        } else {
            return (
                <div>
                    <div className="my-userdashboard-header">
                        My Booking
                    </div>
                    <div>
                        <div className="my-userdashboard-body">
                            <div className="my-userdashboard-table">
                                <div className="dropdown-divider"/>
                                { this.state.booking.map((q, index) => {
                                    return (
                                        <div key={q.id}>
                                            <Row onClick={this.forwardPage.bind(this,q)} style={{padding: "10px"}}>
                                                <Col className="col-md-11">
                                                    <Col className="col-md-3">
                                                        <span className="font-lower-grey">FROM</span>
                                                        <br/>
                                                        <span className="font-normal-bold">{q.dep.destination.city}
                                                            ({q.dep.destination.iata})</span>
                                                    </Col>
                                                    <Col className="col-md-3">
                                                        <span className="font-lower-grey">TO</span>
                                                        <br/>
                                                        <span className="font-normal-bold">{q.dep.origin.city} ({q.dep.origin.iata})</span>
                                                    </Col>
                                                    <Col className="col-md-3">
                                                        <span className="font-lower-grey">DATE</span>
                                                        <br/>
                                                        <span>{moment(q.dep.departureTime).format("ddd, D MMM YYYY")}</span>
                                                    </Col>
                                                    <Col className="col-md-4">
                                                        <span className="font-lower-grey">TIME</span> <span className="wlps-form-icon"></span>
                                                        <br/>
                                                        <span>{moment(q.dep.departureTime).format("HH:mm")}</span>
                                                    </Col>
                                                    <Col className="col-md-3">
                                                        <span className="font-lower-grey">AIRLINE</span>
                                                        <br/>
                                                        <span>{q.dep.airline.name}</span>
                                                    </Col>
                                                </Col>
                                                <Col className="col-md-1">
                                                    <i className="material-icons">more_vert</i>
                                                </Col>
                                            </Row>
                                            { q.status.code == 'PAY' &&
                                            <Row className="queue-pay col-md-12">
                                                <Col colSpan="6">
                                                    PAY
                                                </Col>
                                                <Col style={{textAlign: "right"}}>
                                                    {moment(q.timeLimit , 'YYYY-MM-DD HH:mm:ss').fromNow()} remaining - Rp. { `${Number(q.payment).toLocaleString()}`  }
                                                </Col>
                                            </Row>
                                            }
                                        </div>
                                    );
                                })
                                }
                                <div className="row col-md-12">
                                    <div className="dropdown-divider"/>
                                    <div style={{marginTop: "10px"}}>
                                        <MyButton outline accent queue onClick={() => this.onClick("")}>
                                            <div className="my-searchresult-button-title" style={{fontSize: "1.5rem"}}>SEE BOOKING HISTORY</div>
                                        </MyButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

/*import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as userActionCreators from '../../../../actions/user';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import FlightCard from './FlightCard';

import Api from '../../../../scripts/Api';

class UserBooking extends Component{

  constructor(props){
    super(props);

    this.state = {
      bookings: null,
      noauth: false
    }
  }

  componentWillMount(){
    this.requestBooking();
  }

  // *** Actions ***
  requestTicket = (book) => {
    console.log("requesting");
    const config = {
      method: 'get',
      headers: this.props.user,
      url: `/api/v1/bookings/${book.id}/ticket`
    }
    this.props.openModal("Tunggu sebentar, mencetak tiket..");
    axios(config)
      .then((res) => {
        console.log(res.data[0].pdf_url);
        this.props.openModal("Download PDF", res.data[0].pdf_url);
        var user = Api.parseHeader(res, this.props.user);
        const loginUser = bindActionCreators(userActionCreators.login, this.props.dispatch);
        loginUser(user);        // save header as redux state
      });
  }

    requestBooking = () => {
      const loginUser = bindActionCreators(userActionCreators.login, this.props.dispatch);
      const config = {
        url: '/v1/flight/my/booking',
        headers: this.props.user,
        method: 'post'
      }
      axios(config).then((res) => {
        var user = Api.parseHeader(res, this.props.user);
        loginUser(user);
        this.setState({
          bookings: res.data
        });
      }).catch((error) => {
        if (error.response.status === 401){
          this.setState({
            noauth: true
          });
        }
        console.log(error.response.status);
      });
    }

    flightAction = (book) => {
      this.props.history.push({
        pathname: '/FlightDetail',
        state: {
          bookingid: book.id
        }
      });
      window.scroll(0,0);
    }

  // *** Render ***

  render(){
    if (this.state.bookings){

      if (this.state.bookings.length === 0){
        return(
          <div className="my-userdashboard-emptybody">Belum ada pesanan</div>
        );
      }

      return(
        <div className="my-userdashboard-body">
          <div className="my-userdashboard-body-title">
            Booking Status
          </div>
          <div className="my-userdashboard-body-content">
            { (this.state.bookings) &&
              this.state.bookings.slice(0).reverse().map((book, index)=>{
                return(
                  <FlightCard
                    key={`flight${index}`}
                    origin_name={book.origin_name}
                    origin_code={book.origin_iata}
                    destination_name={book.destination_name}
                    destination_code={book.destination_iata}
                    departure_date={moment(book.departs_at)}
                    status={book.latest_status}
                    time_limit={moment(book.time_limit)}
                    onClick={() => this.requestTicket(book)}
                  />
                );
              })
            }
          </div>
        </div>
      );
    }

    if (this.state.noauth){
      return(
        <div className="my-userdashboard-emptybody">Login terlebih dulu untuk melihat pesanan anda</div>
      );
    }

    return(
      <div className="my-userdashboard-emptybody">Loading...</div>
    );

  }
}

const mapStateToProps = state => (
  {
    user: state.user
  }
);

export default connect(mapStateToProps)(UserBooking);
*/