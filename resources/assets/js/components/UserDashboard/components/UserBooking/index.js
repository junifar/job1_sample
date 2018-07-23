import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { MyButton } from '../../../_Main';
import moment from 'moment';

export default class UserBooking extends Component{
  constructor(props){
    super(props);

    this.state = {
      booking: null,
      bookinghist: null,
      seebooking: false,
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

  bookingHistory = () => {
    const url = '/v1/flight/my/booking/history';

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': this.state.token
      }};

    axios.post(url,"",axiosConfig).then((res) => {
      if (res.data.status && res.data.data.length > 0) {
        this.setState({
          seebooking: true,
          bookinghist: res.data.data
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
    console.log("hist :"+this.state.bookinghist);
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
            My Booking { this.state.seebooking && <span>History</span> }
          </div>
          <div>
            <div className="my-userdashboard-body">
                {!this.state.seebooking &&
                <div className="my-userdashboard-table">
                    <div className="dropdown-divider"/>
                    {this.state.booking.map((q, index) => {

                        let duration = moment(q.timeLimit, 'YYYY-MM-DD HH:mm:ss') - moment().local();
                        let s = Math.floor((duration / 1000) % 60);
                        let m = Math.floor((duration / 1000 / 60) % 60);
                        let h = Math.floor((duration / (1000 * 60 * 60)) % 24);
                        let d = Math.floor(duration / (1000 * 60 * 60 * 24));
                        let res = "";
                        if (d > 0) {
                            res += 'up to' + d + ' days ';
                        } else {
                            if (h > 0) {
                                res += h + ' : ';
                            }
                            if (m > 0) {
                                res += m + ' : ';
                            }
                            if (s > 0) {
                                res += s;
                            }
                        }

                        return (
                            <div key={q.id} onClick={this.forwardPage.bind(this, q)}>
                                <Row style={{padding: "10px"}}>
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
                                            <span
                                                className="font-normal-bold">{q.dep.origin.city} ({q.dep.origin.iata})</span>
                                        </Col>
                                        <Col className="col-md-3">
                                            <span className="font-lower-grey">DATE</span>
                                            <br/>
                                            <span>{moment(q.dep.departureTime).format("ddd, D MMM YYYY")}</span>
                                        </Col>
                                        <Col className="col-md-4">
                                            <span className="font-lower-grey">TIME</span>
                                            <span className="wlps-form-icon"></span>
                                            <br/>
                                            <span>{moment(q.dep.departureTime).format("HH:mm")}</span>
                                        </Col>
                                        <Col className="col-md-3">
                                            <span className="font-lower-grey">AIRLINE</span>
                                            <br/>
                                            <span>{q.dep.airline.name}</span>
                                        </Col>
                                        <Col style={{textAlign: "right"}} className="col-md-1">
                                            <span className="wlps-form-icon"><i className="material-icons">more_vert</i></span>
                                        </Col>
                                    </Col>
                                </Row>
                                {q.status.code == 'PAY' &&
                                <Row className="queue-pay">
                                    <Col colSpan="6">
                                        {q.status.name}
                                    </Col>
                                    <Col style={{textAlign: "right"}}>
                                        {res} remaining - Rp. {`${Number(q.payment).toLocaleString()}`}
                                    </Col>
                                </Row>
                                }
                                {q.status.code == 'TRN' &&
                                <Row className="queue-pay col-md-12">
                                    <Col colSpan="6">
                                        {q.status.name}
                                    </Col>
                                    <Col style={{textAlign: "right"}}>

                                        {res} remaining - Rp. {`${Number(q.payment).toLocaleString()}`}
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
                            <MyButton outline accent queue onClick={this.bookingHistory}>
                                <div className="my-searchresult-button-title" style={{fontSize: "1.5rem"}}>SEE BOOKING
                                    HISTORY
                                </div>
                            </MyButton>
                        </div>
                    </div>
                </div>
                }{
                this.state.bookinghist.map((q, index) => {

                    return (
                        <div key={q.id} onClick={this.forwardPage.bind(this,q)}>
                            <Row style={{padding: "10px"}}>
                                <Col>
                                    <span className="font-lower-grey">FROM</span>
                                    <br/>
                                    <span className="font-normal-bold">{q.dep.destination.city}
                                        ({q.dep.destination.iata})</span>
                                </Col>
                                <Col>
                                    <span className="font-lower-grey">TO</span>
                                    <br/>
                                    <span className="font-normal-bold">{q.dep.origin.city} ({q.dep.origin.iata})</span>
                                </Col>
                                <Col>
                                    <span className="font-lower-grey">DATE</span>
                                    <br/>
                                    <span>{moment(q.dep.departureTime).format("ddd, D MMM YYYY")}</span>
                                </Col>
                                <Col style={{maxWidth: "10%"}}>
                                    <span className="font-lower-grey">TIME</span>
                                    <br/>
                                    <span>{moment(q.dep.departureTime).format("HH:mm")}</span>
                                </Col>
                                <Col>
                                    <span className="font-lower-grey">AIRLINE</span>
                                    <br/>
                                    <span>{q.dep.airline.name}</span>
                                </Col>
                                <Col style={{textAlign: "right"}}>
                                    <span className="wlps-form-icon"><i className="material-icons">more_vert</i></span>
                                </Col>
                            </Row>
                            <Row className="queue-pay">
                                <Col colSpan="6">
                                    {q.status.name}
                                </Col>
                            </Row>
                        </div>
                    );
                })
                }
              </div>
              }
            </div>
          </div>
    );
    }
  }
}