import { addressService } from "@/app/api/contact/address/address.service";
import { contactEmailService } from "@/app/api/contact/email/email.service";
import { contactNumberService } from "@/app/api/contact/number/number.service";

class ContactService {
  async getAll() {
    try {
      const addresses = await addressService.getAll();
      const numbers = await contactNumberService.getAll();
      const emails = await contactEmailService.getAll();

      return { addresses, numbers, emails };
    } catch (error) {
      return error;
    }
  }
}

export const contactService = new ContactService();
