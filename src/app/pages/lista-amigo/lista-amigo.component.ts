import { Component, OnInit, ViewChild } from '@angular/core';
import { AmigoImaginario } from '../../models/amigo-imaginario.model';
import { AmigoImaginarioService } from '../../services/amigo-imaginario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone:false, 
  selector: 'app-lista-amigo',
  templateUrl: './lista-amigo.component.html'
})
export class ListaAmigoComponent implements OnInit {

  amigos: AmigoImaginario[] = [];
  displayedColumns: string[] = ['nombre', 'personalidad', 'edad','opciones'];
  dataSource = new MatTableDataSource<AmigoImaginario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
  private amigoService: AmigoImaginarioService,
  private snackBar: MatSnackBar
) {}

  ngOnInit(): void {
    this.cargarAmigos();
  }

  cantidadAmigos: number=0;
  cargarAmigos() {
    this.amigoService.listar().subscribe(data => {
      this.amigos = data;
      this.dataSource = new MatTableDataSource(this.amigos);
      this.dataSource.paginator = this.paginator;
      this.cantidadAmigos = data.length;
    });
  }

  aplicarFiltro(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  eliminar(id: number) {
  console.log('ID recibido en eliminar():', id);
  this.amigoService.eliminar(id).subscribe({
    next: () => {
      console.log('Eliminado en backend con éxito');
      this.snackBar.open('Amigo eliminado ✅', 'Cerrar', { duration: 3000 });
      this.cargarAmigos();
    },
    error: err => {
      console.error('Error al eliminar:', err);
      this.snackBar.open('Error al eliminar ❌', 'Cerrar', { duration: 3000 });
    }
  });

}
}