import React, { Component } from 'react';

export default class PassengerDropdown extends Component{

  constructor(props){
    super(props);

    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return(
      <div className="my-passengerdropdown">
        <div className="my-passengerdropdown-label" onClick={this.toggleOpen}>
          <div className="my-passengerdropdown-label-text">No of Passenger : {this.props.adults} Adult, {this.props.children} Child, {this.props.infants} Infant</div>
          <div className="my-passengerdropdown-label-icon"><i className="material-icons">arrow_drop_down</i></div>
        </div>
        <div className={`my-passengerdropdown-popup ${this.state.isOpen ? "" : "hide"}`}>
          <div className="my-passengerdropdown-popup-container">
            <div className="my-passengerdropdown-popup-item">
              <div className="my-passengerdropdown-popup-item-label">Dewasa</div>
              <div className="my-passengerdropdown-popup-item-counter">
                <div className="my-passengerdropdown-popup-item-counter-in clickable" onClick={() => this.props.onAdultsChange(-1)}><i className="material-icons">remove</i></div>
                <div className="my-passengerdropdown-popup-item-counter-in">{this.props.adults}</div>
                <div className="my-passengerdropdown-popup-item-counter-in clickable" onClick={() => this.props.onAdultsChange(1)}><i className="material-icons">add</i></div>
              </div>
            </div>

            <div className="my-passengerdropdown-popup-item">
              <div className="my-passengerdropdown-popup-item-label">Anak</div>
              <div className="my-passengerdropdown-popup-item-counter">
                <div className="my-passengerdropdown-popup-item-counter-in clickable" onClick={() => this.props.onChildrenChange(-1)}><i className="material-icons">remove</i></div>
                <div className="my-passengerdropdown-popup-item-counter-in">{this.props.children}</div>
                <div className="my-passengerdropdown-popup-item-counter-in clickable" onClick={() => this.props.onChildrenChange(1)}><i className="material-icons">add</i></div>
              </div>
            </div>

            <div className="my-passengerdropdown-popup-item">
              <div className="my-passengerdropdown-popup-item-label">Bayi</div>
              <div className="my-passengerdropdown-popup-item-counter">
                <div className="my-passengerdropdown-popup-item-counter-in clickable" onClick={() => this.props.onInfantsChange(-1)}><i className="material-icons">remove</i></div>
                <div className="my-passengerdropdown-popup-item-counter-in">{this.props.infants}</div>
                <div className="my-passengerdropdown-popup-item-counter-in clickable" onClick={() => this.props.onInfantsChange(1)}><i className="material-icons">add</i></div>
              </div>
            </div>

            <div className="my-passengerdropdown-popup-button" onClick={this.toggleOpen}>
              OK
            </div>
          </div>
        </div>
      </div>
    );
  }
}
