export class User {
  uuid: string;

  name: string;

  // todo add to schema
  email: string; // todo add uniqu

  emailNotificationsEnabled: boolean = true;
}
