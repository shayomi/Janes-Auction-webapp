import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/database";

const migrateCollection = async () => {
  try {
    await connectToDatabase();

    const db = mongoose.connection.db;

    // Step 1: Copy data from the old collection to the new collection
    await db
      .collection("collection")
      .aggregate([{ $match: {} }, { $out: "auction" }])
      .toArray(); // toArray() forces the execution of the aggregate pipeline

    // Step 2: Verify the data has been copied
    const oldCollectionCount = await db
      .collection("collection")
      .countDocuments();
    const newCollectionCount = await db.collection("auction").countDocuments();

    console.log("Old Collection Count:", oldCollectionCount);
    console.log("New Collection Count:", newCollectionCount);

    // Step 3: Drop the old collection if data is successfully copied
    if (oldCollectionCount === newCollectionCount) {
      await db.collection("collection").drop();
      console.log("Old collection dropped successfully.");
    } else {
      console.log("Data copy failed. Please check the counts and try again.");
    }

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

// Run the migration
migrateCollection();
