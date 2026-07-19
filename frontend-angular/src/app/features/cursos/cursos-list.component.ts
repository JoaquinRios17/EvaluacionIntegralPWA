import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../core/models/curso.model';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cursos-list.component.html',
})
export class CursosListComponent implements OnInit {
  cursos: Curso[] = [];
  cargando = false;
  errorMensaje = '';
  editandoId: string | null = null;
  mostrarFormulario = false;

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.maxLength(500)]],
    creditos: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    cupoMaximo: [20, [Validators.required, Validators.min(1)]],
  });

  constructor(private cursoService: CursoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cargando = true;
    this.cursoService.listar().subscribe({
      next: (res) => {
        this.cursos = res.cursos;
        this.cargando = false;
      },
      error: () => {
        this.errorMensaje = 'No se pudieron cargar los cursos';
        this.cargando = false;
      },
    });
  }

  abrirFormularioNuevo(): void {
    this.editandoId = null;
    this.formulario.reset({ creditos: 1, cupoMaximo: 20 });
    this.mostrarFormulario = true;
  }

  editar(curso: Curso): void {
    this.editandoId = curso._id ?? null;
    this.formulario.setValue({
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      creditos: curso.creditos,
      cupoMaximo: curso.cupoMaximo,
    });
    this.mostrarFormulario = true;
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editandoId = null;
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.value as Curso;

    const peticion = this.editandoId
      ? this.cursoService.actualizar(this.editandoId, datos)
      : this.cursoService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.editandoId = null;
        this.cargarCursos();
      },
      error: (err) => {
        this.errorMensaje = err.error?.mensaje || 'No se pudo guardar el curso';
      },
    });
  }

  eliminar(curso: Curso): void {
    if (!curso._id) return;
    const confirmado = confirm(`¿Eliminar el curso "${curso.nombre}"?`);
    if (!confirmado) return;

    this.cursoService.eliminar(curso._id).subscribe({
      next: () => this.cargarCursos(),
      error: () => (this.errorMensaje = 'No se pudo eliminar el curso'),
    });
  }
}
