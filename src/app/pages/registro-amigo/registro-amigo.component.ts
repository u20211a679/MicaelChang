import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AmigoImaginarioService } from '../../services/amigo-imaginario.service';
import { AmigoImaginario } from '../../models/amigo-imaginario.model';

@Component({
  standalone:false ,
  selector: 'app-registro-amigo',
  templateUrl: './registro-amigo.component.html'
})
export class RegistroAmigoComponent {

  personalidades: string[] = ['protector', 'creativo', 'optimista', 'filósofo', 'sabio', 'realista'];
  amigoForm!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private amigoService: AmigoImaginarioService,
  private snackBar: MatSnackBar,
  private router: Router) 
{
  this.amigoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    edad: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
    personalidad: ['', Validators.required],
    fechaCreacion: ['', Validators.required],
    estado: [false]
  });
}

  registrar() {
    //Validar campos del formulario de registrar
    if (this.amigoForm.invalid) {
      this.amigoForm.markAllAsTouched();
      return;
    }

    //Validar que la fecha de creacion no sea futura
    const hoy = new Date();
    const fecha = this.amigoForm.value.fechaCreacion!;
    if (fecha > hoy) {
      this.snackBar.open('La fecha no puede ser futura.', 'Cerrar', { duration: 3000 });
      return;
    }
    console.log(this.amigoForm.value);
    //Registrar el amigo imaginario
    const amigo: AmigoImaginario = this.amigoForm.value;

    this.amigoService.registrar(amigo).subscribe(() => {
      this.snackBar.open('¡Registro exitoso!', 'Cerrar', { duration: 3000 });
      this.amigoForm.reset();
      this.router.navigate(['/listar-amigo']); // volver al mismo form
    });
  }
  
  cancelar() {
    this.router.navigate(['/listar-amigo']);
  }

  get f() { return this.amigoForm.controls; }
}
