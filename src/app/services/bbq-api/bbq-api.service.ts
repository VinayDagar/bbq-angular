import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { stringify } from "qs";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BbqApiService {
  private extractData(res: any) {
    return res.object || null;
  }
  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("x-access-token")
    };
  }

  rawPost(path, payload): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(path, payload, {
        headers,
    }).pipe(map(this.extractData));
}

   get(route, query = {}, shouldAppendV2 = false): Observable<any> {
    if (shouldAppendV2) {
      Object.assign(query, {
        apiVersion: "v2"
      });
    }
    const headers = this.getHeaders();
    return this.http
      .get(`${route}?${stringify(query)}`, {
        headers
      })
      .pipe(map(this.extractData));
  }

  getById(route, id) {
    if (!id) return Promise.reject("Id not found");

    const headers = this.getHeaders();

    return this.http.get(`${route}/${id}`, {
      headers
    }).pipe(map(this.extractData));
  }

  // Get File
  // async getFile(path, payload = {}) {
  //   const headers = this.getHeaders();
  //   const { data } = await this.http.post(path, payload, {
  //     headers,
  //     responseType: "blob"
  //   });
  //   return Promise.resolve(data);
  // }

  getWithoutHeaders(route) {
    return this.http.get(route).pipe(map(this.extractData));
  }

  // PUT services
  rawPut(path, payload): Observable<any> {
    return this.http.put(path, payload).pipe(map(this.extractData));
  }

  updateById(route, id, body): Observable<any> {
    if (!id) return null

    const headers = this.getHeaders();

    return this.http.put(`${route}/${id}`, body, {
      headers
    }).pipe(map(this.extractData));
  }

  async update(route, query = {}, body = {}) {
    const headers = this.getHeaders();
    return this.http.put(`${route}?${stringify(query)}`, body, {
      headers
    }).pipe(map(this.extractData));
  }

  updateOrCreate(route, body):Observable<any> {
    const headers = this.getHeaders();

    // Feedback already exists, so update
    let response;
    if (body.id) {
      response =  this.updateById(route, body.id, body).pipe(map(this.extractData));
    } else {
      response = this.rawPost(route, body).pipe(map(this.extractData));
    }

    return response;
  }

  // PATCH services
  patch(route, body) {
    const headers = this.getHeaders();
    return this.http.patch(`${route}`, body, {
      headers
    }).pipe(map(this.extractData));
  }

  // DELETE services
  delete(route, id) {
    if (!id) return

    const headers = this.getHeaders();

    return this.http.delete(`${route}/${id}`, {
      headers
    }).pipe(map(this.extractData));
  }

  async bulkDelete(route, items = []) {
    const filteredItems = items.filter(i => i.id);

    if (filteredItems && !filteredItems.length) return null;

    return Promise.all(items.map(i => this.delete(route, i.id)));
  }

  // Generic
  async instanceMethod(
    route,
    id,
    action,
    { method, payload } = {
      method: "get"
    }
  ) {
    const headers = this.getHeaders();
    const args = [
      {
        headers
      }
    ];
    // Add the payload to the arguments for poast requests
    if (payload) {
      args.unshift(payload);
    }
    const { data } = await this.http[method](
      `${route}/${id}/${action}`,
      ...args
    );
    return Promise.resolve(data);
  }

  // Bulk operations
  // async bulkCreate(path, items) {
  //   const headers = this.getHeaders();
  //   const newItems = [];

  //   items.forEach(async item => {
  //     const { data } = await this.http.post(path, item, {
  //       headers
  //     });

  //     newItems.push(data.object);
  //   });
  //   return Promise.resolve(newItems);
  // }

  // async bulkUpdateOrCreate(route, items) {
  //   const headers = this.getHeaders();
  //   const newItems = [];

  //   items.forEach(async item => {
  //     let response = null;

  //     if (item.id) {
  //       response = await this.updateById(route, item.id, item, {
  //         headers
  //       });
  //     } else {
  //       response = await this.rawPost(route, item, {
  //         headers
  //       });
  //     }
  //     newItems.push(response);
  //   });
  //   return Promise.resolve(newItems);
  // }

  // async getBBQApi(route) {
  //   const axios = Axios.create();
  //   const result = await axios.get(route);
  //   return result.data;
  // }

  // async postBBQApi(route, data) {
  //   const axios = Axios.create();
  //   const result = await axios.post(route, data);
  //   return result.data;
  // }
}
