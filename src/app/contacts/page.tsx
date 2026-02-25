import { Users } from 'lucide-react';
import ContactList from '@/components/contacts/contact-list';

export default function ContactsPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-3 border-b bg-white px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#25d366]/10">
          <Users className="h-5 w-5 text-[#25d366]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Contatos</h1>
          <p className="text-sm text-gray-500">
            Gerencie seus contatos do WhatsApp
          </p>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <ContactList />
      </div>
    </div>
  );
}
