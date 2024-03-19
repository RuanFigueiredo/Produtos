const {gql, ApolloServer} = require('apollo-server')
// CREATE FAKE DATABASE
let produtos  = [];
//DEFINE TYPES
const typeDefs = gql`
    type Produto {
        id:ID!
        nome: String
        preco: Float
    }

    type Query{
        produtos: [Produto]
        produto(id: ID!):Produto
    }

    type Mutation{
        create(id:ID!, nome: String!, preco: Float!): Produto
        delete(id:ID!):Boolean
        update(id:ID!, nome: String, preco: Float):Produto

    }
`
//DEFINE RESOLVERS
    const resolvers = {
        Query: {
            produtos: () => {
                return produtos
            },
            produtos:(_, { id })=>{
                return produtos.find(produto =>produto.id ===id)
            },
        },
        Mutation:{
            create: (_, {id, nome, preco}) => {
                const produto = {id, nome, preco};
                produtos.push(produto)    
                return produto;
            },
            delete:(_, { id })=>{
                const filteredProdutos = produtos.filter(produto=>produto.id !== id)
                books = filteredProdutos
                return true;
            },
            update:(_, { id,nome, preco }) => {
                const produto = produtos.find(produto => produto.id === id)
                produto.id = produto.id
                produto.nome = nome ? nome : produto.nome
                produto.preco = preco ? preco : produto.preco
                return produto;
            },
        },
    };
// CREATE SERVER 
    const app = new ApolloServer({  typeDefs, resolvers})
//RUN SERVER
app.listen().then(({url}) => console.log(`server running on ${url}`))

