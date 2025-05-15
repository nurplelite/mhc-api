export type FormType = 'form' | 'survey';

export class Form {
  accountId!: string;
  name!: string;
  firstName?: string;
  lastName?: string;
  email!: string;
  phone?: string;
  created!: Date;
  modified?: Date;
  description?: string;
  formType!: FormType;
  tags?: string[];

}
