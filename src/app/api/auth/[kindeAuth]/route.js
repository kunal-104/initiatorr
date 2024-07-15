// app/api/auth/[kindeAuth]/route.js

import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth(); 


import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
const {getUser} = getKindeServerSession();
const user = getUser();
console.log('user11', user);




