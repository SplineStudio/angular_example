import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpPostService {
  constructor(private http: Http) {}

  /**
   *
   * It sends login and password to the server and catches response
   *
   * @param loginData     It's object like this {email: '', password: ''}
   * @param url           It's url of the server where we need to send a request
   *
   * @return http-response
   */
  login(loginData: any, url: string): Observable<any> {
    const HEADERS = new Headers({ 'Content-Type': 'application/json' });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    return this.http
      .post(url, loginData, OPTIONS)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *
   * It sends post request to the server with any information
   *
   * @param data      It's information for sending to the server
   * @param token     It's user's token
   * @param url       It's url of the server where we need to send a request
   *
   * @return http-response
   */
  postData(data: any, token: string, url: string): Observable<any> {
    const HEADERS = new Headers({ Authorization: 'JWT ' + token });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    return this.http
      .post(url, data, OPTIONS)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *
   * It sends post request to the server with any information
   *
   * @param data      It's information for sending to the server
   * @param token     It's user's token
   * @param url       It's url of the server where we need to send a request
   *
   * @return http-response
   */
  putData(token: string, url: string): Observable<any> {
    const HEADERS = new Headers({ Authorization: 'JWT ' + token });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    return this.http
      .put(url, null, OPTIONS)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putDataUnusuallService(token: string, data: any, url: string): Observable<any> {
    const HEADERS = new Headers({ Authorization: 'JWT ' + token });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    return this.http
      .put(url, data, OPTIONS)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *
   * It sends post request to the server with any information
   *
   * @param token     It's user's token
   * @param url       It's url of the server where we need to send a request
   *
   * @return http-response
   */
  deleteData(token: string, url: string): Observable<any> {
    const HEADERS = new Headers({ Authorization: 'JWT ' + token });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    return this.http
      .delete(url, OPTIONS)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *
   * It parses response
   *
   * @param res   http response for parsing
   *
   * @return http-response
   */
  private extractData(res: Response) {
    const BODY = res.json();
    return BODY || {};
  }

  /**
   *
   * It processes a request error
   *
   * @param error   http request error for processing
   *
   * @return http-response
   */
  private handleError(error: Response | any) {
    const errMsg = { status: '', statusText: '', url: '', body: '' };
    errMsg.status = error.status;
    errMsg.statusText = error.statusText;
    errMsg.url = error.url;
    errMsg.body = error.json();
    return Observable.throw(errMsg);
  }
}
