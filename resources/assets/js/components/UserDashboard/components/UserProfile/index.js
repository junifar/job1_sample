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

  render(){
    return (
      <div>
        <div className="my-userdashboard-body">
          <table className="my-userdashboard-table">
            <tbody>
              <tr className="my-userdashboard-tr">
                <td className="my-userdashboard-td-left">{this.state.profile === null ? `` : this.state.profile.name}</td>
                <td className="my-userdashboard-td-right">
                  <div className="garuda-button garuda-userdashboard-submit">
                    <strong>Edit Profile</strong>
                  </div>
                  <div className="garuda-button garuda-userdashboard-submit">
                    <strong>Edit Password</strong>
                  </div>
                </td>
              </tr>
            </tbody>
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

UserProfile.requestMyProfile = () => {
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
        this.props.history.push('/');
        break;
      default:
        this.props.openModal("Maaf terdapat kesalahan pada server.");

        this.props.history.push('/');
        window.scrollTo(0,0);
    }
  });

}
