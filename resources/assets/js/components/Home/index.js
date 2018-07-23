import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import { Row, Col, Container, Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';

import FlightForm from './FlightForm';
// import Carousel from './Carousel';

import { bindActionCreators } from 'redux';
import * as ItinerariesActionCreators from '../../actions/itineraries';



const items = [
    {index: 0, caption: 'QUEUE TO GET LOWER PRICE', subcaption: 'With Flylist.ID we can either buy flight tickets directlu or queue to get a lower price near departure time, if tickets are still available', src: '/images/queue002.jpeg'},
    {index: 1, caption: 'WATCH PROBABILITY STATUS', subcaption: 'While queueing, observe your chance to get the ticket. You might want to stop waiting and buy ticket with normal price if you have low probability', src: '/images/queue002.jpeg'},
    {index: 2, caption: 'PAY ONE YOU GET SEAT OFFER', subcaption: 'Starting from 24-hour prior to departure, system will after available seats to the people queueing. Once you receive sear offer, you have until one hour to pay before seat is offered to someone else', src: '/images/queue002.jpeg'}
]

class Home extends Component {

  static propTypes = {
    departure_date: momentPropTypes.momentObj,
    arrival_date: momentPropTypes.momentObj,
    origin: PropTypes.string,
    destination: PropTypes.string,
    originName: PropTypes.string,
    destinationName: PropTypes.string,
    originAirport: PropTypes.string,
    destinationAirport: PropTypes.string,
    adults: PropTypes.number,
    children: PropTypes.number,
    infants: PropTypes.number,
    seat_class: PropTypes.string,
    itineraries: PropTypes.array,
    user: PropTypes.object,
    openModal: PropTypes.func,
    openRequesting: PropTypes.func,
    token: PropTypes.string
  }

  constructor(props){
    super(props);

    this.state = {
      requesting: false,
      received: false,
      seat_class: "Economy Class",
      adults: 1,
    }

      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
  }

  // *** State Modifiers ***
    onChangeItineraries = (itin) => {
      this.setState({
        itineraries: itin
      });
    }

    onChangeRequesting = (val, params) => {
      this.setState({
        requesting: val
      });

      this.props.history.push({
        pathname: '/searchresult',
        state: {
          origin: params.origin,
          destination: params.destination,
          departureDate: params.departureDate,
          returnDate: params.returnDate,
          seatclass: params.seatclass,
          adults: params.adults,
          children: params.children,
          infants: params.infants,
          search: true
        }
      });
      window.scrollTo(0, 0);
    }

    onChangeReceived = (val) => {
      this.setState({
        received: val
      });
    }

    onChangeSeatClass = (val) => {
      this.setState({
        seat_class: val
      });
    }

    onChangeAdult = (val) => {
      this.setState({
        adults: val
      });
    }

    onChangeChildren = (val) => {
      this.setState({
        children: val
      });
    }

    onChangeInfant = (val) => {
      this.setState({
        infants: val
      });
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

  // *** Render ***

  render(){
      const { activeIndex } = this.state;

      const slides = items.map((item) => {
          return (
              <CarouselItem
                  onExiting={this.onExiting}
                  onExited={this.onExited}
                  key={item.src}
              >
                  <img src={item.src} alt={item.altText} />
                  <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
              </CarouselItem>
          );
      });

      return(
      <Container>
          <Row>
              <Col md="6">
                  <Carousel
                      activeIndex={activeIndex}
                      next={this.next}
                      previous={this.previous}>
                      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                      {slides}
                      <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                      <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                  </Carousel>
              </Col>
              <Col md="6">
                  <FlightForm
                      onChangeItineraries={this.onChangeItineraries}
                      onChangeRequesting={this.onChangeRequesting}
                      onChangeReceived={this.onChangeReceived}
                      onChangeSeatClass={this.onChangeSeatClass}
                      onChangeAdult={this.onChangeAdult}
                      onChangeChildren={this.onChangeChildren}
                      onChangeInfant={this.onChangeInfant}
                      requesting={this.state.requesting}
                      received={this.state.received}
                      openModal={this.props.openModal}
                      openRequesting={this.props.openRequesting}
                      originName={this.props.originName}
                  />
              </Col>
          </Row>

      </Container>

    );
  }
};

// *** Redux State To Props ***

const mapStateToProps = state => (
  {
    departure_date: state.form.departure_date,
    arrival_date: state.form.arrival_date,
    origin: state.form.origin,
    destination: state.form.destination,
    originName: state.form.originName,
    destinationName: state.form.destinationName,
    originAirport: state.form.originAirport,
    destinationAirport: state.form.destinationAirport,
    adults: state.form.adults,
    children: state.form.children,
    infants: state.form.infants,
    seat_class: state.form.seat_class,
    itineraries: state.itineraries,
    requesting: state.requesting
  }
);

export default connect(mapStateToProps)(Home);
