import React, { Component } from 'react';

export default class NotFound extends Component{
  render(){
      console.log("in not found");
    return(
      <div className="my-notfound">
        <div className="my-notfound-icon">
          <i className="material-icons">error_outline</i>
        </div>
        <div className="my-notfound-title">
          Halaman Tidak Ditemukan.
        </div>
        <div className="my-notfound-text">Maaf kami tidak menemukan halaman yang anda cari.</div>
      </div>
    );
  }
}
