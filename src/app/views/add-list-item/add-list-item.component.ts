import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrl: './add-list-item.component.css',
})
export class AddListItemComponent {
  constructor(
    private todoSvc: TodosService,
    private activatedRoute: ActivatedRoute,
    private actSvc: AccountService,
    private router: Router
  ) {}
  todoID: number | undefined;
  taskFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  isLoggedIn: boolean = false;
  errMessage: string = '';
  ngOnInit(): void {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (!this.isLoggedIn) {
        this.router.navigate(['/']);
      }
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todoID = parseInt(id);
    }
  }
  async AddListItem() {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (!this.isLoggedIn) {
        this.router.navigate(['/']);
      }
    });

    if (!this.todoID) {
      return;
    }
    let task = this.taskFormControl.value;
    let dueDateValue = this.dueDateFormControl.value;
    let dueDate: Date;
    if (!dueDateValue) {
      this.errMessage = 'Must be correct format and required';
      return;
    }
    if (
      !this.taskFormControl.invalid &&
      !this.dueDateFormControl.invalid &&
      !isNaN(Date.parse(dueDateValue)) &&
      task &&
      this.dueDateFormControl.value
    ) {
      dueDate = new Date(dueDateValue);
      let didPost = await this.todoSvc.AddListItem(this.todoID, task, dueDate);
      if (didPost) {
        this.errMessage = '';
        this.router.navigate(['/']);
      } else {
        this.errMessage = 'Invalid authorization';
      }
    } else {
      this.errMessage = 'Must be correct format and required';
    }
  }
}
