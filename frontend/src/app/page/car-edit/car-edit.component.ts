import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  car: Car = new Car();
  carId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.carId = this.activatedRoute.snapshot.params.id;
    this.car = await this.carService.get(this.carId).toPromise();
  }

  async save(form: NgForm): Promise<void> {
    await this.carService.update({ ...form.value, _id: this.carId }).toPromise();
    this.router.navigate(['/', 'cars']);
  };

}
