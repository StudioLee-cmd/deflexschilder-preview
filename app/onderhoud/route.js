import { maintenanceHeaders, maintenancePage } from '@/lib/maintenance';

// A reviewable page, independent of the normal layout, ATS and form integrations.
export const dynamic = 'force-dynamic';

export function GET() {
  return new Response(maintenancePage(), { headers: maintenanceHeaders });
}
