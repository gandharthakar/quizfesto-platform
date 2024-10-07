import { NextResponse, NextRequest } from 'next/server';

import { config as adminConfig, middleware as adminMiddleware } from '@/app/(admin)/middleware';

export default function middleware(req: NextRequest) {

    const authUser = req.cookies.get('is_auth_user')?.value;

    if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
        return adminMiddleware(req);
    } 
    
    if((authUser == 'undefined' || authUser == undefined) && (
        req.nextUrl.pathname.startsWith('/play-quiz') || 
        req.nextUrl.pathname.startsWith('/submit-score') || 
        req.nextUrl.pathname.startsWith('/user')
    )) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
}

export const config = {
    matcher: [...adminConfig.matcher]
}