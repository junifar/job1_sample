import React, {Component} from 'react';
import {
  Carousel as RCarousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

export default class Carousel extends Component{

  constructor(props){
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }



  render(){

    const slides = this.props.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.index}
        >
          <img src={item.src} alt={item.altText} className="front-pictures"/>
          { (item.caption && item.subcaption) &&
            <CarouselCaption captionText={item.subcaption} captionHeader={item.caption} />
          }
        </CarouselItem>
      );
    });

    return(
      <RCarousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}>
        <CarouselIndicators items={this.props.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </RCarousel>
    );
  }
}

Carousel.goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
}

Carousel.onExiting = () => {
    this.animating = true;
}

Carousel.onExited = () => {
    this.animating = false;
}

Carousel.next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
}

Carousel.previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
}
