import { Component, ViewChild } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTabGroup } from '@angular/material/tabs';
import { format } from 'date-fns';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer', 'deleteCustomer', 'findCustomer'];
  ELEMENT_DATA: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
  message: String = '';
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(
    private service: CustomerService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listCustomer();
  }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }

  firstNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  lastNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  cpfCustomer: FormControl = new FormControl(null, Validators.required);
  emailCustomer: FormControl = new FormControl(null, Validators.email);
  passwordCustomer: FormControl = new FormControl(null, Validators.minLength(3));

  /*saveCustomer(){
    this.service.save(this.customer)
    .subscribe(response => {
      console.log(response);
      alert('Cliente cadastrado com sucesso!');
      this.resetar();
    })
  }*/

  saveCustomer() {
    if (this.customer.idCustomer == '') {
      this.createCustomer();
    } else {
      console.log("update");
      this.updateCustomer();
    }
  }

  createCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(
      this.customer.birthdateCustomer, 'dd/MM/yyyy');

    this.service.save(this.customer).subscribe({
      next: response => {
        this.success = true;
        this.errors = [];
        this.resetarFormulario();

        this.dialog.open(DialogComponent, {
          data: {
            title: "Cadastro",
            message: "Cliente cadastrado com sucesso!",
            buttonTrue: "Ok"
          }
        });

        this.listCustomer();
      }, error: ex => {
        if (ex.error.errors) {
          this.errors = ex.error.errors;
          this.success = false;
          ex.error.errors.forEach((element: any) => {
          });
        } else {
          this.success = false;
          this.errors = ex.error.errors;
        }
      }
    })
  }

  updateCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(
      this.customer.birthdateCustomer, 'dd/MM/yyyy');

    this.service.update(this.customer).subscribe({
      next: response => {
        this.success = true;
        this.errors = [];
        this.resetarFormulario();

        this.dialog.open(DialogComponent, {
          data: {
            title: "Alteração",
            message: "Cliente alterado com sucesso!",
            buttonTrue: "Ok"
          }
        });

        this.listCustomer();
      }, error: ex => {
        if (ex.error.errors) {
          this.errors = ex.error.errors;
          this.success = false;
          ex.error.errors.forEach((element: any) => {
          });
        } else {
          this.success = false;
          this.errors = ex.error.errors;
        }
      }
    })
  }

  verificarCpf() {
    console.log("Validacao CPF");
    this.service.findByCpf(this.cpfCustomer.value)
      .subscribe(response => {
        console.log(response);
        if (response == true) {

          this.dialog.open(DialogComponent, {
            data: {
              title: "Alerta!",
              message: "CPF já utilizado!",
              buttonTrue: "Ok"
            },
          });

          this.cpfCustomer.setValue("");
        }
      })
  }

  resetarFormulario() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  };

  listCustomer() {
    this.service.list().subscribe((resposta: any) => {
      this.ELEMENT_DATA = resposta.result as Customer[];
      this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(customer: Customer) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Excluir cliente",
        message: "Deseja realmente excluir o cliente " + customer.firstNameCustomer + " " + customer.lastNameCustomer + "?",
        buttonTrue: "Sim",
        buttonFalse: "Não"
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(customer).subscribe(response => {
          this.message = response.result.result as string;

          this.dialog.open(DialogComponent, {
            data: {
              title: "Exclusão!",
              message: this.message,
              buttonTrue: "Ok"
            },
          });

          this.listCustomer();
        })
      }
    });
  }

  findCustomer(customer: Customer) {
    this.service.findById(customer.idCustomer).subscribe((response: any) => {

      //const datePipe = new DatePipe('pt-BR');

      this.customer = response.result as Customer;

      console.log(this.customer.birthdateCustomer);
      //this.customer.birthdateCustomer = datePipe.transform(
      //  this.customer.birthdateCustomer, 'yyyy-dd-MM');
      //this.customer.birthdateCustomer  = format(new Date(this.customer.birthdateCustomer), 'yyyy-dd-MM');
      this.customer.birthdateCustomer = (this.customer.birthdateCustomer).split("/").reverse().join("-");
      console.log(this.customer.birthdateCustomer);

      this.changeTab(1);
    });
  }

  changeTab(index: number) {
    this.tabGroup.selectedIndex = index;
  }

}
