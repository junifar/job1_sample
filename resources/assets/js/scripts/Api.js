
// request to api
// Api.signIn({});
// save header
//

export default class Api {

  static parseHeader(res, def) {
    var header = def;
    if (res.headers["access-token"]){
      if (res.headers["access-token"] !== ""){
        header = {
          "access-token": res.headers["access-token"],
          "cache-control": res.headers["cache-control"],
          client: res.headers.client,
          expiry: res.headers.expiry,
          "token-type": res.headers["token-type"],
          uid: res.headers.uid
        }
      }
    }

    return header;
  }
}
