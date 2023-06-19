import { Component, OnInit } from '@angular/core';
import { IWeather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather: IWeather | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    console.log('halo');
  }

  search(city: string) {
    this.weatherService
      .getWeather(city)
      .subscribe((weather) => (this.weather = weather));
  }
}
