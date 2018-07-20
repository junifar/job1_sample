import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultHeader extends Component{

    render(){
        return(
            <tr className="my-searchresult-row header">
                <th className="my-searchresult-column" style={{width: "10%"}}>Airline <i class="fas fa-sort"></i></th>
                <th className="my-searchresult-column" style={{width: "15%"}}>
                    Departure <i class="fas fa-sort"></i>
                </th>
                <th className="my-searchresult-column" style={{width: "15%"}}>Arrival <i class="fas fa-sort"></i></th>
                <th className="my-searchresult-column" style={{width: "15%"}}>Duration <i class="fas fa-sort"></i></th>
                <th className="my-searchresult-column" style={{width: "10%"}}>Facility <i class="fas fa-sort"></i></th>
                { this.props.seat_class == 'Economy Class' &&
                <th className="my-searchresult-column priceheader" style={{width: "20%"}}>Queue Fare <i class="fas fa-sort"></i></th>
                }
                { this.props.seat_class == 'Economy Class' &&
                <th className="my-searchresult-column priceheader" style={{width: "15%"}}>Normal Fare <i
                    class="fas fa-sort"></i></th>
                }
                { this.props.seat_class != 'Economy Class' &&
                <th className="my-searchresult-column priceheader" style={{width: "35%"}}>Normal Fare <i
                    class="fas fa-sort"></i></th>
                }
            </tr>
        );
    }
}


ResultHeader.propTypes = {
    seat_class: PropTypes.string
};
