import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultHeader extends Component{
    static propTypes = {
        seat_class: PropTypes.string
    };

    render(){
        return(
            <tr className="my-searchresult-row header">
                <th className="my-searchresult-column" style={{width: "10%"}}>Airline <i className="fas fa-sort"></i></th>
                <th className="my-searchresult-column" style={{width: "15%"}}>
                    Departure <i className="fas fa-sort"></i>
                </th>
                <th className="my-searchresult-column" style={{width: "15%"}}>Arrival <i className="fas fa-sort"></i></th>
                <th className="my-searchresult-column" style={{width: "15%"}}>Duration <i className="fas fa-sort"></i></th>
                <th className="my-searchresult-column" style={{width: "10%"}}>Facility <i className="fas fa-sort"></i></th>
                { this.props.seat_class == 'Economy Class' &&
                <th className="my-searchresult-column priceheader" style={{width: "20%"}}>Queue Fare <i className="fas fa-sort"></i></th>
                }
                { this.props.seat_class == 'Economy Class' &&
                <th className="my-searchresult-column priceheader" style={{width: "15%"}}>Normal Fare <i
                    className="fas fa-sort"></i></th>
                }
                { this.props.seat_class != 'Economy Class' &&
                <th className="my-searchresult-column priceheader" style={{width: "35%"}}>Normal Fare <i
                    className="fas fa-sort"></i></th>
                }
            </tr>
        );
    }
}
