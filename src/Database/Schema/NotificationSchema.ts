import { EntitySchema } from 'typeorm';
import { Notification } from '../../Module/Notification/Domain/Entity/Notification';

export const NotificationSchema = new EntitySchema<Notification>({
  name: 'Notification',
  target: Notification,
  columns: {
    uuid: {
      type: String,
      primary: true,
      unique: true,
      length: 36,
    },
    userUuid: {
      type: String,
      nullable: false,
      length: 36,
    },
    message: {
      type: 'text',
      nullable: false,
    },
    type: {
      type: String,
      nullable: false,
      length: 50,
    },
    createdAt: {
      type: Date,
      nullable: false,
    },
    sentAt: {
      type: Date,
      nullable: true,
    },
    sendingError: {
      type: 'text',
      nullable: true,
    },
  },
});
