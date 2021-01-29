import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
//import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core'
import { Url } from 'url';


@Component({
  selector: 'app-search-house',
  templateUrl: './search-house.component.html',
  styleUrls: ['./search-house.component.css']
})
export class SearchHouseComponent implements OnInit {

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  @ViewChild('search')

  public searchElementRef : ElementRef;

  userLat: number = 0;
  userLng: number = 0;


  clickedMarker() {
    
  }

  locations = [
    {lat : 6.136646, lng : 1.218788},
    {lat : 6.155335, lng : 1.212369},
    {lat : 6.137585, lng : 1.221709},
    {lat : 6.148338, lng : 1.215117},
    {lat : 6.137884, lng : 1.221880},
    {lat : 6.142535, lng : 1.215976},
  ]

  icon = {
    url : 'http://localhost:4200/assets/icones/houselocator.svg',
    scaledSize: { width: 45, height: 45}
  }

  iconUser = {
    url : 'http://localhost:4200/assets/icones/userLocator.png'
  }

  public zoom: number;
  public latitude: number = 0;
  public longitude: number = 0;
  public latlongs: any = [];
  public latlong: any = {};

  public searchControl: FormControl;

  ngOnInit(): void {
    this.zoom = 12;
    this.latitude = 6.133650;
    this.longitude = 1.223110;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: {'country': 'TG'}
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if(place.geometry === undefined || place.geometry === null) {
            return ;
          }

          const latlong = {
            latitude : place.geometry.location.lat(),
            longitude : place.geometry.location.lng()
          };
          this.latlongs.pop();
          this.latlongs.push(latlong);
          this.searchControl.reset();
          this.zoom = 15;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

        });
      });
    });
  }

  private setCurrentPosition() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.userLat = position.coords.latitude;
        this.userLng = position.coords.longitude;
        this.zoom = 12;

        console.log(this.latitude);
        
      });
    }
  }

}
