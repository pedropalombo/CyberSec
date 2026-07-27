## Postgres ##
> a relational database
    -> post 'Ingres'
        \-> nomenclature based on an earlier db by Michael Stonebraker
    
    -> uses the same ideology as Kafka's master-follower architecture

> [Configurations](/resources/Postgres/postConfig.png) are important
    -!> OBS: logs are enabled as 'WAL'
        \-> Write-Ahead Log
    
    -> auto-commit is always on
        \-> configurable, but needs to be explicit every occurence of the db
    
    -> [admin configs/commands](/resources/Postgres/postCommands.png)

> Tuples
    -> basically a row

    -> Bloat
        \-> the growth of dead tuples within a db
            ^-> dead == older version of a row

> PSQL
    -> command-line tool for Postgres

    -> [shortcut commands](/resources/Postgres/postPSQL.png)

> [Index](/resources/Postgres/postIndex.png) 
    -> helps retreiving data faster
        \-> types of indexes
            ^-> Unique
                +-> enforce the uniqueness of values in 1+ columns
                    ]-> CREATE UNIQUE INDEX idx_email ON users (email);

            ^-> Non-unique
                +-> regular indexation
                    ]-> CREATE INDEX idx_lastname ON employees (last_name);

            ^-> Function-based
                +-> allows for returns of functions to be used as values
                    ]-> CREATE INDEX idx_lower_product_name ON products (lower(product_name));

            ^-> JSON / HSTORE
                +-> also known as GIN (Generalized Inverted Index)
                +-> it allocates values as serialized JSONs/HSTOREs
                    ]-> CREATE INDEX idx_gin on employees using gin (to_tsvector('english','col3'));

> [Partitions](/resources/Postgres/postPartitions.png)
    -> allocates a set of data
        \-> also has its [limitations](/resources/Postgres/postPartitionsLimitations.png)