import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server/index.js";

const trpc = createTRPCClient<AppRouter>({
    links:[
        httpBatchLink({
            url:"http://localhost:3000"
        }),
    ],
});

async function apiCaller() {
    const res = await trpc.idReturnRouter.query({
    id: "1",title:"hello sir g i am in capital letters"
});
    
return res;
}

console.log(await apiCaller());