import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CampaignForm from '@/components/campaigns/campaign-form';

export default function NewCampaignPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-4 border-b bg-white px-6 py-4">
        <Link
          href="/campaigns"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Nova Campanha</h1>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <CampaignForm />
      </div>
    </div>
  );
}
