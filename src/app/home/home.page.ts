import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit {

  formulario: FormGroup;
  tiposTarjeta: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.tiposTarjeta = [
      "Mastercard",
      "American Express",
      "Discover",
      "Visa"
    ];


    this.formulario = this.formBuilder.group({
      numTarjeta: new FormControl('', Validators.compose([
        Validators.minLength(16),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])),
      expira: new FormControl('', Validators.compose([
        Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$'),
        Validators.required
      ])),
      ccv: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])),
      tipo: new FormControl('', Validators.required),
      clientePromocional: new FormControl('', Validators.required),
      tipoTarjeta: new FormControl(this.tiposTarjeta[0], Validators.required) //estaba comentado ¿?
    });
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
      }
    };
    this.navCtrl.navigateForward('/pagina2', navigationExtras);
  }

  clickBorrar() {
    this.formulario.controls['numTarjeta'].setValue('');
    this.formulario.controls['expira'].setValue('');
    this.formulario.controls['ccv'].setValue('');
    this.formulario.controls['numTarjeta'].setValue('');
    this.formulario.controls['tipo'].setValue('');
    this.formulario.controls['clientePromocional'].setValue(false);
  }

}//final de clase