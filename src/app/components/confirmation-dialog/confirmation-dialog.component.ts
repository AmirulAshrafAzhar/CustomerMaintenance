import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  message: string = 'Unsaved data will be lost. Are you sure to continue?';
  description: string = 'Switch to Initial mode by clearing all the input controls if YES is selected. Remain the current screen if NO is selected.';
  isVisible: boolean = false;
  isNotification: boolean = false;
  
  private dialogSubscription: Subscription | null = null;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogSubscription = this.dialogService.getDialogState().subscribe(state => {
      this.message = state.message;
      this.description = state.description;
      this.isVisible = state.show;
      this.isNotification = state.isNotification;
    });
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  onNoClick(): void {
    this.dialogService.setResult(false);
  }

  onYesClick(): void {
    this.dialogService.setResult(true);
  }
}