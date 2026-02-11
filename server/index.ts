import {publicProcedure, router} from "./trpcObj.js"
import {z} from "zod";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const idReturnRouterSchema = z.object({
    id:z.string(),
    title:z.string(),
    password:z.string().min(6).optional()
})
const appRouter = router({
    // first router, like these routers we can add more routers 

    idReturnRouter : publicProcedure.input(idReturnRouterSchema).query(async (opts)=>{
        let title = opts.input.title;
        const id = opts.input.id;
        title = title.toUpperCase();


        // use of the context

        const username = opts.ctx.username;
        console.log(username);

        
        // may be some db calls also
        return {
            id,
            title
        }

    }),
    // second router as a object key, we will give


});

const server = createHTTPServer({
    router:appRouter,
    createContext(opts){
        const authHeader = opts.req.headers["authorization"];
        return {
            username:"hello wahtever"
        }
    }
});
server.listen(3000);

export type AppRouter = typeof appRouter; // types used client side


// task 1 
/* it was to install the trpc server then 
create trpc object  using initTRPC
trpc object contains router and publicProcedures

then we will create approuter = router({
different routes in the form of kkey and pair})

then serve that using express or native handler

task 2 
how to setup context for trpc
use of context is to store auth variables etc

setup context for the initTRPC function
 */