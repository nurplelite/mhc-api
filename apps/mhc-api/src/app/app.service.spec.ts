import { Test } from '@nestjs/testing';
import { FormService } from './modules/form/form.service';

describe('AppService', () => {
  let service: FormService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [FormService],
    }).compile();

    service = app.get<FormService>(FormService);
  });

  describe('getData', () => {
    it('get a form"', () => {
      expect(service.getDocument('Form', 'Form')).toEqual({message: 'Hello API'});
    });
  });
});
