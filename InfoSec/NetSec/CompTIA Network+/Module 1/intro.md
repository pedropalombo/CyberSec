## Computer Networks ##

> [Local Area Network (LAN)](./src/LANs.png)
    \-> defined by its protocol & [topology](#topology)


## Protocol ##
> a series of rules stablished by users to determine how info will be exchanged


## Topology ##
> how networks across [devices](#hardware) are [structured](./src/networkTopologies.png)
    
    \-> [Star Network](./src/networkStar.png)
        ^-> most common of the three
        ^-> a focal point feeds info to those connected to it
            ]-> ex: HUBs, enterprise networks, etc

    \-> [Ring Network](./src/networkRing.png)
        ^-> info goes around the access points, ending on the provider of said info
            ]-> ex: TelCo towers
    
    \-> Bus Network
        ^-> data is sent to a stream (bus/backbone) and shared to all those connected to it
        ^-> if the data sent is signed for said endpoint, then the data is processed, otherwise it's ignored 
            ]-> ex: barramentos


## Hardware ##
> physical parts of the network
    -!> PS: all of this can be visualized using [Cisco Packet Tracer](./src/ciscoNetwork.png)
    
    -> End devices
        ^-> what will consume from the network
            ]-> PCs, laptops, servers, controllers, etc.
    
    -> Network devices
        ^-> middlemen for the connection from the outside to reach the inside
            ]-> modems, switches

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