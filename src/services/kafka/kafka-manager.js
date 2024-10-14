import { Kafka } from "kafkajs";

export class KafkaManager {
  static kafka = null;
  static admin = null;

  static initialize(clientId, brokers) {
    if (!this.kafka) {
      this.kafka = new Kafka({
        clientId: clientId,
        brokers: brokers,
      });
    }
    if (!this.admin) {
      this.admin = this.kafka.admin();
    }
  }

  // Producer functionality
  static async produce(topic, messages) {
    const producer = this.kafka.producer({
      allowAutoTopicCreation: true, //producer automatically creates a topic if it does not already exist when a message is sent to that topic
      idempotent: true, // ensures that messages are delivered exactly once, even in the case of retries due to transient errors or network issues
      maxInFlightRequests: 1, // ensures that only one message is in flight at a time, crucial when you want to maintain order
    });

    await producer.connect();
    try {
      await producer.send({
        topic: topic,
        messages: messages,
      });
      console.log(`Produced messages to topic ${topic}`);
    } catch (error) {
      console.error(`Error producing message: ${error}`);
    } finally {
      await producer.disconnect();
    }
  }

  // Consumer functionality

  /**
   * Creates a new consumer for a specific topic and group. Each
   * consumer connects to the Kafka broker and subscribes to its
   * designated topic
   */
  static async createConsumer(groupId, topic, eachMessageHandler) {
    const consumer = this.kafka.consumer({ groupId });

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          await eachMessageHandler(message);

          // Commiting offsets means that the consumer has successfully processed all the messages up
          // to and including the current and is ready to process the next one thus the +1.
          // With manual commits you can ensure that the app handles messages reliably, avoids data loss,
          // and maintains consistency across different systems
          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (parseInt(message.offset) + 1).toString(),
            },
          ]);
        } catch (error) {
          console.error(`Error processing message: ${error}`);
        }
      },
    });

    return consumer; // Return the consumer instance for further management if needed
  }

  // Admin functionality
  static async createTopic(
    topicName = "default-topic",
    numPartitions = 1,
    replicationFactor = 1
  ) {
    await this.admin.connect();
    try {
      await this.admin.createTopics({
        topics: [{ topic: topicName, numPartitions, replicationFactor }],
      });
      console.log(`Created topic: ${topicName}`);
    } catch (error) {
      console.error(`Error creating topic: ${error}`);
    } finally {
      await this.admin.disconnect();
    }
  }

  static async deleteTopic(topicName) {
    await this.admin.connect();
    try {
      await this.admin.deleteTopics([topicName]);
      console.log(`Deleted topic: ${topicName}`);
    } catch (error) {
      console.error(`Error deleting topic: ${error}`);
    } finally {
      await this.admin.disconnect();
    }
  }

  static async listTopics() {
    await this.admin.connect();
    try {
      const topics = await this.admin.listTopics();
      console.log(`Topics: ${topics.join(", ")}`);
      return topics;
    } catch (error) {
      console.error(`Error listing topics: ${error}`);
    } finally {
      await this.admin.disconnect();
    }
  }
}
