import { EntitySchema } from 'typeorm';
import { User } from '../../Module/User/Domain/Entity/User';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    uuid: {
      type: String,
      primary: true,
      unique: true,
      length: 36,
    },
    name: {
      type: String,
      nullable: false,
    },
    email: {
      type: String,
      nullable: false,
      unique: true,
    },
    emailNotificationsEnabled: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      nullable: false,
    },
  },
});
