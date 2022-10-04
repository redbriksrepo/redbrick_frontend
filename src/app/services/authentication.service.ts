import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { Observable } from "rxjs";
import { DeviceDetectorService } from "./device-detector.service";
import { ElectronApiService } from "./electron-api.service";
import { Router } from '@angular/router'
import { LocalStorageService } from "./localstrage.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    baseUrl: string = environment.baseUrl + 'auth/';
    // authToken!: string;

    // deviceType!: string;

    // Header!: HttpHeaders;

    updateHeader = () => {
        let authToken: string = `${this.localStorage.getItem('auth-token')}`;
        let deviceType: string = this.deviceDetectorService.detectDevice();
        let headers: HttpHeaders = new HttpHeaders({
            'auth-token': authToken,
            'devicetype': deviceType
        });

        let httpOptions: any = {
            headers: headers
        }

        return httpOptions;

    }

    // httpOptions = {
    //     headers: this.Header
    // }

    constructor(
        private http: HttpClient,
        private toster: HotToastService,
        private electronApiService: ElectronApiService,
        private deviceDetectorService: DeviceDetectorService,
        private router: Router,
        private localStorage: LocalStorageService
    ) {

    }

    login = async (userData: any) => {
        let httpOptions = await this.updateHeader();
        let deviceId = await this.electronApiService.getMacAddress();
        userData = { ...userData, deviceId: deviceId }
        return this.http.post(this.baseUrl + 'login', userData, httpOptions).pipe(
            this.toster.observe({
                success: 'Login Successfull!',
                loading: 'Logging In',
                error: ({ error }) => `${error.Message}`
            })
        );
    }

    logOut = async () => {
        let httpOptions = await this.updateHeader();
        let deviceId = await this.electronApiService.getMacAddress();
        return this.http.get(this.baseUrl + 'logout', httpOptions).pipe(
            this.toster.observe({
                success: 'Logout Successfull',
                loading: 'Loading...',
                error: ({ error }) => `${error.Message}`
            })
        );
    }

    isAuthenticated = (): boolean => {
        let token = this.localStorage.getItem('auth-token');
        if (token) {
            return true;
        }
        return false;
    }

    forceLogout = () => {
        Swal.fire({
            title: 'Forced Logout!',
            text: 'you have logged in from another device. Please login again to continue using this device',
            icon: 'warning',
            timer: 2000,
            showConfirmButton: false
        })
        this.localStorage.removeItem('auth-token');
        this.localStorage.removeItem('userName');
        this.router.navigate(['/login']);
    }

    handleAuthError = (err: any) => {
        if (err.error.Message === "Device is no longer Authenticated") {
            this.forceLogout();
        }
    }

    // get currentUser$ (): Observable<boolean | null> {
    //     let _currentUser = localStorage.getItem('auth-token')? true : false;
    //     if(_currentUser) {
    //         return null;
    //     }
    // }

}