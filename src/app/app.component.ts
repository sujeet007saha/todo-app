import { Component, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('moveInLeft', [
      transition('void=> *', [style({ transform: 'translateX(300px)' }),
      animate('200ms ease-out', keyframes([
        style({ transform: 'translateX(300px)' }),
        style({ transform: 'translateX(0)' })

      ]))]),
      transition('*=>void', [style({ transform: 'translateX(0px)' }),
      animate('250ms ease-in', keyframes([
        style({ transform: 'translateY(-20px)', opacity: 1, offset: 0.2 }),
        style({ transform: 'translateY(250px)', opacity: 0, offset: 1 })

      ]))])

    ])
  ]
})
export class AppComponent {
  title = 'todo-app';

  todoArray: string[] = [];
  edit: boolean;
  position: number;

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.constructForm();
  }

  constructForm() {
    this.form = this.fb.group({
      todo: this.fb.control(null, Validators.required)
    });
  }

  addItem() {
    if (this.edit) {
      this.todoArray[this.position] = this.form.get('todo').value;
      this.edit = false;
      this.form.reset();
      document.querySelector(".input-group-text").innerHTML ="ADD TODO"
    }
    else {
      if (this.form.invalid) { return; }
      this.todoArray.push(this.form.get('todo').value);
      this.form.reset();
    }

  }

  editItem(index) {
    this.edit = true;
    this.position = index;
    document.querySelector(".input-group-text").innerHTML ="EDIT TODO"
    this.form = this.fb.group({
      todo: this.fb.control(this.todoArray[index], Validators.required)
    });
  }

  deleteItem(index) {
    this.todoArray.splice(index, 1);
  }

}
