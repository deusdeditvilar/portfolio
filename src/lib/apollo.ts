import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: process.env.API_URL,
    headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`
    },
    cache: new InMemoryCache()
})