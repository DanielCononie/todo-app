import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent {
  constructor(
    private todoSvc: TodosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  todoID: number | undefined;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  errMessage: string = '';

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoID = parseInt(id);
      console.log(this.todoID);
    }
  }

  async ShareList() {
    // Get the value of the ID from the params
    if (
      !this.emailFormControl.invalid &&
      this.todoID &&
      this.emailFormControl.value
    ) {
      let email = this.emailFormControl.value;

      let didShare = await this.todoSvc.ShareList(this.todoID, email);

      if (didShare) {
        this.router.navigateByUrl('/');
      } else {
        // Unsuccessful
        this.errMessage = 'No user with that email';
      }
    } else {
      this.errMessage = 'The email must be a valid email';
    }
  }
}
