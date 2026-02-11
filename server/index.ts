import {publicProcedure, router} from "./trpcObj"
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
        const title = opts.input.title;
        const id = opts.input.id;
        title.toUpperCase();
        // may be some db calls also
        return {
            id,
            title
        }

    }),
    // second router as a object key, we will give


});

const server = createHTTPServer({
    router:appRouter
});
server.listen(3000);

export type AppRouter = typeof appRouter; // types used client side
