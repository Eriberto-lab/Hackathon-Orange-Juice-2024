import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.development";
import { IProject } from "../models/iProject";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private readonly API = environment.baseUrl;
  private headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

  constructor(private httpClient: HttpClient) {}

  createProject(params: IProject): Observable<IProject> {
    const apiUrl = new URL(environment.apiProjects, this.API).toString();
    const requestBody: string = JSON.stringify(params);
    return this.httpClient.post<IProject>(apiUrl, requestBody, { headers: this.headers });
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }

  getProjects(): Observable<IProject[]> {
    const apiUrl = new URL(environment.apiProjects, this.API).toString();
    return this.httpClient.get<IProject[]>(apiUrl, { headers: this.headers });
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }

  patchProject(params: IProject): Observable<IProject> {
    const apiUrl = new URL(environment.getApiProjectId(params.id), this.API).toString();
    const requestBody: string = JSON.stringify(params);
    return this.httpClient.patch<IProject>(apiUrl, requestBody, { headers: this.headers });
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }

  deleteProject(id: number): Observable<IProject> {
    const apiUrl = new URL(environment.getApiProjectId(id), this.API).toString();
    return this.httpClient.delete<IProject>(apiUrl, { headers: this.headers });
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }
}
