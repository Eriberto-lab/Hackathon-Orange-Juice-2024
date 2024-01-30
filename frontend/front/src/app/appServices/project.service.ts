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

  constructor(private httpClient: HttpClient) {}

  fillProject(projectData: any): IProject{
    const project: IProject = {
      id: projectData.id,
      title: projectData.title,
      tags: projectData.tags,
      link: projectData.link,
      description: projectData.description,
      imgUrl: projectData.imgUrl,
      firstName: projectData.firstName,
      lastName: projectData.lastName,
      createdAt: projectData.createdAt
    }
    return project;
  }

  createProject(params: FormData): Observable<IProject> {
    const formDataObject: any = {};
    params.forEach((value, key) => {
    formDataObject[key] = value;
    });
    const apiUrl = new URL(environment.apiProjects, this.API).toString();
    return this.httpClient.post<IProject>(apiUrl,params);
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }

  getProjects(): Observable<IProject[]> {
    const apiUrl = new URL(environment.apiProjects, this.API).toString();
    return this.httpClient.get<IProject[]>(apiUrl);
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }

  putProject(params: FormData,id :number): Observable<IProject> {
    const apiUrl = new URL(environment.getApiProjectId(id), this.API).toString();
    return this.httpClient.put<IProject>(apiUrl,params);
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }

  deleteProject(id: number): Observable<IProject> {
    const apiUrl = new URL(environment.getApiProjectId(id), this.API).toString();
    return this.httpClient.delete<IProject>(apiUrl);
    /*return new Observable((observer) => {
      observer.next();
    });*/
  }
}
