# GraphQL API in NodeJS Sample

**GraphQL Framework:** `apollo-server-express`
**Authentication:** `jsonwebtoken`
**ORM:** Mongoose
**DBaaS:** MongoDB Atlas

**Description:** This is a sample Web Service API using GraphQL to authenticate a user to demonstrate DBaaS interaction and a prototype of a book inventory. This is also a redo of my first try at GraphQL API using the framework `express-graphql` (See this repo: https://github.com/junerockwell/GraphQL_React_Sample). The difference between the two is that the `GraphQL_React_Sample` Project has a React App in its repo while this only has barebones Web Service API.

### What I learned by using Apollo-Server
- Apollo Server is production ready and has documentation right off the box.
- The Graphiql UI is a lot more capable than primitive versions because it enables you to add HTTP Headers such as `Authorization` for JSONWebToken when testing.
- I had to adjust to how MongoDB Atlas does things from their new UI to having to make a cluster because I was so used to using `mlab.com` (which is now obselete).
- Learned to make a JSONWebToken Auth Guard. Unlike REST frameworks such as `restify` and `express`, there is no plugin or middleware that I know of at this time that will do everything for you such as signing, verifying and decoding tokens, and authenticating each query or mutation based on the validity of that token.
- Apollo Server has its own error functions built-in! E.g. `AuthenticationError()`. There's no Internal Server Error but you can make one using the generic `ApolloError()`.
- Learned how to make resolvers separately from the "type" in the Schema definition. In `express-graphql` framework, the resolver functions are not separate from the type, and it was an adjustment for me.
- Schema Stiching and combining resolvers

### What could I have done differently in this prototype?
- Not use the authenticated user as the automatic author of the book. But I did that to proove a concept when I was learning how to make a jsonwebtoken authentication guard.
- Using `dataSource`
- Adding the data models in the `context` but I went ahead and import them per each controller because I thought it was fun that way.
- I could have done a better file scaffolding while keeping the standards.

### Apollo-Server vs `express-graphql`
If you're going to ask me to make you a Web Service API using GraphQL, I would highly suggest to you that we use Apollo-Server because:
- The GraphQL Community fully supports this.
- Apollo-Server has a lot of versions and not just with express. It has a version that integrates with restify and one for aws-lamda. There's a lot of variations for it. 
- A lof of my colleauges recognize Apollo-Server more and has demonstrated making queries and resolvers using Apollo-Server more than they are familiar with `express-graphl`.
