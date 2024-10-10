import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const adminKey = encodeURIComponent(process.env.ADMIN);
const uri = `mongodb+srv://Admin:${adminKey}@nebulaodysseycluster.4gaxp.mongodb.net/?retryWrites=true&w=majority&appName=NebulaOdysseyCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    tls: true,
    tlsAllowInvalidCertificates: false,
});

async function connectDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}

export { connectDB, client };
