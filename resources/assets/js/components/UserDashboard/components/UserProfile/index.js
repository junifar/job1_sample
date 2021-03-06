import React, { Component } from 'react';

export default class UserProfile extends Component{
  constructor(props){
    super(props);

    this.state = {
      profile: null,
      noauth: false,
      token: localStorage.getItem("token")
    }
  }

  componentWillMount(){
    this.requestMyProfile();
  }

  requestMyProfile = () => {
    const url = '/v1/user/my';

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'WLPS_TOKEN': this.state.token
      }};

    axios.post(url,"",axiosConfig).then((res) => {
      if (res.data.data.length > 0) {
        this.setState({
          profile: res.data.data[0]
        });
      }
    }).catch((error) => {
      switch (+error.response.status) {
        case 401: // Unauthorized
          this.props.openModal("Your session is expired, please do relogin.");
          localStorage.clear();
          this.props.history.push('/');
          break;
        default:
          this.props.openModal("Maaf terdapat kesalahan pada server.");

          this.props.history.push('/');
          window.scrollTo(0,0);
      }
    });

  }

  render(){
    return (
      <div>
          <div className="row">&nbsp;</div>
          <div className="row pull-right">
              <div className="col-md-12">
                  <div className="garuda-button garuda-userdashboard-submit button">
                      <strong>Edit Profile</strong>
                  </div>
                  <div className="garuda-button garuda-userdashboard-submit button">
                      <strong>Edit Password</strong>
                  </div>
              </div>
          </div>
        <div className="my-userdashboard-body">
          <table className="my-userdashboard-table">

            <div className="dropdown-divider">
            </div>
            <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left" style={{fontWeight: "bold"}}>Email</td>
                <td className="my-userdashboard-td-right">button email</td>
              </tr>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">1. {this.state.profile === null ? `` : this.state.profile.email}</td>
                <td className="my-userdashboard-td-right"><span className="wlps-form-icon"><i className="material-icons">delete_forever</i></span></td>
              </tr>
            </tbody>
            <div className="dropdown-divider">
            </div>
            <tbody>
            <tr className="my-userdashboard-tr">
              <td className="my-userdashboard-td-left" style={{fontWeight: "bold"}}>Connected Account</td>
              <td className="my-userdashboard-td-right"></td>
            </tr>
            <tr className="my-userdashboard-tr">
              <td className="my-userdashboard-td-left">facebook</td>
              <td className="my-userdashboard-td-right">connected</td>
            </tr>
            <tr className="my-userdashboard-tr">
              <td className="my-userdashboard-td-left">Google</td>
              <td className="my-userdashboard-td-right">connect</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
