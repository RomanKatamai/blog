import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    QuillModule,
  ]
})
export class SharedModule {}
