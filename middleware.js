import { NextResponse } from 'next/server';
import { maintenanceHeaders, maintenancePage } from './lib/maintenance';

export function middleware(request) {
  // Opt-in only. Deploying this code does not enable maintenance mode.
  if (process.env.MAINTENANCE_MODE !== '1') return NextResponse.next();

  const headers = { ...maintenanceHeaders, 'Retry-After': '300' };
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({ error: 'De website wordt bijgewerkt. Probeer het later opnieuw.' }), {
      status: 503,
      headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
  return new Response(request.method === 'HEAD' ? null : maintenancePage(), { status: 503, headers });
}

// Keep the logo and framework assets available, including to a previously opened tab.
export const config = {
  matcher: ['/((?!_next/|branding_flexschilder\\.svg$|favicon\\.ico$).*)'],
};
