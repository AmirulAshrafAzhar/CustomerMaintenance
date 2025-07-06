import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogState = new Subject<{
    message: string;
    description: string;
    show: boolean;
    isNotification: boolean;
  }>();
  
  private currentResultSubject: Subject<boolean> | null = null;

  constructor() { }

  /**
   * Opens a confirmation dialog with the specified message and description
   * @param message The main message to display
   * @param description Additional description text
   * @returns An Observable that resolves to true if the user clicks YES, false if NO
   */
  confirm(message: string = 'Unsaved data will be lost. Are you sure to continue?',
          description: string = 'Switch to Initial mode by clearing all the input controls if YES is selected. Remain the current screen if NO is selected.'): Observable<boolean> {
    
    // Create a new Subject for this specific confirmation
    this.currentResultSubject = new Subject<boolean>();
    
    // Show the dialog with the provided message and description
    this.dialogState.next({
      message,
      description,
      show: true,
      isNotification: false
    });
    
    return this.currentResultSubject.asObservable();
  }

  /**
   * Opens a notification dialog with the specified message
   * @param message The message to display
   * @returns An Observable that resolves when the user clicks OK
   */
  notify(message: string): Observable<void> {
    // Create a new Subject for this notification
    const notificationSubject = new Subject<void>();
    
    // Add a small delay to ensure the previous dialog is fully closed
    setTimeout(() => {
      // Show the dialog with the provided message
      this.dialogState.next({
        message,
        description: '',
        show: true,
        isNotification: true
      });
      
      // Set the current result subject to handle the OK button click
      this.currentResultSubject = new Subject<boolean>();
      this.currentResultSubject.subscribe(() => {
        notificationSubject.next();
        notificationSubject.complete();
      });
    }, 100);
    
    return notificationSubject.asObservable();
  }

  /**
   * Sets the result of the confirmation dialog
   * @param result true if the user clicked YES, false if NO
   */
  setResult(result: boolean): void {
    if (this.currentResultSubject) {
      this.currentResultSubject.next(result);
      this.currentResultSubject.complete(); // Complete the subject to prevent memory leaks
      this.currentResultSubject = null;
    }
    
    this.dialogState.next({ message: '', description: '', show: false, isNotification: false });
  }

  /**
   * Gets the dialog state
   * @returns An Observable that emits the dialog state
   */
  getDialogState(): Observable<{ message: string; description: string; show: boolean; isNotification: boolean }> {
    return this.dialogState.asObservable();
  }
}