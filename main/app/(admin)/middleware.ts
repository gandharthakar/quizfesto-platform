import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const auth = request.cookies.get('is_admin_user')?.value;
    
    if(auth == 'undefined' || auth == undefined) {
        // console.log('cookie is not set.');
        // if(request.nextUrl.pathname !== '/admin/auth/login') {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        // }
    }
}

export const config = {
    matcher: ["/admin", "/admin/settings/:path", "/admin/settings/password/:path", "/admin/quizes", "/admin/quizes/create-new-quiz", "/admin/quizes/edit-quiz/:path", "/admin/questions", "/admin/questions/create-new-question", "/admin/questions/edit-question/:path", "/admin/options", "/admin/options/create-new-options", "/admin/options/edit-options/:path", "/admin/categories", "/admin/categories/create-new-category", "/admin/categories/edit-category/:path", "/admin/categories/set_home_categories", "/admin/users", "/admin/users/create-new-user", "/admin/users/edit-user/:path", "/admin/prizes", "/admin/winners"]
}