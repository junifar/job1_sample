import React, { Component } from 'react';
import { Modal as RModal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

export default class HeaderRequesting extends Component{
  static props = {
    isOpen: PropTypes.bool,
    modalToggle: PropTypes.func,
  }

  constructor(props){
    super(props);

    this.state = {
      loadprogress: 1
    }
  }

  componentDidMount(){
    console.log("interval mount :"+this.props.isOpen);
    if (this.props.isOpen) {
      this.interval = setInterval(this.loadingProgress, 100);
    }
  }

  componentWillUnmount(){
    console.log("interval unmount");
    clearInterval(this.interval);
  }

  componentWillmount(){
    console.log("interval will mount");
    //clearInterval(this.interval);
  }

  loadingProgress = () => {
    console.log("interval unmount :"+this.props.isOpen);
    var a = 1;
      if (this.props.isOpen) {
        this.setState({
          loadprogress: 1
        });
      }
      a = a + 10 * (1 / a);
      this.setState({
        loadprogress: this.state.loadprogress + 10 * (1 / this.state.loadprogress)
        //loadprogress: a
      });

      if (this.state.loadprogress > 100) {
        clearInterval(this.interval);
      }
   // } else {
    //  clearInterval(this.interval);
    //}
  }

  render(){
    console.log("interval will mount 123");
    if (this.props.isOpen) {
      if (this.state.loadprogress < 100) {
        this.loadingProgress();
      }
    }
    return(
        <div>
          <RModal isOpen={this.props.isOpen} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
                  toggle={this.props.modalToggle} className={this.props.className}>
            <ModalBody>
              <div className="my-headerrequesting">
                <div className="my-headerrequesting-title">Searching.. {this.state.loadprogress.toFixed(0)} %</div>
                { (this.state.loadprogress) &&
                <Progress animated color="info" value={this.state.loadprogress}/>
                }
              </div>
            </ModalBody>
          </RModal>
        </div>
    );
  }
}
