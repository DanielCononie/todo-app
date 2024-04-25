import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../services/todos.service';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

interface User {
  email: string;
  name: string;
  id: number;
}

interface ListItem {
  id: number;
  task: string;
  completed: boolean;
  todo_list_id: number;
  completed_by: number;
  updated_at: Date;
  due_date: Date;
  completed_by_user: User;
}

@Component({
  selector: 'app-update-list-item',
  templateUrl: './update-list-item.component.html',
  styleUrl: './update-list-item.component.css',
})
export class UpdateListItemComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private todoSvc: TodosService,
    private actSvc: AccountService
  ) {}

  listItem: ListItem | undefined;
  taskFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  todoid: number | undefined;
  itemId: number | undefined;
  errMessage: string = '';
  loggedIn: boolean = false;

  async ngOnInit() {
    this.actSvc.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });

    // Activated route
    const id = this.activatedRoute.snapshot.paramMap.get('todoid');
    const item_id = this.activatedRoute.snapshot.paramMap.get('itemId');
    if (id) {
      this.todoid = parseInt(id);
    }
    if (item_id) {
      this.itemId = parseInt(item_id);
    }

    // If the route params exist
    if (this.itemId && this.todoid) {
      this.GetListItemById(this.todoid, this.itemId);
    }
  }

  async UpdateListItem() {
    if (this.taskFormControl.invalid || this.dueDateFormControl.invalid) {
      this.errMessage = 'Fields must have a value';
      return;
    }
    let task = this.taskFormControl.value;
    let due_date: Date | null = null;

    // Validate and parse the due date input
    const dueDateInput = this.dueDateFormControl.value;

    if (dueDateInput) {
      const parsedDueDate = new Date(dueDateInput);

      if (!isNaN(parsedDueDate.getTime())) {
        due_date = parsedDueDate;
      } else {
        console.error('Invalid due date input:', dueDateInput);
      }
    }

    if (this.todoid && this.itemId) {
      let didUpdate = await this.todoSvc.UpdateListItem(
        task,
        due_date,
        this.todoid,
        this.itemId
      );

      if (didUpdate) {
        alert('Updated!');
        this.router.navigate([`/listItem/${this.todoid}`]);
      } else {
        this.errMessage = 'Could not update this list item, try logging in';
      }
    }
  }

  async GetListItemById(todoid: number, itemId: number) {
    this.listItem = (await this.todoSvc.GetListItemById(
      todoid,
      itemId
    )) as ListItem;

    if (!this.listItem) this.router.navigate(['/']);

    if (this.listItem.task && this.listItem.due_date) {
      this.taskFormControl.setValue(this.listItem?.task);
      const dueDate = new Date(this.listItem.due_date); // Assuming listItem.due_date is a valid date string or Date object
      const formattedDueDate = dueDate.toISOString().slice(0, 10); // Extract YYYY-MM-DD part

      this.dueDateFormControl.setValue(formattedDueDate);
    }
  }
}
