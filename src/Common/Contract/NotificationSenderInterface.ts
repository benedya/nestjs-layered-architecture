export interface NotificationSenderInterface {
  sendEmailNotification(
    userUuid: string,
    subject: string,
    message: string,
  ): Promise<void>;
}
