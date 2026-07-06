## Ethernet Structure ##

-!> found at the Data/Enlace step

> Ethernet/LAN
    \-> local network protocols
        ^-> [topology](./src/Topology/ethernetTopology.png)
            
            #-> logical: bus (barramento)
                +-> since the logical side is based on the bus topology, collisions may occour
                    -!> fix: apply a different protocol that tries to prevent said collisions from happening
                       -#> eg: CSMA/CD (Carrier Sense Multiple Access / Collision Detection)

            #-> physical: star

        ^-> [headers](./src/Network/Ethernet/ethernetHeader.png): defines the protocols to be used, the source/destination MAC adresses for the packages, and validation/handling of the packages and the network itself

> IP Addresses
    -!> OBS: MAC adresses the physical devices globally, but the IP addresses the devices within the given network
        \-> the IP numbers themselves are attributed by each country/region's agencies (IANA, AFNIC, LACNIC, ...)
    
    -> consisted of versions such as [IPv4 (32 bits)](./src/Network/Ethernet/ethernetIPv4.png), IPv6 (128 bits), and so on ...

    -> as well as [types/classes](./src/Network/Ethernet/ethernetIPv4Classes.png)
        \-> Class A: very large networks (millions of hosts)
            ^-> governments, etc
        
        \-> Class B: midsize networks (thousands)
            ^-> companies, universities, etc

        \-> Class C: small networks (hundreds)

        \-> Class D: IP multicast (N/A)
            ^-> streaming devices, routing protocols, video conferencing, etc.

        \-> Class E: experiemental and non-routable (undefined and invalid)
            ^-> used for testing and development

> Basic Configuration
    -> 'ipconfig /all' | 'ip addr' for the hardware's data & MAC info
    
    -> up/down a network interface
        ^-> sudo ip link set <interface> up/down
            +-> sudo: super user
            +-> ip link: aims for the interlace/link section of the interface
            +-> set: action towards the interlace/link congiguration
    
    -> change the IP address of a network (del + add)
        ^-> sudo ip addr del <ip>/<sub_mask> dev <interface>
            +-> sudo: ''
            +-> ip addr: aims for the "address" section of the IP
            +-> del/add: action towards said IP address
            +-> dev: points to the specific device/network interface for the given action
        
        ^-> sudo ip addr add <new_ip>/<sub_mask> dev <interface>
