import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-list.component.html',
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  cargando = false;
  errorMensaje = '';
  mostrarFormulario = false;
  editandoId: string | null = null;

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    rol: ['estudiante', [Validators.required]],
  });

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.listar().subscribe({
      next: (res) => {
        this.usuarios = res.usuarios;
        this.cargando = false;
      },
      error: () => {
        this.errorMensaje = 'No se pudieron cargar los usuarios';
        this.cargando = false;
      },
    });
  }

  abrirFormularioNuevo(): void {
    this.editandoId = null;
    this.formulario.reset({ rol: 'estudiante' });
    this.formulario.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.formulario.get('password')?.updateValueAndValidity();
    this.mostrarFormulario = true;
  }

  editar(usuario: Usuario): void {
    this.editandoId = usuario._id ?? null;
    this.formulario.get('password')?.clearValidators();
    this.formulario.get('password')?.updateValueAndValidity();
    this.formulario.setValue({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol: usuario.rol,
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

    if (this.editandoId) {
      const { nombre, email, rol } = this.formulario.value;
      this.usuarioService.actualizar(this.editandoId, { nombre: nombre!, email: email!, rol: rol as any }).subscribe({
        next: () => {
          this.mostrarFormulario = false;
          this.cargarUsuarios();
        },
        error: (err) => (this.errorMensaje = err.error?.mensaje || 'No se pudo actualizar el usuario'),
      });
    } else {
      this.usuarioService.crear(this.formulario.value as Usuario).subscribe({
        next: () => {
          this.mostrarFormulario = false;
          this.cargarUsuarios();
        },
        error: (err) => (this.errorMensaje = err.error?.mensaje || 'No se pudo crear el usuario'),
      });
    }
  }

  eliminar(usuario: Usuario): void {
    if (!usuario._id) return;
    const confirmado = confirm(`¿Eliminar al usuario "${usuario.nombre}"?`);
    if (!confirmado) return;

    this.usuarioService.eliminar(usuario._id).subscribe({
      next: () => this.cargarUsuarios(),
      error: () => (this.errorMensaje = 'No se pudo eliminar el usuario'),
    });
  }
}
