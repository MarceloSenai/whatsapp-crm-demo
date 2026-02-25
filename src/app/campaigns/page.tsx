import Link from 'next/link';
import { Plus } from 'lucide-react';
import CampaignList from '@/components/campaigns/campaign-list';

export default function CampaignsPage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Campanhas</h1>
        <Link
          href="/campaigns/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#128c7e]"
        >
          <Plus className="h-4 w-4" />
          Nova Campanha
        </Link>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <CampaignList />
      </div>
    </div>
  );
}
