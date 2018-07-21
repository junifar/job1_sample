import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import { MyButton } from '../../../_Main';

export default class UserQueue extends Component{
  constructor(props){
    super(props);

    this.state = {
      queue: null,
      noauth: false,
      token: localStorage.getItem("token")
    }
  }

  componentWillMount(){
    this.requestMyQueue();
  }

  requestMyQueue = () => {
    const url = '/v1/flight/my/queue';

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': this.state.token
      }};

    axios.post(url,"",axiosConfig).then((res) => {
      if (res.data.data.length > 0) {
        this.setState({
          queue: res.data.data
        });
      }
    }).catch((error) => {
      switch (+error.response.status) {
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
      pathname: '/User/queuedetail',
      state: {
        itinerary: h
      }
    });
    window.scroll(0,0);
  }
  render() {
    if (this.state.queue === null) {
      return (
          <div className="my-userdashboard-emptybody">
            No Queue Available
          </div>
      );
    }

    return (
        <div>
          <div className="my-userdashboard-header">
            My Queue
          </div>
          <div>
            <div className="my-userdashboard-body">
              <div className="my-userdashboard-table">
                <div className="dropdown-divider"/>
                { this.state.queue.map((q, index) => {
                  return (
                      <div key={q.queueId}>
                        <Row onClick={this.forwardPage.bind(this,q)} style={{padding: "10px"}}>
                          <Col>
                            <span className="font-lower-grey">FROM</span>
                            <br/>
                            <span className="font-normal-bold">{q.destination.city} ({q.destination.iata})</span>
                          </Col>
                          <Col>
                            <span className="font-lower-grey">TO</span>
                            <br/>
                            <span className="font-normal-bold">{q.origin.city} ({q.origin.iata})</span>
                          </Col>
                          <Col>
                            <span className="font-lower-grey">DATE</span>
                            <br/>
                            <span>{moment(q.departureTime).format("ddd, D MMM YYYY")}</span>
                          </Col>
                          <Col style={{maxWidth: "10%"}}>
                            <span className="font-lower-grey">TIME</span>
                            <br/>
                            <span>{moment(q.departureTime).format("HH:mm")}</span>
                          </Col>
                          <Col>
                            <span className="font-lower-grey">AIRLINE</span>
                            <br/>
                            <span>{q.airline.name}</span>
                          </Col>
                          <Col style={{textAlign: "right"}}>
                            <span className="wlps-form-icon"><i className="material-icons">more_vert</i></span>
                          </Col>
                        </Row>
                        { q.status == 'INT' &&
                        <Row className="queue-init">
                          <Col colSpan="6">
                            Queueing - Sales opens in {q.status} days
                          </Col>
                          <Col style={{textAlign: "right"}}>
                            {q.probability}
                          </Col>
                        </Row>
                        }
                        { q.status == 'QUE' &&
                        <Row className="queue-que">
                          <Col colSpan="6">
                            SEARCHING FOR SEATS {q.status}
                          </Col>
                          <Col style={{textAlign: "right"}}>
                            Sales opened!
                          </Col>
                        </Row>
                        }
                        { q.status == 'PAY' &&
                        <Row className="queue-pay">
                          <Col colSpan="6">
                            PAY {q.status}
                          </Col>
                          <Col style={{textAlign: "right"}}>
                            07:00 remaining - Rp. 750.000
                          </Col>
                        </Row>
                        }
                        { q.status == 'BOK' &&
                        <Row className="queue-remarks">
                          <Col colSpan="7">
                            E-TICKET ISSUED
                          </Col>
                        </Row>
                        }
                        { q.status == 'CAN' &&
                        <Row className="queue-remarks">
                          <Col colSpan="7">
                            CANCELLED
                          </Col>
                        </Row>
                        }
                      </div>
                  );
                  })
                }
                <div className="dropdown-divider"/>
                <div style={{marginTop: "10px"}}>
                  <MyButton outline accent queue onClick={() => this.onClick("")}>
                    <div className="my-searchresult-button-title" style={{fontSize: "1.5rem"}}>SEE QUEUE HISTORY</div>
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

