import { Test } from '@nestjs/testing';
import { ContactService } from './modules/contact/contact.service';

describe('AppService', () => {
  let service: ContactService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = app.get<ContactService>(ContactService);
  });

  describe('getData', () => {
    it('get a form"', () => {
      expect(service.getDocument('contact', 'contact')).toEqual({message: 'Hello API'});
    });
  });
});
