## [Kafka](/resources/Kafka/kafkaDefinition.png) ##
-> used for building (real-time) data pipelines + streaming applications
    \-> retrieves data from different sources and processes it
        ^-> used for large-scale functionalities w/ low latency streams
            +-> aka it's a middleware (broker) for sending (producers) and receiving (consumers) data between two parties

> [ZooKeeper](/resources/Kafka/kafkaZoo.png)
    -> does load-balancing for the brokers (clusters/servers), as well as assign leadership to other brokers when one is down

> [Topic Partition](/resources/Kafka/kafkaTerms.png)
    -> makes load distribution easier, as well as scale horizontally (+partitions == + read/write)
    -> Topic
        \-> grouping for the producers/consumers
            ^-> eg: 'orders', 'service', 'payments'
    -> Partition
        \-> grouping instances of topics
            ^-> eg: Partition 0 == order 1, order 5, order 7

> [Replication Factor](/resources/Kafka/kafkaReplication.png)
    -> backups for brokers
    -> 'Partitions' have copies (replicas) across brokers
        \-> one broker has the 'leader' (main) copy
        \-> others hold 'follower' (backup) copies
            ^-> in case of a leader crashing, a [follower may take its place](/resources/Kafka/kafkaReplicationCrash.png)

> [Consumer Groups](/resources/Kafka/kafkaFlow.png)
    -> group of consumers (data receivers) that share the workload of reading a topic w/o duplicating the messages
        \-> 1 partition == 1 consumer

> CONSUL
    -> service-mesh solution for service management in distributed systems
        \-> used for service discovery + config management | helps with managing services
    
    -> Agents
        \-> run + register nodes and their services using servers
            +-> also run health checks for the services that are running
                ^-> so only the healthy ones are discoverable

    -> Servers
        \-> store/replicate service data + handle the discovery requests from clients for said services
            ^-> key/value-based store
                +-> helps when config data needs to be shared across services

    -> Service Discovery
        \-> tracks services (+ status/updates in real-time)
