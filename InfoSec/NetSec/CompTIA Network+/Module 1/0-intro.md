## Computer Networks ##

> [Local Area Network (LAN)](./src/Network/LANs.png)
    \-> defined by its protocol & [topology](#topology)


## Protocol ##
> a series of rules stablished by users to determine how info will be exchanged


## Topology ##
> how networks across [devices](#hardware) are [structured](./src/Network/networkTopologies.png)
    
    \-> [Star Network](./src/Network/networkStar.png)
        ^-> most common of the three
        ^-> a focal point feeds info to those connected to it
            ]-> ex: [HUBs, enterprise networks, etc](./src/Topology/starTopology.png)

    \-> [Ring Network](./src/Network/networkRing.png)
        ^-> info goes around the [access points](./src/Topology/ringTopology.png), ending on the provider of said info
            ]-> ex: TelCo towers
    
    \-> Bus Network
        ^-> data is sent to a stream (bus/backbone) and shared to all those connected to it
        ^-> if the data sent is signed for said endpoint, then the data is processed, otherwise it's ignored 
            ]-> ex: [barramentos](./src/Topology/busTopology.png)

    \-> [Mesh Network](./src/Topology/meshTopology.png)
        ^-> the same data is shared amongst multiple piers (aka every device is connected [very expensive to mantain])
            \\-> PS: loads of redundancy (same data on multiple devices)
        


## Hardware ##
> physical parts of the network
    -!> PS: all of this can be visualized using [Cisco Packet Tracer](./src/Network/ciscoNetwork.png)
    
    -> End devices
        ^-> what will consume from the network
            ]-> PCs, laptops, servers, controllers, etc.
    
    -> Network devices
        ^-> middlemen for the connection from the outside to reach the inside
            ]-> modems, switches, HUBs
                \\-> [HUBs](./src/Hardware/hardwareHubs.png)
                    -#> send info from a source to all connected devices (w/o any analysis behind it)
                        ^!-> PS: loads of redundancy, so it's not used often ==> !!! Man-In-The-Middle !!!
                    
                \\-> [Switches](./src/Hardware/hardwareHubs.png)
                    -#> send info based on the data/frame/package's [MAC address](./src/Network/macTables.png)
                        ^!-> PS: if the addresses are new/non-existant on the table, the switch floods the server until its receiver is found (based on the protocol being used)
                        ^!-> PSS: the address is deleted after 30m of non-usage, since they're stored in RAMs

                        +-> MAC tables (VLAN 1 - AA:AA:AA:BB:BB:BB - Port 1 | VLAN 1 - CC:CC:CC:DD:DD:DD - Port 24)
                            ++-> VLAN X: the connector between sender-receiver (traffic channel) ==> !!! VLAN HOPPING !!!

                            ++-> AA/CC: the origin of the package [hardware brand]
                                ##-> OUI (Organizationally Unique Identifier)

                            ++-> BB/DD: the network interface being used [hardware brand's model]
                                ##-> NIC (Network Interface Controller Specific)

                            ++-> Port X: the tracer to facilitate future communications

    -> Components
        ^-> all-in-one machines that have specific functionalities
            ]-> microcontrollers (MCU boards), mini-computers (SBC boards)

    -> Connectors
        ^-> connects the devices between themselves (eg: cables)
            ]-> ex: Ethernet network takes cables to connect network to end devices
                )-> in this case: Cabo Direto (Straight Through) + Cabo Cross (Cross-Over)
                    \\-> Cross
                        #-> connects same-type devices together (PC->PC, Switch->Switch)

                    \\-> Direto
                        #-> connects different types of devices (Switch->Router, PC->Switch)