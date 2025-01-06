const { Client } = require("cassandra-driver");
  
try {
  async function run() {

    const client = new Client({
      cloud: {
        secureConnectBundle: "./secure-connect-social-media-db.zip",
      },
      credentials: {
        username: "gKaRpqSlMADZncAZpzTWzuLR",
        password:
          "0AKLeZ_CdA7Jcivq2MtcRzvrLhZdxJUyrM6e.lduzmTOC9ae7UasAq8rqFsWZNQfPDeEbwdl,4xDi9vqziIGFqhjDNwjeiI2u5g5ZlDhQ84_j9N-ocEbi8N91NU+_Ds0",
      },
    });

    if (client) {
      await client.connect();
      console.log("Connected to the cluster");
    } else {
      throw new Error("Client not created");
    }

    const keyspace = "social_data";
    client.keyspace = keyspace;

    // Query data from the table
    const selectQuery = "SELECT * FROM social_media_engagement";

    const result = await client.execute(selectQuery);

    console.log("Users:");

    result.rows.forEach((row) => {
      console.log(`Post ID: ${row.post_id} User ID: ${row.user_id} Post Type: ${row.post_type} Likes: ${row.likes} Shares: ${row.shares} Comments: ${row.comments} Post Date: ${row.post_date}`);
    });

    await client.shutdown();
  }

  run();

} catch (error) {

  console.error("There was an error when connecting", error);

}
